async function main() {
    // Get the ContractFactory and Signers
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract to deploy
    const CommunityFunding = await ethers.getContractFactory("CommunityFunding");

    // Deploy the contract with reduced gas settings
    const communityFunding = await CommunityFunding.deploy({
        gasLimit: 3000000,  // Reduced gas limit
        gasPrice: ethers.utils.parseUnits('10', 'gwei'),  // Reduced gas price to 10 Gwei
    });

    console.log("CommunityFunding contract deployed to:", communityFunding.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
