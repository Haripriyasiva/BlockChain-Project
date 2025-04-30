require("dotenv").config();
require("@nomiclabs/hardhat-ethers");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const INFURA_API_KEY = process.env.INFURA_API_KEY;

if (!PRIVATE_KEY || !INFURA_API_KEY) {
  throw new Error('Please set your PRIVATE_KEY and INFURA_API_KEY inside a .env file');
}

module.exports = {
  solidity: "0.8.28",  // Replace with your Solidity version
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,  // Infura Sepolia URL
      accounts: [PRIVATE_KEY],  // Add your private key from .env
      gas: 5000000,  // Set a custom gas limit (optional)
      gasPrice: 20000000000,  // Set gas price to 20 Gwei (optional, adjust as needed)
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,  // Add Etherscan API Key to verify contracts (optional)
  },
};
