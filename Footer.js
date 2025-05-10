import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaDiscord, FaEthereum } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white border-t border-indigo-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Logo />
            </div>
            <p className="text-gray-400 max-w-md">
              A decentralized platform for transparent community project funding using blockchain technology.
              Create projects, donate with cryptocurrency, and track every transaction on the blockchain.
            </p>
            <div className="flex space-x-6 mt-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <FaDiscord className="h-6 w-6" />
              </a>
              <a href="https://ethereum.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <FaEthereum className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/create" className="text-gray-400 hover:text-white transition-colors">Create Project</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://ethereum.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Ethereum
                </a>
              </li>
              <li>
                <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  MetaMask
                </a>
              </li>
              <li>
                <a href="https://sepolia.etherscan.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Sepolia Explorer
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} CommunityFund. All rights reserved.</p>
          <p className="mt-2">
            Smart Contract: <a
              href={`https://sepolia.etherscan.io/address/${process.env.REACT_APP_CONTRACT_ADDRESS || "0xFEeC5C6d57c3cb243f477c39C650Cd3a992fcF42"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              {process.env.REACT_APP_CONTRACT_ADDRESS || "0xFEeC5C6d57c3cb243f477c39C650Cd3a992fcF42"}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
