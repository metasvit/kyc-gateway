require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          metadata: {
            bytecodeHash: "none",
          },
        },
      },
    ],
  },
  networks: {
    auroraTestnet: {
      url: `https://aurora-testnet.infura.io/v3/${INFURA_TEST_KEY}`,
      chainId: 1313161555,
      accounts: process.env.TEST_PRIVATE_KEY
        ? [process.env.TEST_PRIVATE_KEY]
        : undefined,
      loggingEnabled: true,
      timeout: 60000,
    },
  },
  mocha: {
    timeout: 100000,
  },
  etherscan: {
    apiKey: {
      aurora: process.env.AURORASCAN_API_KEY,
      auroraTestnet: process.env.AURORASCAN_API_KEY,
    },
  },
};
