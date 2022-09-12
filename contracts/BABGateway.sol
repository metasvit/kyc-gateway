// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "./IBABGateway.sol";
import "./utils/MerkleProof.sol";

contract BABGateway is Initializable, ContextUpgradeable, OwnableUpgradeable, IBABGateway {
    bytes32 internal _root;

    mapping(address => bool) internal _accounts;

    function initialize() public initializer {
        __Ownable_init_unchained();
    }

    function updateRoot(bytes32 merkleRoot) external onlyOwner {
        _root = merkleRoot;
        emit MerkleRootChanged(merkleRoot);
    }

    function register(uint256 tokenId, bytes32[] calldata merkleProof) external {
        address sender = _msgSender();
        bytes32 leaf = keccak256(abi.encodePacked(sender, tokenId));
        (bool valid,) = MerkleProof.verify(merkleProof, _root, leaf);

        require(valid, "Valid proof required");

        _accounts[sender] = true;
    }

    function isRegistered(address account) external view returns (bool) {
        return _accounts[account];
    }
}
