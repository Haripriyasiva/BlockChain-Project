import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { FaEthereum, FaUser, FaCalendarAlt, FaArrowLeft, FaExclamationCircle,
         FaCheckCircle, FaHistory, FaShareAlt, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ProjectDetailPage = ({ account, getProjectDetails, donate, withdrawFunds }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [project, setProject] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const loadProjectData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const projectData = await getProjectDetails(id);

      // Extract title and description from the description field if needed
      if (projectData && projectData.description) {
        const description = projectData.description;
        const lines = description.split('\n').filter(line => line.trim());

        if (lines.length > 0) {
          const title = lines[0];
          const desc = lines.length > 1 ? lines.slice(1).join('\n') : "";

          // Add title and description as separate properties if they don't exist
          if (!projectData.title) {
            projectData.title = title;
          }

          if (projectData.description === description) {
            projectData.description = desc;
          }
        }
      }

      setProject(projectData);
    } catch (err) {
      console.error("Error loading project:", err);
      setError("Failed to load project details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [id, getProjectDetails]);

  useEffect(() => {
    loadProjectData();
  }, [loadProjectData]);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      setTransactionStatus('error');
      setStatusMessage("Please enter a valid donation amount");
      return;
    }

    setIsLoading(true);
    setTransactionStatus(null);
    try {
      await donate(id, donationAmount);
      setDonationAmount('');
      setTransactionStatus('success');
      setStatusMessage("Donation successful! Thank you for your contribution.");
      loadProjectData(); // Refresh project data
    } catch (err) {
      console.error("Donation failed:", err);
      setTransactionStatus('error');
      setStatusMessage("Donation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setIsLoading(true);
    setTransactionStatus(null);
    try {
      await withdrawFunds(id);
      setTransactionStatus('success');
      setStatusMessage("Funds withdrawn successfully!");
      loadProjectData(); // Refresh project data
    } catch (err) {
      console.error("Withdrawal failed:", err);
      setTransactionStatus('error');
      setStatusMessage("Withdrawal failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would typically save this to local storage or your backend
  };

  const shareProject = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: `Check out this project: ${project.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setTransactionStatus('success');
      setStatusMessage("Project link copied to clipboard!");
      setTimeout(() => setTransactionStatus(null), 3000);
    }
  };

  if (isLoading && !project) {
    return (
      <div className={`min-h-screen p-6 flex justify-center items-center ${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className={`min-h-screen p-6 ${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gray-50 text-gray-900'
      }`}>
        <div className={`max-w-3xl mx-auto rounded-xl p-6 shadow-md text-center ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <FaExclamationCircle className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Error Loading Project</h2>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{error}</p>
          <button
            onClick={() => navigate('/projects')}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  if (!project) return null;

  // Calculate funding progress percentage
  const raised = parseFloat(ethers.formatEther(project.amountRaised || project.raised || '0'));
  const goal = parseFloat(ethers.formatEther(project.fundingGoal || project.goal || '0'));
  const progressPercentage = goal === 0 ? 0 : Math.min(100, (raised / goal) * 100);

  // Format ETH amounts with 3 decimal places
  const formatEth = (amount) => parseFloat(amount).toFixed(3);

  // Format wallet address to show only first 6 and last 4 chars
  const formatAddress = (address) => {
    if (!address) return "Unknown";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Check if the current user is the owner of the project
  // Use both owner and creator fields for compatibility
  const projectOwner = project.owner || project.creator;
  const isOwner = account && projectOwner && account.toLowerCase() === projectOwner.toLowerCase();
  const canWithdraw = isOwner && raised >= goal && !project.withdrawn;

  // Calculate time remaining
  const daysLeft = project.daysLeft || 30; // Fallback if not provided
  const timeLeftText = daysLeft <= 0 ? "Ended" : `${daysLeft} days left`;
  const isEnded = daysLeft <= 0;

  return (
    <div className={`min-h-screen p-4 sm:p-6 ${
      theme === 'dark'
        ? 'bg-gray-900 text-gray-100'
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/projects')}
            className={`flex items-center transition-colors ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-emerald-400'
                : 'text-gray-500 hover:text-emerald-500'
            }`}
          >
            <FaArrowLeft className="mr-2" /> Back to Projects
          </button>

          <div className="flex space-x-2">
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-200'
              }`}
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark project"}
            >
              {isBookmarked ?
                <FaBookmark className="text-emerald-500" /> :
                <FaRegBookmark className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
              }
            </button>
            <button
              onClick={shareProject}
              className={`p-2 rounded-full transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-200'
              }`}
              aria-label="Share project"
            >
              <FaShareAlt className={`${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`} />
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {transactionStatus === 'success' && (
          <div className="bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 p-4 rounded-lg mb-6 flex items-start animate-fadeIn">
            <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
            <p>{statusMessage}</p>
          </div>
        )}

        {transactionStatus === 'error' && (
          <div className="bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6 flex items-start animate-fadeIn">
            <FaExclamationCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
            <p>{statusMessage}</p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
          {/* Project header with progress indicator */}
          <div className="relative h-3 bg-gray-200 dark:bg-gray-700">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Project status badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                isEnded ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300' :
                progressPercentage >= 100 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300' :
                'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
              }`}>
                {isEnded ? 'Ended' :
                 progressPercentage >= 100 ? 'Fully Funded' : 'Active'}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{project.title}</h1>

            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6 gap-4">
              <div className="flex items-center">
                <FaUser className="mr-1 text-emerald-500 dark:text-emerald-400" />
                <span>Created by: {formatAddress(projectOwner)}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1 text-emerald-500 dark:text-emerald-400" />
                <span>{timeLeftText}</span>
              </div>
              {project.createdAt && (
                <div className="flex items-center">
                  <FaHistory className="mr-1 text-emerald-500 dark:text-emerald-400" />
                  <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="mb-8">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="mb-8 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">Funding Progress</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-4 rounded-full transition-all duration-1000 relative"
                  style={{ width: `${progressPercentage}%` }}
                >
                  {/* Animated pulse effect at the end of progress bar */}
                  {progressPercentage < 100 && (
                    <span className="absolute right-0 top-0 h-full w-2 bg-white opacity-70 animate-pulse"></span>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {raised.toFixed(3)} ETH
                  </span>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">raised</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Goal: </span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {goal.toFixed(3)} ETH
                  </span>
                </div>
              </div>
            </div>

            {/* Donation Form */}
            {!isOwner && !isEnded && (
              <div className="mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Support this project</h3>
                <form onSubmit={handleDonate} className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                      <div className="relative">
                        <input
                          type="number"
                          placeholder="Amount to donate (ETH)"
                          className="w-full p-3 pl-10 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-all"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          step="0.001"
                          min="0"
                          disabled={isLoading}
                        />
                        <FaEthereum className="absolute left-3 top-3.5 text-gray-400" />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                      disabled={isLoading || !account}
                    >
                      {isLoading ? 'Processing...' : 'Donate'}
                    </button>
                  </div>
                  {!account && (
                    <p className="text-yellow-600 dark:text-yellow-400 text-sm flex items-center">
                      <FaExclamationCircle className="inline mr-1 flex-shrink-0" />
                      Please connect your wallet to donate
                    </p>
                  )}
                </form>
              </div>
            )}

            {/* Withdraw Button (only for project owner) */}
            {isOwner && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Owner Actions</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {canWithdraw
                        ? "Your project has reached its funding goal! You can now withdraw the funds."
                        : project.withdrawn
                          ? "Funds have already been withdrawn."
                          : "Funds can be withdrawn once the goal is reached."}
                    </p>
                  </div>
                  <button
                    onClick={handleWithdraw}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      canWithdraw
                        ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm hover:shadow"
                        : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!canWithdraw || isLoading}
                  >
                    {isLoading ? 'Processing...' : 'Withdraw Funds'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;