const hre = require("hardhat");

async function main(contractName) {
  const StudentRegistration = await hre.ethers.getContractFactory(contractName);
  const studentRegistration = await StudentRegistration.deploy();

  await studentRegistration.deployed();
  console.log(
    `${contractName} Contract deployed to ${studentRegistration.address}`
  );
}

main("StudentRegistration").catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

main("DataContract").catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// main("ApplicationContract").catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
