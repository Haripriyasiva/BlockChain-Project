import { ethers } from 'ethers';

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      return { address: accounts[0] };
    } catch (error) {
      console.error('User denied connection', error);
      return null;
    }
  } else {
    alert('MetaMask not installed');
    return null;
  }
};
