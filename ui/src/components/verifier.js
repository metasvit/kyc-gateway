import React, { useState } from "react";
import { utils, providers } from "ethers";

import { SectionProps } from "./../utils/SectionProps";
import ButtonGroup from "./elements/ButtonGroup";
import Button from "./elements/Button";
import Input from "./elements/Input";
import Image from "./elements/Image";

import logoBinance from "./../assets/images/binance.svg";
import logoAurora from "./../assets/images/aurora.svg";
import logoPolygon from "./../assets/images/polygon.svg";
import logoEthereum from "./../assets/images/ethereum.svg";
import logoFantom from "./../assets/images/fantom.svg";
import logoAvalanch from "./../assets/images/avalanche.svg";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

async function verifyBAB(address) {
  const CONTRACT_ADDRESS = "0x2B09d47D550061f995A3b5C6F0Fd58005215D7c8";
  const ABI = "function balanceOf(address owner)";

  const iface = new utils.Interface([ABI]);
  const callData = iface.encodeFunctionData("balanceOf", [
    address.toLowerCase(),
  ]);

  const provider = new providers.JsonRpcProvider(
    "https://tame-wandering-owl.bsc.discover.quiknode.pro/01e3544eee1aa14d102db225850d14f9f934f55a/"
  );
  const result = await provider.send("eth_call", [
    {
      to: CONTRACT_ADDRESS,
      data: callData,
    },
    "latest",
  ]);
  return (
    result !==
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
}

async function verifyIdProofAurora(address) {
  const CONTRACT_ADDRESS = "0x92687333b8a30d90f3203f1abf8621c7d28b647e";
  const ABI = "function isRegistered(address account)";

  const iface = new utils.Interface([ABI]);
  const callData = iface.encodeFunctionData("isRegistered", [
    address.toLowerCase(),
  ]);

  const provider = new providers.JsonRpcProvider("https://testnet.aurora.dev");
  const result = await provider.send("eth_call", [
    {
      to: CONTRACT_ADDRESS,
      data: callData,
    },
  ]);

  return (
    result ===
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  );
}

const Verifier = () => {
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  const handleChange = (event) => {
    setLoading(false);
    setResult();
    setAddress(event.target.value);
  };

  const handleVerify = async () => {
    setLoading(true);
    setResult();
    try {
      const rB = await verifyBAB(address);
      const rA = await verifyIdProofAurora(address);
      console.log(rB);
      setResult({ chain: "Aurora", verified: rA, bab: rB });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ButtonGroup>
        <Input
          type="text"
          label="Verify"
          labelHidden
          hasIcon="right"
          placeholder="Address (0x)"
          style={{ minWidth: 500 }}
          value={address}
          onChange={handleChange}
          disabled={loading}
        ></Input>
        <Button
          color="primary"
          wideMobile
          onClick={handleVerify}
          disabled={!address || loading}
        >
          Verify
        </Button>
      </ButtonGroup>
      {result && (
        <>
          <div style={{ textAlign: "left" }}>
            <span style={{ display: "inline-block", marginRight: 10 }}>
              <Image src={logoBinance} alt="BAB Token" width={24} height={24} />
            </span>
            <span>BAB Token - </span>
            <span style={{ color: result.bab ? "green" : "red" }}>
              {result.bab ? "Exists" : "No"}
            </span>
          </div>
          <div style={{ textAlign: "left" }}>
            <span
              style={{
                display: "inline-block",
                marginRight: 10,
                paddingLeft: 20,
              }}
            >
              <Image src={logoAurora} alt="Aurora" width={24} height={24} />
            </span>
            <span>{result.chain} - </span>
            <span style={{ color: result.verified ? "green" : "red" }}>
              {result.verified ? "Verified!" : "Not verified"}
            </span>
          </div>
          <div style={{ textAlign: "left" }}>
            <span
              style={{
                display: "inline-block",
                marginRight: 10,
                paddingLeft: 20,
              }}
            >
              <Image src={logoEthereum} alt="Ethereum" width={24} height={24} />
            </span>
            <span>Ethereum - </span>
            <span>Coming soon</span>
          </div>
          <div style={{ textAlign: "left" }}>
            <span
              style={{
                display: "inline-block",
                marginRight: 10,
                paddingLeft: 20,
              }}
            >
              <Image src={logoPolygon} alt="Polygon" width={24} height={24} />
            </span>
            <span>Polygon - </span>
            <span>Coming soon</span>
          </div>
          <div style={{ textAlign: "left" }}>
            <span
              style={{
                display: "inline-block",
                marginRight: 10,
                paddingLeft: 20,
              }}
            >
              <Image src={logoFantom} alt="Fantom" width={24} height={24} />
            </span>
            <span>Fantom - </span>
            <span>Coming soon</span>
          </div>
          <div style={{ textAlign: "left" }}>
            <span
              style={{
                display: "inline-block",
                marginRight: 10,
                paddingLeft: 20,
              }}
            >
              <Image src={logoAvalanch} alt="Avalanche" width={24} height={24} />
            </span>
            <span>Avalanche - </span>
            <span>Coming soon</span>
          </div>
        </>
      )}
    </>
  );
};

Verifier.propTypes = propTypes;
Verifier.defaultProps = defaultProps;

export default Verifier;
