const { ShardedMerkleTree } = require("../src/merkle");
const { tokens } = require("./tokens.json");

(async () => {
  let entries = [];
  let shardNybbles = 1;
  let target = `providers/bab`;

  if (hre.network.name === "hardhat") {
    const signers = await ethers.getSigners();
    entries = signers.slice(0, 10).map((signer) => [signer.address, 1]);
    target = `providers/test_bab`;
  } else {
    entries = Object.entries(tokens).map(([key, value]) => [value, key]);
    shardNybbles = 2;
  }
  ShardedMerkleTree.build(entries, shardNybbles, target);
})();
