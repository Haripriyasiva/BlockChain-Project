# Transparent Community Project Funding DApp

This decentralized application (DApp) allows community members to propose, fund, and track local initiatives transparently using Ethereum and smart contracts.

## Features

- Create funding projects with a clear description and goal (ETH)
- Donate directly to a project via MetaMask
- Owners can withdraw only when the goal is reached
- Live updates for funding progress

## Built With

- Solidity (Smart Contract)
- React.js (Frontend)
- Ethers.js (Web3 Interaction)
- Sepolia Testnet

## Smart Contract

- Contract Name: CommunityFunding
- Language: Solidity 0.8.x
- Functions:
  - createProject(description, fundingGoal)
  - donate(projectId)
  - withdrawFunds(projectId)

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/community-funding-dapp.git
cd community-funding-dapp