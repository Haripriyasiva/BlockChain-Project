import React from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { FaEthereum, FaUser, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, showDetails = true }) => {
  // Calculate funding progress percentage
  const goalAmount = ethers.formatEther(project.goal || "0");
  const raisedAmount = ethers.formatEther(project.raised || "0");
  const progressPercentage = goalAmount === "0"
    ? 0
    : Math.min(100, (parseFloat(raisedAmount) / parseFloat(goalAmount)) * 100);

  // Format creator address
  const formattedCreator = project.creator
    ? `${project.creator.substring(0, 6)}...${project.creator.substring(38)}`
    : "Unknown";

  // Calculate days remaining (mock data for demo)
  const daysRemaining = Math.floor(Math.random() * 30) + 1;

  return (
    <Link to={`/project/${project.id}`} className="block group">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col border border-indigo-700 group-hover:border-emerald-500">
        {/* Project header with progress indicator */}
        <div className="relative h-2 bg-gray-800">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="p-6 flex-grow">
          {/* Project title */}
          <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-emerald-400 transition-colors duration-300">
            {project.title?.toString() || "Untitled"}
          </h2>

          {/* Project description */}
          <p className="text-gray-300 mb-4 line-clamp-3">
            {project.description?.toString() || "No description"}
          </p>

          {/* Project stats */}
          <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-400">
            <div className="flex items-center">
              <FaUser className="mr-1 text-emerald-500" />
              <span>{formattedCreator}</span>
            </div>
            {showDetails && (
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1 text-emerald-500" />
                <span>{daysRemaining} days left</span>
              </div>
            )}
          </div>

          <div className="mt-auto">
            {/* Progress bar */}
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Progress</span>
              <span className="font-medium text-emerald-400">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
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
              <div>
                <span className="text-gray-400 text-xs">Raised</span>
                <div className="flex items-center">
                  <FaEthereum className="text-emerald-500 mr-1" />
                  <span className="font-semibold text-white">{parseFloat(raisedAmount).toFixed(3)}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-gray-400 text-xs">Goal</span>
                <div className="flex items-center justify-end">
                  <FaEthereum className="text-gray-400 mr-1" />
                  <span className="text-gray-300">{parseFloat(goalAmount).toFixed(3)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card footer */}
        <div className="px-6 py-3 bg-indigo-950 flex justify-between items-center">
          <span className="text-xs text-gray-500">ID: {project.id?.toString()}</span>
          <div className="text-emerald-500 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-1">
            <FaExternalLinkAlt size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
