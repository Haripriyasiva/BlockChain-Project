const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock Contract", function () {
  let Lock;
  let lockContract;
  let owner;
  let addr1;
  let unlockTime;

  beforeEach(async function () {
    // Get the accounts from Hardhat
    [owner, addr1] = await ethers.getSigners();

    // Set unlockTime as one day in the future
    unlockTime = Math.floor(Date.now() / 1000) + 86400; // 86400 = 1 day in seconds

    // Deploy the contract
    const LockFactory = await ethers.getContractFactory("Lock");
    lockContract = await LockFactory.deploy(unlockTime, { value: ethers.utils.parseEther("1.0") });
  });

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      expect(await lockContract.unlockTime()).to.equal(unlockTime.toString());
    });

    it("Should set the right owner", async function () {
      expect(await lockContract.owner()).to.equal(owner.address);
    });

    it("Should receive and store the funds to lock", async function () {
      const balance = await ethers.provider.getBalance(lockContract.address);
      expect(balance.toString()).to.equal(ethers.utils.parseEther("1.0").toString());
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      const pastUnlockTime = Math.floor(Date.now() / 1000) - 1000;
      const LockFactory = await ethers.getContractFactory("Lock");
      await expect(
        LockFactory.deploy(pastUnlockTime, { value: ethers.utils.parseEther("1.0") })
      ).to.be.revertedWith("Unlock time should be in the future");
    });
  });

  describe("Withdrawals", function () {
    it("Should revert with the right error if called too soon", async function () {
      await expect(lockContract.connect(owner).withdraw())
        .to.be.revertedWith("You can't withdraw yet");
    });

    it("Should revert with the right error if called from another account", async function () {
      await expect(lockContract.connect(addr1).withdraw())
        .to.be.revertedWith("You aren't the owner");
    });

    it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
      // Move time forward so unlockTime has passed
      await ethers.provider.send("evm_increaseTime", [86400]); // 1 day
      await ethers.provider.send("evm_mine", []);

      await expect(lockContract.connect(owner).withdraw())
        .to.emit(lockContract, "Withdrawal")
        .withArgs(owner.address, ethers.utils.parseEther("1.0"));
    });
  });

  describe("Transfers", function () {
    it("Should transfer the funds to the owner", async function () {
      const initialBalance = await ethers.provider.getBalance(owner.address);

      // Move time forward so unlockTime has passed
      await ethers.provider.send("evm_increaseTime", [86400]); // 1 day
      await ethers.provider.send("evm_mine", []);

      await expect(lockContract.connect(owner).withdraw())
        .to.changeEtherBalances([lockContract, owner], [-ethers.utils.parseEther("1.0"), ethers.utils.parseEther("1.0")]);

      const finalBalance = await ethers.provider.getBalance(owner.address);
      expect(finalBalance.sub(initialBalance)).to.equal(ethers.utils.parseEther("1.0"));
    });
  });
});
