// src/contract.js
import { Contract } from 'ethers';
import contractABI from './abi/CommunityFunding.json';

const contractAddress =process.env.REACT_APP_CONTRACT_ADDRESS;

if (!contractAddress) {
  throw new Error("Contract address is not defined in .env");
}

export function getContract(signerOrProvider) {
  if (!signerOrProvider) {
    throw new Error("Signer or Provider is required to get the contract.");
  }
  return new Contract(contractAddress, contractABI.abi, signerOrProvider);
}