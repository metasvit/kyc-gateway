# Interchain KYC Gateway

## Build BAB merkle root

```
npx hardhat run --network auroraTestnet ./scripts/build_bab_root.js
```

## Usage

A protorol which wants to use the KYC gateway:
```
IBABGateway _gateway;
modifier onlyKYCAllowed(address account) {
    require(_gateway.isRegistered(account), 'Account should pass KYC');
    _;
}
```

Guarding ERC20 usage:
```
function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
) internal virtual override onlyKYCAllowed(_msgSender()) {
    super._beforeTokenTransfer(from, to, amount);
}
```
