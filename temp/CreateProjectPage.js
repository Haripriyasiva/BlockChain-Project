import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { FaEthereum, FaInfoCircle, FaExclamationCircle, FaArrowLeft } from 'react-icons/fa';
import contractAbi from '../CommunityFunding.json';
import { useNotification } from '../context/NotificationContext';

const contractAddress = "0xFEeC5C6d57c3cb243f477c39C650Cd3a992fcF42";

const CreateProjectPage = ({ account }) => {
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!title.trim()) {
      errors.title = "Project title is required";
    } else if (title.length < 5) {
      errors.title = "Title must be at least 5 characters";
    }

    if (!description.trim()) {
      errors.description = "Project description is required";
    } else if (description.length < 20) {
      errors.description = "Description must be at least 20 characters";
    }

    if (!goal) {
      errors.goal = "Funding goal is required";
    } else if (parseFloat(goal) <= 0) {
      errors.goal = "Goal must be greater than 0";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const createProject = async (e) => {
    e.preventDefault();

    if (!account) {
      setError("Please connect your wallet to create a project");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);

      // Combine title and description for the contract's description parameter
      const fullDescription = `${title}\n\n${description}`;
      const goalInWei = ethers.parseEther(goal);
      
      // Call the contract with only description and fundingGoal parameters
      const tx = await contract.createProject(fullDescription, goalInWei);
      await tx.wait();

      // Show success notification
      showSuccess("Project created successfully! Redirecting to projects page...");

      // Clear form
      setTitle('');
      setDescription('');
      setGoal('');

      // Redirect to projects page after successful creation
      setTimeout(() => {
        navigate('/projects');
      }, 2000);
    } catch (err) {
      console.error("Error creating project:", err);
      
      // Extract more meaningful error message
      let errorMessage = "Failed to create project. Please try again.";
      if (err.message && err.message.includes("UNSUPPORTED_OPERATION")) {
        errorMessage = "Contract operation not supported. Please make sure you're connected to the correct network.";
      } else if (err.message) {
        errorMessage = err.message.split('(')[0].trim(); // Get first part of error message
      }
      
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-950 text-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-400 hover:text-emerald-400 transition-colors mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        
        <h1 className="text-3xl font-bold mb-6">Create New Project</h1>

        {error && (
          <div className="bg-red-900/50 border border-red-600 text-white p-4 rounded-xl mb-6 flex items-start">
            <FaExclamationCircle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {!account && (
          <div className="bg-yellow-900/50 border border-yellow-600 text-white p-4 rounded-xl mb-6 flex items-start">
            <FaExclamationCircle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
            <p>Please connect your wallet to create a project</p>
          </div>
        )}

        <div className="bg-indigo-900 rounded-xl p-6 shadow-xl border border-indigo-800">
          <form onSubmit={createProject}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter a clear, descriptive title"
                className={`w-full p-3 rounded-lg bg-indigo-950 text-white placeholder-gray-400 border ${
                  formErrors.title ? 'border-red-500' : 'border-indigo-700 focus:border-emerald-500'
                } focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
              />
              {formErrors.title && (
                <p className="mt-1 text-sm text-red-400">{formErrors.title}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Project Description
              </label>
              <textarea
                id="description"
                placeholder="Describe your project in detail. What are you trying to accomplish? How will the funds be used?"
                className={`w-full p-3 rounded-lg bg-indigo-950 text-white placeholder-gray-400 min-h-[150px] border ${
                  formErrors.description ? 'border-red-500' : 'border-indigo-700 focus:border-emerald-500'
                } focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
              />
              {formErrors.description && (
                <p className="mt-1 text-sm text-red-400">{formErrors.description}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="goal" className="block text-sm font-medium text-gray-300 mb-1">
                Funding Goal (ETH)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="goal"
                  placeholder="0.1"
                  step="0.01"
                  min="0"
                  className={`w-full p-3 pl-10 rounded-lg bg-indigo-950 text-white placeholder-gray-400 border ${
                    formErrors.goal ? 'border-red-500' : 'border-indigo-700 focus:border-emerald-500'
                  } focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors`}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  disabled={isLoading}
                />
                <FaEthereum className="absolute left-3 top-3 text-emerald-500" />
              </div>
              {formErrors.goal && (
                <p className="mt-1 text-sm text-red-400">{formErrors.goal}</p>
              )}
            </div>

            <div className="bg-indigo-950/70 p-4 rounded-xl mb-6 border border-indigo-800">
              <div className="flex items-start">
                <FaInfoCircle className="text-emerald-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-white">Important Information</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Creating a project requires a transaction on the Ethereum blockchain. You'll need to pay a small gas fee to create your project.
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    Funds will only be released to you when your funding goal is reached.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white font-semibold py-3 px-4 rounded-xl transition-all hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !account}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                  Creating Project...
                </span>
              ) : (
                'Create Project'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;
