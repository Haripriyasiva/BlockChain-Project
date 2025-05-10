import React from 'react';
import { Link } from 'react-router-dom';
import { FaEthereum, FaShieldAlt, FaUsers, FaHandHoldingUsd, FaArrowRight } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero Section */}
      <div className="bg-[#1a2538] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">About Community Project Funding</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're building a transparent, decentralized platform for community-driven project funding using blockchain technology.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-4">
              Community Project Funding aims to revolutionize how local initiatives are funded by leveraging blockchain technology to create a transparent, efficient, and trustless funding ecosystem.
            </p>
            <p className="text-gray-300 mb-4">
              We believe that by removing intermediaries and providing complete transparency, we can empower communities to fund the projects that matter most to them, while ensuring that creators are accountable to their supporters.
            </p>
            <p className="text-gray-300">
              Our platform is built on Ethereum, allowing anyone to propose projects, contribute funds, and track exactly how those funds are used - all secured by immutable smart contracts.
            </p>
          </div>
          <div className="lg:w-1/2 bg-[#1a2538] rounded-lg p-8 shadow-xl">
            <div className="flex justify-center">
              <div className="text-[#22c55e] text-8xl opacity-20">
                <FaEthereum />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-[#1a2538] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0f172a] rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-[#22c55e] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-3">Create a Project</h3>
              <p className="text-gray-300 mb-4">
                Anyone can create a project by providing a description and setting a funding goal in ETH. Your project will be visible to the entire community.
              </p>
              <Link to="/create" className="text-[#22c55e] hover:underline flex items-center">
                Create a Project <FaArrowRight className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-[#0f172a] rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-[#22c55e] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-3">Receive Donations</h3>
              <p className="text-gray-300 mb-4">
                Community members can donate ETH directly to your project. All donations are tracked on the blockchain for complete transparency.
              </p>
              <Link to="/projects" className="text-[#22c55e] hover:underline flex items-center">
                Browse Projects <FaArrowRight className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-[#0f172a] rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-[#22c55e] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-3">Withdraw Funds</h3>
              <p className="text-gray-300 mb-4">
                Once your funding goal is reached, you can withdraw the funds to implement your project. The smart contract ensures funds are only released when goals are met.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Benefits of Blockchain Funding</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1a2538] rounded-lg p-6 text-center">
            <div className="text-[#22c55e] text-4xl mx-auto mb-4">
              <FaShieldAlt />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p className="text-gray-300">
              Smart contracts ensure that funds are securely held and only released when conditions are met.
            </p>
          </div>
          
          <div className="bg-[#1a2538] rounded-lg p-6 text-center">
            <div className="text-[#22c55e] text-4xl mx-auto mb-4">
              <FaEthereum />
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparent</h3>
            <p className="text-gray-300">
              All transactions are recorded on the blockchain, providing complete transparency for donors.
            </p>
          </div>
          
          <div className="bg-[#1a2538] rounded-lg p-6 text-center">
            <div className="text-[#22c55e] text-4xl mx-auto mb-4">
              <FaUsers />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community-Driven</h3>
            <p className="text-gray-300">
              Projects are funded directly by community members who believe in the initiative.
            </p>
          </div>
          
          <div className="bg-[#1a2538] rounded-lg p-6 text-center">
            <div className="text-[#22c55e] text-4xl mx-auto mb-4">
              <FaHandHoldingUsd />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Intermediaries</h3>
            <p className="text-gray-300">
              Direct funding without middlemen means more of your donation goes to the project.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#1a2538] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join our community and start funding or creating projects that matter.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/projects"
              className="px-8 py-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-md"
            >
              Explore Projects
            </Link>
            <Link
              to="/create"
              className="px-8 py-3 bg-[#334155] hover:bg-[#475569] text-white font-semibold rounded-md"
            >
              Create a Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
