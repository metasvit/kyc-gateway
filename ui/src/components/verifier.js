import React, { useState } from "react";
import { utils, providers } from "ethers";

import { SectionProps } from "./../utils/SectionProps";
import ButtonGroup from "./elements/ButtonGroup";
import Button from "./elements/Button";
import Input from "./elements/Input";
import Image from "./elements/Image";
import Modal from "./elements/Modal";

import logo from "./../assets/images/aurora.svg";

const propTypes = {
  ...SectionProps.types,
};

const defaultProps = {
  ...SectionProps.defaults,
};

const AURORA_TESTNET_CHAINID = "0x4e454153";
const CONTRACT_ADDRESS = "0x92687333b8a30d90f3203f1abf8621c7d28b647e";

const ABI = "function isRegistered(address account)";

async function verifyKycAurora(address) {
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
  // if (
  //   result ===
  //   "0x0000000000000000000000000000000000000000000000000000000000000001"
  // ) {
  //   alert("You are KYC'd!");
  // } else {
  //   alert("You are not KYC'd!");
  // }
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
      const v = await verifyKycAurora(address);
      console.log(v);
      setResult({ chain: "Aurora", verified: v });
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
          disabled={!address && !loading}
        >
          Verify
        </Button>
      </ButtonGroup>
      {result && (
        <>
          <div>
            <span style={{display: 'inline-block', marginRight: 10}}>
              <Image src={logo} alt="Aurora" width={16} height={15} />
            </span>
            <span>{result.chain} - </span>
            <span style={{ color: result.verified ? "green" : "red" }}>
              {result.verified ? "Verified!" : "Not verified"}
            </span>
          </div>
        </>
      )}
    </>
  );
};

Verifier.propTypes = propTypes;
Verifier.defaultProps = defaultProps;

export default Verifier;
