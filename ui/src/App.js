import "./App.css";
import { useMetaMask } from "metamask-react";
import { utils } from "ethers";

const AURORA_TESTNET_CHAINID = "0x4e454153";
const CONTRACT_ADDRESS = "0x92687333b8a30d90f3203f1abf8621c7d28b647e";

const ABI = "function isRegistered(address account)";

async function verifyKyc(address, ethereum) {
  const iface = new utils.Interface([ABI]);
  const callData = iface.encodeFunctionData("isRegistered", [
    address.toLowerCase(),
  ]);

  const result = await ethereum.request({
    method: "eth_call",
    params: [
      {
        to: CONTRACT_ADDRESS,
        data: callData,
      },
    ],
  });

  if (
    result ===
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  ) {
    alert("You are KYC'd!");
  } else {
    alert("You are not KYC'd!");
  }
}

function App() {
  const { status, connect, account, chainId, ethereum, switchChain } =
    useMetaMask();

  // if (status === "initializing")
  //   return <div>Synchronization with MetaMask ongoing...</div>;

  // if (status === "unavailable") return <div>MetaMask not available :(</div>;

  // if (status === "notConnected")
  //   return <button onClick={connect}>Connect to MetaMask</button>;

  // if (status === "connecting") return <div>Connecting...</div>;

  // if (status === "connected") {
  //   if (chainId !== AURORA_TESTNET_CHAINID) {
  //     return (
  //       <div>
  //         <button className="button-connect" onClick={() => switchChain(AURORA_TESTNET_CHAINID)}>
  //           Change network
  //         </button>
  //       </div>
  //     );
  //   }

  //   return (
  //         <div>
  //             Connected account {account} on chain ID {chainId}
  //           <button className="button-connect" onClick={() => verifyKyc(account, ethereum)}>Verify</button>
  //         </div>
  //   );
  // }

  return (
    <main className="container">
      <div className="section-box">
        <div className="message-box">
          {status === "initializing" && (
            <div>Synchronization with MetaMask ongoing...</div>
          )}
          {status === "unavailable" && <div>MetaMask not available :(</div>}
          {status === "connecting" && <div>Connecting...</div>}
          {status === "connected" && chainId === AURORA_TESTNET_CHAINID && (
            <>
              <div>Connected account {account} </div>
              <div>on chain ID {chainId}</div>
            </>
          )}
        </div>
        {status === "notConnected" && (
          <button className="button-connect" onClick={connect}>
            Connect to MetaMask
          </button>
        )}
        {status === "connected" && chainId !== AURORA_TESTNET_CHAINID && (
          <button
            className="button-connect"
            onClick={() => switchChain(AURORA_TESTNET_CHAINID)}
          >
            Change network
          </button>
        )}
        {status === "connected" && chainId === AURORA_TESTNET_CHAINID && (
          <button
            className="button-connect"
            onClick={() => verifyKyc(account, ethereum)}
          >
            Verify
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
