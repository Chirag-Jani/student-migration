const hre = require("hardhat");

async function main() {
  const ApplicationContract = await hre.ethers.getContractFactory(
    "ApplicationContract"
  );
  const applicationContract = await ApplicationContract.deploy();

  await applicationContract.deployed();

  console.log(`Contract deployed to ${applicationContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
