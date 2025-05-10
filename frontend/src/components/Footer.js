import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaDiscord, FaEthereum } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1a2538] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CommunityFund</h3>
            <p className="text-gray-400 text-sm">
              A decentralized platform for transparent community project funding using blockchain technology.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white">Projects</Link>
              </li>
              <li>
                <Link to="/create" className="text-gray-400 hover:text-white">Create Project</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://ethereum.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  Ethereum
                </a>
              </li>
              <li>
                <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  MetaMask
                </a>
              </li>
              <li>
                <a href="https://sepolia.etherscan.io" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  Sepolia Explorer
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaGithub />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaTwitter />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaDiscord />
              </a>
              <a href="https://ethereum.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-xl">
                <FaEthereum />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#334155] mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} CommunityFund. All rights reserved.</p>
          <p className="mt-2">
            Smart Contract: <a
              href={`https://sepolia.etherscan.io/address/${process.env.REACT_APP_CONTRACT_ADDRESS || "0xFEeC5C6d57c3cb243f477c39C650Cd3a992fcF42"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22c55e] hover:underline"
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
