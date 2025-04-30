const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x16f774258D6862aA22855FE8F31978A9e68a76B4"; // your deployed contract address
  
  const CommunityFunding = await ethers.getContractFactory("CommunityFunding");
  const communityFunding = await CommunityFunding.attach(contractAddress);

  // Example: Create a new project
  const createTx = await communityFunding.createProject(
    "Building a Community Center",
    ethers.utils.parseEther("1.0") // 1 ETH funding goal
  );
  await createTx.wait();
  console.log("Project created successfully!");

  // Example: Donate to the first project (ID = 0)
  const donationAmount = ethers.utils.parseEther("0.01"); // 0.01 ETH
  const donateTx = await communityFunding.donate(0, { value: donationAmount });
  await donateTx.wait();
  console.log("Donation successful to project 0!");

  // Optional: Fetch project details after donation
  const project = await communityFunding.projects(0);
  console.log(`Project 0 raised: ${ethers.utils.formatEther(project.amountRaised)} ETH`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
