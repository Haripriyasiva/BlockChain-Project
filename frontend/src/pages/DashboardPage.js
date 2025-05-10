import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { FaChartBar, FaEthereum, FaProjectDiagram, FaUsers, FaPlus, FaExclamationCircle, FaUser } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const DashboardPage = ({ account, projects }) => {
  const { theme } = useTheme();
  const [userProjects, setUserProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalFunding: 0,
    avgFunding: 0,
    completedProjects: 0
  });

  useEffect(() => {
    if (account && projects.length > 0) {
      console.log("Dashboard - Account:", account);
      console.log("Dashboard - All projects:", projects.map(p => ({
        id: p.id,
        owner: p.owner,
        title: p.title,
        description: p.description?.substring(0, 30) + "..."
      })));

      // Filter projects created by the user
      const filteredProjects = [];

      for (const project of projects) {
        if (!project || !project.owner || !account) {
          console.log(`Skipping project ${project?.id} - missing data`);
          continue;
        }

        try {
          // Convert addresses to lowercase for comparison
          const accountLower = account.toLowerCase();
          const ownerLower = project.owner.toLowerCase();

          const isOwner = ownerLower === accountLower;

          console.log(`Project ${project.id} - Title: ${project.title}, Owner: ${project.owner}, Account: ${account}, IsOwner: ${isOwner}`);

          if (isOwner) {
            filteredProjects.push(project);
          }
        } catch (error) {
          console.error(`Error comparing addresses for project ${project.id}:`, error);
        }
      }

      console.log("Dashboard - User projects:", filteredProjects);
      setUserProjects(filteredProjects);

      // Calculate stats
      const totalFunding = filteredProjects.reduce(
        (sum, project) => {
          const raised = project.amountRaised || project.raised || '0';
          return sum + parseFloat(ethers.formatEther(raised));
        },
        0
      );

      const completedProjects = filteredProjects.filter(
        project => {
          const raised = project.amountRaised || project.raised || '0';
          const goal = project.fundingGoal || project.goal || '0';
          return parseFloat(ethers.formatEther(raised)) >= parseFloat(ethers.formatEther(goal));
        }
      ).length;

      setStats({
        totalProjects: filteredProjects.length,
        totalFunding: totalFunding,
        avgFunding: filteredProjects.length > 0 ? totalFunding / filteredProjects.length : 0,
        completedProjects
      });
    }
  }, [account, projects]);

  if (!account) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-6`}>
        <div className={`max-w-4xl mx-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg text-center`}>
          <FaExclamationCircle className={`text-5xl mx-auto mb-4 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'}`} />
          <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            Please connect your wallet to view your dashboard.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-medium rounded-lg hover:shadow-lg transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} p-4 sm:p-6`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <FaChartBar className={`mr-3 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-500'}`} />
            Creator Dashboard
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage and track your crowdfunding projects
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Projects"
            value={stats.totalProjects}
            icon={<FaProjectDiagram />}
            theme={theme}
          />
          <StatCard
            title="Total Funding"
            value={`${stats.totalFunding.toFixed(3)} ETH`}
            icon={<FaEthereum />}
            theme={theme}
          />
          <StatCard
            title="Avg. Funding"
            value={`${stats.avgFunding.toFixed(3)} ETH`}
            icon={<FaEthereum />}
            theme={theme}
          />
          <StatCard
            title="Completed Projects"
            value={stats.completedProjects}
            icon={<FaUsers />}
            theme={theme}
          />
        </div>

        {/* Projects Section */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Projects</h2>
            <Link
              to="/create"
              className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <FaPlus className="mr-2" /> Create New
            </Link>
          </div>

          {userProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProjects.map(project => (
                <ProjectCard key={project.id} project={project} theme={theme} />
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <FaProjectDiagram className="text-4xl mx-auto mb-3 opacity-50" />
              <p className="mb-4">You haven't created any projects yet.</p>
              <Link
                to="/create"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <FaPlus className="mr-2" /> Create Your First Project
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, theme }) => (
  <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 flex items-center`}>
    <div className={`h-12 w-12 rounded-full ${theme === 'dark' ? 'bg-emerald-500/20' : 'bg-emerald-100'} flex items-center justify-center mr-4`}>
      <span className="text-emerald-500">{icon}</span>
    </div>
    <div>
      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{title}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  </div>
);

const ProjectCard = ({ project, theme }) => {
  const goalAmount = ethers.formatEther(project.fundingGoal || project.goal || "0");
  const raisedAmount = ethers.formatEther(project.amountRaised || project.raised || "0");
  const progressPercentage = goalAmount === "0"
    ? 0
    : Math.min(100, (parseFloat(raisedAmount) / parseFloat(goalAmount)) * 100);

  // Make sure we have a title
  const title = project.title || "Untitled Project";
  const description = project.description || "";

  // Format owner address
  const owner = project.owner || project.creator || "";
  const formattedOwner = owner
    ? `${owner.substring(0, 6)}...${owner.substring(owner.length - 4)}`
    : "Unknown";

  return (
    <Link
      to={`/project/${project.id}`}
      className={`block rounded-xl ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-all hover:shadow-md overflow-hidden`}
    >
      {/* Progress bar */}
      <div className="relative h-2 bg-gray-300">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-1">{title}</h3>

        <div className="flex items-center mb-2">
          <FaUser className={`mr-1 ${theme === 'dark' ? 'text-emerald-500' : 'text-emerald-600'}`} />
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {formattedOwner}
          </span>
        </div>

        <div className="flex justify-between text-sm mb-3">
          <div>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>Raised</p>
            <p className="font-medium flex items-center">
              <FaEthereum className="text-emerald-500 mr-1" />
              {parseFloat(raisedAmount).toFixed(3)}
            </p>
          </div>
          <div className="text-right">
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs`}>Goal</p>
            <p className="font-medium flex items-center justify-end">
              <FaEthereum className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mr-1`} />
              {parseFloat(goalAmount).toFixed(3)}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            ID: {project.id?.toString()}
          </span>
          <span className={`${progressPercentage >= 100 ? 'text-emerald-500' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            {progressPercentage.toFixed(0)}% funded
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DashboardPage;
