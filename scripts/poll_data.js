const ethers = require('ethers');
const fs = require('fs');

const BINANCE_RPC = 'https://tame-wandering-owl.bsc.discover.quiknode.pro/01e3544eee1aa14d102db225850d14f9f934f55a/';
const BINANCE_CONTRACT_ADDR = '0x2b09d47d550061f995a3b5c6f0fd58005215d7c8';
const CONTRACT_DEPLOYMENT_BLOCK = 20746048;

const ATTEST_TOPIC = '0xe9274a84b19e9428826de6bae8c48329354f8f0e73f771b97cae2d9dccd45a27';

const ABI = 'event Attest(address indexed to, uint256 indexed tokenId)' 

const INITIAL_STATE = {
  tokens: {},
  latestSyncedBlock: 0
};

async function fetchLogs(provider, address, fromBlock, toBlock, limit) {
  const maxBlock = fromBlock + limit;
  const _toBlock = Math.min(maxBlock, toBlock);

  console.log(`Fetching events blocks [${address}: ${fromBlock}-${_toBlock}]`);

  try {
    const events = await provider.getLogs({
      address,
      topics: [ATTEST_TOPIC],
      fromBlock,
      toBlock: _toBlock
    });

    return toBlock > maxBlock ? events.concat(await fetchLogs(provider, address, _toBlock, toBlock, limit)) : events;
  } catch (err) {
    console.log('FAIL', err);

    if (err.message === 'query returned more than 10000 results') {
      console.log('Relimiting (1000 blocks)');
      return fetchLogs(contract, topics, fromBlock, toBlock, 1000);
    }

    throw err;
  }
}

function readState() {
  try {
    return JSON.parse(fs.readFileSync('./tokens.json'));
  } catch (e) {
    return INITIAL_STATE;
  }
}

function writeState(state) {
  fs.writeFileSync('./tokens.json', JSON.stringify(state));
}

async function main() {
  const provider = ethers.providers.getDefaultProvider(BINANCE_RPC);
  
  const state = readState();
  const fromBlock = Math.max(state.latestSyncedBlock, CONTRACT_DEPLOYMENT_BLOCK);

  const toBlock = await provider.getBlockNumber('latest');

  const logs = await fetchLogs(provider, BINANCE_CONTRACT_ADDR, fromBlock, toBlock, 5000);

  const interface = new ethers.utils.Interface([ABI]);

  for (const log of logs) {
    const parsedLog = interface.parseLog(log);

    state.tokens[parsedLog.args.tokenId] = parsedLog.args.to;
  }

  state.latestSyncedBlock = toBlock;
  writeState(state);
}

(async () => {
  await main(); 
})();

