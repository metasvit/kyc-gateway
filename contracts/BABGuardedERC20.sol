// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "./IBABGateway.sol";

contract BABGuardedERC20 is ERC20Upgradeable {
    IBABGateway _gateway;

    function initialize(
        string memory name,
        string memory symbol,
        IBABGateway gateway
    ) public virtual initializer {
        __BABGuardedERC20_init(name, symbol);
        _gateway = gateway;
    }

    function __BABGuardedERC20_init(string memory name, string memory symbol) internal onlyInitializing {
        __ERC20_init_unchained(name, symbol);
        __BABGuardedERC20_init_unchained(name, symbol);
    }

    function __BABGuardedERC20_init_unchained(string memory, string memory) internal onlyInitializing { }

    function mint(address to, uint256 amount) public virtual {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        require(_gateway.isRegistered(_msgSender()), 'Account should pass KYC');
        super._beforeTokenTransfer(from, to, amount);
    }
}