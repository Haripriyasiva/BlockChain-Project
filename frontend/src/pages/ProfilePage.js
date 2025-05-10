import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { FaEthereum, FaExclamationCircle, FaExternalLinkAlt, FaCopy, FaCheck } from 'react-icons/fa';
import contractAbi from '../CommunityFunding.json';
import { useTheme } from '../context/ThemeContext';

const contractAddress = "0xFEeC5C6d57c3cb243f477c39C650Cd3a992fcF42";

const ProfilePage = ({ account }) => {
  const { theme } = useTheme();
  const [myProjects, setMyProjects] = useState([]);
  const [myDonations, setMyDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [ethBalance, setEthBalance] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');

  // Helper function to process project data
  const processProjectData = (project, id) => {
    try {
      // Create a new object with the project data
      const processedProject = {
        id: id,
        owner: project.owner,
        description: project.description || "",
        fundingGoal: project.fundingGoal || "0",
        amountRaised: project.amountRaised || "0",
        withdrawn: project.withdrawn || false,
        goal: project.fundingGoal || "0",
        raised: project.amountRaised || "0"
      };

      // Extract title and description from the description field
      const description = processedProject.description;
      const lines = description.split('\n').filter(line => line.trim());

      if (lines.length > 0) {
        // Set title as the first line
        processedProject.title = lines[0];

        // Set description as the remaining lines
        if (lines.length > 1) {
          processedProject.description = lines.slice(1).join('\n');
        } else {
          processedProject.description = ""; // Empty description if only title is provided
        }
      } else {
        processedProject.title = "Untitled Project";
        processedProject.description = "";
      }

      return processedProject;
    } catch (error) {
      console.error("Error processing project data:", error);
      return {
        id: id,
        owner: project.owner || "Unknown",
        title: "Error Processing Project",
        description: "There was an error processing this project's data.",
        fundingGoal: "0",
        amountRaised: "0",
        goal: "0",
        raised: "0",
        withdrawn: false
      };
    }
  };

  // Define loadUserData before using it in useEffect
  const loadUserData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask!");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);

      // Get user's ETH balance
      const balance = await provider.getBalance(account);
      setEthBalance(ethers.formatEther(balance));

      // Get total number of projects
      const projectCount = await contract.projectCount();

      // Find user's projects and donations
      const userProjects = [];
      const userDonations = [];

      console.log("Profile - Account:", account);
      console.log("Profile - Project count:", projectCount.toString());

      for (let i = 0; i < projectCount; i++) {
        try {
          const project = await contract.projects(i);

          console.log(`Profile - Raw project ${i}:`, {
            owner: project.owner,
            description: project.description,
            fundingGoal: project.fundingGoal?.toString(),
            amountRaised: project.amountRaised?.toString()
          });

          // Process the project data
          const processedProject = processProjectData(project, i);

          // Check if user is the creator/owner of this project
          if (processedProject.owner &&
              processedProject.owner.toLowerCase() === account.toLowerCase()) {
            console.log(`Profile - Found user project: ${processedProject.title} (ID: ${i})`);
            userProjects.push(processedProject);
          }

          // Check if user has donated to this project
          // Note: This is a simplified approach. In a real app, you'd use events or a more efficient method
          try {
            const donation = await contract.donations(i, account);
            if (donation && donation > 0) {
              userDonations.push({
                projectId: i,
                amount: donation,
                projectTitle: processedProject.title
              });
            }
          } catch (err) {
            // If there's no donation mapping in your contract, this will fail
            console.log("No donation found or donation mapping doesn't exist");
          }
        } catch (err) {
          console.error(`Error processing project ${i}:`, err);
        }
      }

      setMyProjects(userProjects);
      setMyDonations(userDonations);
    } catch (err) {
      console.error("Error loading user data:", err);
      setError("Failed to load your profile data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [account]);

  // Now use loadUserData in useEffect
  useEffect(() => {
    if (account) {
      loadUserData();
    } else {
      setIsLoading(false);
    }
  }, [account, loadUserData]);

  const copyAddress = () => {
    navigator.clipboard.writeText(account);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!account) {
    return (
      <div className={`min-h-screen p-6 ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gray-50 text-gray-900'
      }`}>
        <div className={`max-w-3xl mx-auto rounded-lg p-8 text-center ${
          theme === 'dark'
            ? 'bg-gray-800'
            : 'bg-white shadow-md'
        }`}>
          <FaExclamationCircle className="text-yellow-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
          <p className={`mb-6 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>Please connect your wallet to view your profile.</p>
          <button className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded-xl">
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen p-6 flex justify-center items-center ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${
      theme === 'dark'
        ? 'bg-gray-900 text-white'
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className={`p-4 rounded-xl mb-6 flex items-start ${
            theme === 'dark'
              ? 'bg-red-900/50 border border-red-600 text-white'
              : 'bg-red-100 border border-red-300 text-red-800'
          }`}>
            <FaExclamationCircle className={`mt-1 mr-3 flex-shrink-0 ${
              theme === 'dark' ? 'text-red-500' : 'text-red-600'
            }`} />
            <p>{error}</p>
          </div>
        )}

        <div className={`rounded-xl overflow-hidden shadow-xl mb-8 ${
          theme === 'dark'
            ? 'bg-gray-800 border border-gray-700'
            : 'bg-white border border-gray-200'
        }`}>
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white text-xl font-bold mr-3">
                    {account.substring(2, 4).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className={`font-mono ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {account.substring(0, 6)}...{account.substring(38)}
                      </span>
                      <button
                        onClick={copyAddress}
                        className={`ml-2 transition-colors ${
                          theme === 'dark'
                            ? 'text-gray-400 hover:text-white'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                        title="Copy address"
                      >
                        {copied ? <FaCheck className="text-emerald-500" /> : <FaCopy />}
                      </button>
                      <a
                        href={`https://sepolia.etherscan.io/address/${account}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`ml-2 transition-colors ${
                          theme === 'dark'
                            ? 'text-gray-400 hover:text-white'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                        title="View on Etherscan"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                    {ethBalance !== null && (
                      <div className={`flex items-center mt-1 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <FaEthereum className="mr-1 text-emerald-500" />
                        <span>{parseFloat(ethBalance).toFixed(4)} ETH</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Link
                to="/create"
                className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-semibold py-2 px-4 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/20"
              >
                Create New Project
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex mb-6 border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'projects'
                ? theme === 'dark'
                  ? 'text-emerald-400 border-b-2 border-emerald-500'
                  : 'text-emerald-600 border-b-2 border-emerald-500'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            My Projects
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === 'donations'
                ? theme === 'dark'
                  ? 'text-emerald-400 border-b-2 border-emerald-500'
                  : 'text-emerald-600 border-b-2 border-emerald-500'
                : theme === 'dark'
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('donations')}
          >
            My Donations
          </button>
        </div>

        {/* My Projects Tab */}
        {activeTab === 'projects' && (
          <>
            {myProjects.length === 0 ? (
              <div className={`text-center py-12 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              }`}>
                <p className={`text-xl mb-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>You haven't created any projects yet.</p>
                <Link to="/create" className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/20">
                  Create Your First Project
                </Link>
              </div>
            ) : (
              <div className="grid gap-6">
                {myProjects.map((project, idx) => {
                  const goalAmount = ethers.formatEther(project.goal || "0");
                  const raisedAmount = ethers.formatEther(project.raised || "0");
                  const progressPercentage = goalAmount === "0"
                    ? 0
                    : Math.min(100, (parseFloat(raisedAmount) / parseFloat(goalAmount)) * 100);

                  return (
                    <div key={idx} className={`rounded-xl overflow-hidden shadow-md ${
                      theme === 'dark'
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                    }`}>
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <h2 className="text-xl font-semibold">{project.title || "Untitled"}</h2>
                          <Link
                            to={`/project/${project.id}`}
                            className={`text-sm hover:underline flex items-center ${
                              theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                            }`}
                          >
                            View Details <FaExternalLinkAlt className="ml-1 h-3 w-3" />
                          </Link>
                        </div>

                        <p className={`mt-2 line-clamp-2 ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>{project.description || "No description"}</p>

                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Funding Progress</span>
                            <span className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}>
                              {progressPercentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className={`w-full rounded-full h-2.5 ${
                            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full"
                              style={{ width: `${progressPercentage}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-2 text-sm">
                            <div className="flex items-center">
                              <FaEthereum className="mr-1 text-emerald-500" />
                              <span>{parseFloat(raisedAmount).toFixed(3)} raised</span>
                            </div>
                            <div className={`flex items-center ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              <FaEthereum className="mr-1" />
                              <span>Goal: {parseFloat(goalAmount).toFixed(3)}</span>
                            </div>
                          </div>
                        </div>

                        <div className={`mt-4 pt-4 border-t ${
                          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
                        }`}>
                          <div className="flex justify-between items-center">
                            <span className={`text-sm px-2 py-1 rounded-full ${
                              project.withdrawn
                                ? theme === 'dark'
                                  ? 'bg-gray-700 text-gray-400'
                                  : 'bg-gray-200 text-gray-600'
                                : parseFloat(raisedAmount) >= parseFloat(goalAmount)
                                  ? theme === 'dark'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-emerald-100 text-emerald-700'
                                  : theme === 'dark'
                                    ? 'bg-yellow-500/20 text-yellow-400'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {project.withdrawn
                                ? "Funds withdrawn"
                                : parseFloat(raisedAmount) >= parseFloat(goalAmount)
                                  ? "Ready to withdraw"
                                  : "Funding in progress"}
                            </span>
                            {parseFloat(raisedAmount) >= parseFloat(goalAmount) && !project.withdrawn && (
                              <Link
                                to={`/project/${project.id}`}
                                className="text-sm bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white px-3 py-1 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/20"
                              >
                                Withdraw Funds
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* My Donations Tab */}
        {activeTab === 'donations' && (
          <>
            {myDonations.length === 0 ? (
              <div className={`text-center py-12 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              }`}>
                <p className={`text-xl mb-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>You haven't made any donations yet.</p>
                <Link to="/projects" className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/20">
                  Explore Projects
                </Link>
              </div>
            ) : (
              <div className="grid gap-4">
                {myDonations.map((donation, idx) => (
                  <div key={idx} className={`rounded-xl p-4 flex justify-between items-center ${
                    theme === 'dark'
                      ? 'bg-gray-800 border border-gray-700'
                      : 'bg-white border border-gray-200'
                  }`}>
                    <div>
                      <h3 className="font-medium">{donation.projectTitle || `Project #${donation.projectId}`}</h3>
                      <div className={`flex items-center mt-1 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <FaEthereum className="mr-1 text-emerald-500" />
                        <span>{ethers.formatEther(donation.amount || "0")} ETH donated</span>
                      </div>
                    </div>
                    <Link
                      to={`/project/${donation.projectId}`}
                      className={`text-sm hover:underline flex items-center ${
                        theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
                      }`}
                    >
                      View Project <FaExternalLinkAlt className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
