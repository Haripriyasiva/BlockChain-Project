import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLightbulb,
  FaShieldAlt,
  FaUsers,
  FaArrowRight,
  FaChevronDown,
  FaHandHoldingHeart,
  FaEthereum
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className={`relative overflow-hidden py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-b from-white to-gray-50'}`}>
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 opacity-10">
            <div className="w-72 h-72 rounded-full bg-emerald-500/30 filter blur-3xl"></div>
          </div>
          <div className="absolute bottom-20 right-10 opacity-10">
            <div className="w-72 h-72 rounded-full bg-purple-500/30 filter blur-3xl"></div>
          </div>
          <div className="absolute top-1/3 right-1/4 opacity-10">
            <div className="w-40 h-40 rounded-full bg-teal-500/30 filter blur-xl"></div>
          </div>
          <div className="absolute bottom-1/3 left-1/4 opacity-10">
            <div className="w-40 h-40 rounded-full bg-blue-500/30 filter blur-xl"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:flex lg:items-center lg:gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-6 ${
                theme === 'dark'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-emerald-100 text-emerald-600'
              }`}>
                Powered by Blockchain Technology
              </div>

              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className="block">Transparent funding for</span>
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">
                  community projects
                </span>
              </h1>

              <p className={`mt-6 text-xl ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Fund and track local initiatives with complete transparency using blockchain technology.
                Create projects, donate directly, and watch your community grow.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/projects"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-medium text-lg transition-all hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105 flex items-center justify-center group"
                >
                  Explore Projects
                  <FaArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/create"
                  className={`px-8 py-3 rounded-xl text-white font-medium text-lg transition-all ${
                    theme === 'dark'
                      ? 'bg-indigo-800 border border-indigo-700 hover:bg-indigo-700'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  Create Project
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>100%</div>
                  <div className="text-sm">Transparency</div>
                </div>
                <div className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>0%</div>
                  <div className="text-sm">Platform Fees</div>
                </div>
                <div className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>24/7</div>
                  <div className="text-sm">Blockchain Security</div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 mt-10 lg:mt-0">
              <div className={`relative rounded-2xl overflow-hidden shadow-xl ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 to-teal-400`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white text-xl font-bold mr-4">
                      <FaLightbulb />
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Community Garden Project</h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Featured Project</p>
                    </div>
                  </div>

                  <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Help us transform an abandoned lot into a thriving community garden with organic vegetables and educational programs.
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>Funding Progress</span>
                      <span className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}>72%</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: '72%' }}></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaEthereum className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'} />
                      <span className={`ml-1 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>1.8 / 2.5 ETH</span>
                    </div>
                    <Link to="/projects" className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-medium text-sm">
                      Donate Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => {
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
              }}
              className={`animate-bounce inline-flex flex-col items-center transition-colors ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span className="text-sm mb-1">Learn More</span>
              <FaChevronDown className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>





      {/* Features Section */}
      <div id="features" className={`py-24 rounded-t-3xl ${
        theme === 'dark' ? 'bg-indigo-900' : 'bg-emerald-50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-base font-semibold tracking-wide uppercase ${
              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
            }`}>Features</h2>
            <p className={`mt-2 text-3xl font-extrabold sm:text-4xl ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              A better way to fund community projects
            </p>
            <p className={`mt-4 max-w-2xl mx-auto text-xl ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Our platform leverages blockchain technology to ensure transparency and trust in community funding.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<FaEthereum className="h-8 w-8 text-white" />}
                title="Blockchain Powered"
                description="All transactions are recorded on the Ethereum blockchain, ensuring complete transparency and immutability."
              />

              <FeatureCard
                icon={<FaUsers className="h-8 w-8 text-white" />}
                title="Community Driven"
                description="Anyone can propose projects and contribute to initiatives they believe in, fostering community engagement."
              />

              <FeatureCard
                icon={<FaShieldAlt className="h-8 w-8 text-white" />}
                title="Secure Funding"
                description="Smart contracts ensure funds are only released when funding goals are met, protecting both creators and donors."
              />
            </div>
          </div>
        </div>
      </div>



      {/* CTA Section */}
      <div className={`py-16 ${theme === 'dark' ? 'bg-indigo-950' : 'bg-emerald-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-2xl shadow-xl overflow-hidden border ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-emerald-500/10 to-teal-400/10 border-emerald-500/20'
              : 'bg-gradient-to-r from-emerald-500/5 to-teal-400/5 border-emerald-500/10'
          }`}>
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className={`text-3xl font-extrabold sm:text-4xl ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  <span className="block">Ready to get started?</span>
                  <span className={`block ${
                    theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>Join our community today.</span>
                </h2>
                <p className={`mt-4 text-lg ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Create a project or support existing initiatives in your community.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8 flex flex-shrink-0 space-x-4">
                <Link
                  to="/projects"
                  className={`px-6 py-3 rounded-xl font-medium text-lg transition-all hover:shadow-lg hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-white text-indigo-900 hover:shadow-white/20'
                      : 'bg-white text-emerald-700 hover:shadow-emerald-500/20'
                  }`}
                >
                  Browse Projects
                </Link>
                <Link
                  to="/create"
                  className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-medium text-lg transition-all hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex flex-col items-center text-center p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 ${
        theme === 'dark'
          ? 'bg-indigo-800 border border-indigo-700 hover:border-emerald-500/50 hover:shadow-emerald-500/10'
          : 'bg-white border border-gray-200 hover:border-emerald-500/50 hover:shadow-emerald-500/10'
      }`}
    >
      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
        {icon}
      </div>
      <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{description}</p>
    </div>
  );
};

export default HomePage;
