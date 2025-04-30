// src/contract.js
import { ethers } from 'ethers';
import contractABI from './abi/CommunityFunding.json';

const contractAddress = ' 0x4aff9752A320f7D8DdDbFE88DA55E5Ae633912b5'; // Replace with your deployed contract address

export function getContract(signerOrProvider) {
  return new ethers.Contract(contractAddress, contractABI.abi, signerOrProvider);
}