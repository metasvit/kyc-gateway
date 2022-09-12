const { expect } = require("chai");

const { ShardedMerkleTree } = require("../src/merkle");

describe("BABGateway", () => {
  let tree;

  it("should allow KYCed users", async () => {
    const signers = await ethers.getSigners();

    const Gtw = await ethers.getContractFactory("BABGateway");
    const gtw = await Gtw.deploy();
    await gtw.initialize();

    const GuardedERC20 = await ethers.getContractFactory("BABGuardedERC20");
    const gERC20 = await GuardedERC20.deploy();
    await gERC20.initialize("GuardedERC20", "GERC20", gtw.address);

    tree = ShardedMerkleTree.fromFiles("providers/test_bab");
    await gtw.updateRoot(tree.root);

    await expect(gERC20.mint(signers[1].address, 1)).to.be.revertedWith(
      "Account should pass KYC"
    );

    await expect(
      gtw.register(1, [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      ])
    ).to.be.revertedWith("Valid proof required");

    const [tokenId, proof] = tree.getProof(signers[0].address);
    await gtw.register(tokenId, proof);

    await gERC20.mint(signers[1].address, 1);
    expect(await gERC20.balanceOf(signers[1].address)).to.equal("1");
  });
});
