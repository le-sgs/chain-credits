async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy InstituteRegistration
  const InstituteRegistration = await ethers.getContractFactory("InstituteRegistration");
  const instituteRegistration = await InstituteRegistration.deploy();
  await instituteRegistration.waitForDeployment();
  console.log("InstituteRegistration deployed to:", await instituteRegistration.getAddress());

  // Deploy CarbonCreditsTrading
  const CarbonCreditsTrading = await ethers.getContractFactory("CarbonCreditsTrading");
  const carbonCreditsTrading = await CarbonCreditsTrading.deploy();
  await carbonCreditsTrading.waitForDeployment();
  console.log("CarbonCreditsTrading deployed to:", await carbonCreditsTrading.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
