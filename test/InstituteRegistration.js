const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("InstituteRegistration", function () {
  let InstituteRegistration, instituteRegistration, owner, addr1;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    InstituteRegistration = await ethers.getContractFactory("InstituteRegistration");
    [owner, addr1] = await ethers.getSigners();

    // Deploy a new InstituteRegistration contract for each test
    instituteRegistration = await InstituteRegistration.deploy();
    //await instituteRegistration.deployed();
  });

  describe("Registration", function () {
    it("Should register an institute successfully", async function () {
      // Attempt to register from addr1
      await instituteRegistration.connect(addr1).registerInstitute("Institute A");

      // Get the registered institute's details
      const institute = await instituteRegistration.institutes(addr1.address);

      expect(institute.name).to.equal("Institute A");
      expect(institute.isRegistered).to.be.true;
    });

    it("Should prevent an institute from registering more than once", async function () {
      // First registration attempt
      await instituteRegistration.connect(addr1).registerInstitute("Institute A");

      // Second registration attempt should fail
      await expect(
        instituteRegistration.connect(addr1).registerInstitute("Institute A")
      ).to.be.revertedWith("Institute already registered.");
    });
  });
});
