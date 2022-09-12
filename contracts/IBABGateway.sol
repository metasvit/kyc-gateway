// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IBABGateway {
    event MerkleRootChanged(bytes32 merkleRoot);

    function register(uint256 tokenId, bytes32[] calldata merkleProof) external;

    function isRegistered(address account) external view returns (bool);
}
