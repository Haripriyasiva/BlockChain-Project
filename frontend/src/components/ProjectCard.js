import React from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { FaEthereum, FaUser, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ProjectCard = ({ project, showDetails = true }) => {
  const { theme } = useTheme();

  // Calculate funding progress percentage
  const goalAmount = ethers.formatEther(project.fundingGoal || project.goal || "0");
  const raisedAmount = ethers.formatEther(project.amountRaised || project.raised || "0");
  const progressPercentage = goalAmount === "0"
    ? 0
    : Math.min(100, (parseFloat(raisedAmount) / parseFloat(goalAmount)) * 100);

  // Use title and description from the project
  const title = project.title || "Untitled Project";
  const description = project.description || "No description";

  // Format owner address - check both owner and creator fields
  const owner = project.owner || project.creator || "";
  const formattedOwner = owner
    ? `${owner.substring(0, 6)}...${owner.substring(owner.length - 4)}`
    : "Unknown";

  // Calculate days remaining (mock data for demo)
  const daysRemaining = Math.floor(Math.random() * 30) + 1;

  return (
    <Link to={`/project/${project.id}`} className="block group">
      <div className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-indigo-900 to-purple-900 border border-indigo-700 group-hover:border-emerald-500'
          : 'bg-white border border-gray-200 group-hover:border-emerald-500'
      }`}>
        {/* Project header with progress indicator */}
        <div className={`relative h-2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          {/* Project title */}
          <h2 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
            theme === 'dark'
              ? 'text-white group-hover:text-emerald-400'
              : 'text-gray-800 group-hover:text-emerald-600'
          }`}>
            {title || "Untitled"}
          </h2>

          {/* Project description */}
          <p className={`mb-4 line-clamp-3 flex-grow ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {description || "No description"}
          </p>

          {/* Project stats */}
          <div className="flex flex-wrap gap-3 mb-4 text-sm">
            <div className={`flex items-center px-2 py-1 rounded-full ${
              theme === 'dark'
                ? 'bg-indigo-950/50 text-gray-400'
                : 'bg-gray-100 text-gray-600'
            }`}>
              <FaUser className={`mr-1 ${theme === 'dark' ? 'text-emerald-500' : 'text-emerald-600'}`} />
              <span title={owner}>{formattedOwner}</span>
            </div>
            {showDetails && (
              <div className={`flex items-center px-2 py-1 rounded-full ${
                theme === 'dark'
                  ? 'bg-indigo-950/50 text-gray-400'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                <FaCalendarAlt className={`mr-1 ${theme === 'dark' ? 'text-emerald-500' : 'text-emerald-600'}`} />
                <span>{daysRemaining} days left</span>
              </div>
            )}
          </div>

          <div className="mt-auto">
            {/* Progress bar */}
            <div className={`flex justify-between text-sm mb-1 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <span>Progress</span>
              <span className={`font-medium ${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
              }`}>{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className={`w-full rounded-full h-2.5 overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'
            }`}>
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full transition-all duration-1000 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                {/* Animated pulse effect at the end of progress bar */}
                {progressPercentage < 100 && (
                  <span className="absolute right-0 top-0 h-full w-2 bg-white opacity-70 animate-pulse"></span>
                )}
              </div>
            </div>

            {/* Funding amounts */}
            <div className="flex justify-between mt-3">
              <div className={`px-3 py-1 rounded-lg ${
                theme === 'dark' ? 'bg-indigo-950/50' : 'bg-gray-100'
              }`}>
                <span className={`text-xs block ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Raised</span>
                <div className="flex items-center">
                  <FaEthereum className={`mr-1 ${
                    theme === 'dark' ? 'text-emerald-500' : 'text-emerald-600'
                  }`} />
                  <span className={`font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>{parseFloat(raisedAmount).toFixed(3)}</span>
                </div>
              </div>
              <div className={`text-right px-3 py-1 rounded-lg ${
                theme === 'dark' ? 'bg-indigo-950/50' : 'bg-gray-100'
              }`}>
                <span className={`text-xs block ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>Goal</span>
                <div className="flex items-center justify-end">
                  <FaEthereum className={`mr-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <span className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>{parseFloat(goalAmount).toFixed(3)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card footer */}
        <div className={`px-6 py-3 flex justify-between items-center ${
          theme === 'dark' ? 'bg-indigo-950' : 'bg-gray-100'
        }`}>
          <span className={`text-xs ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>ID: {project.id?.toString()}</span>
          <div className={`${
            theme === 'dark'
              ? 'text-emerald-500 group-hover:text-white'
              : 'text-emerald-600 group-hover:text-emerald-800'
          } transition-colors duration-300 transform group-hover:translate-x-1`}>
            <FaExternalLinkAlt size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
