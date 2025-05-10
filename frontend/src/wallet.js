import { BrowserProvider } from 'ethers';

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { address };
    } catch (error) {
      console.error('User denied connection', error);
      return null;
    }
  } else {
    alert('MetaMask not installed');
    return null;
  }
};