import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import contractAbi from './CommunityFunding.json';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Pages
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import DiscoverPage from './pages/DiscoverPage';
import SettingsPage from './pages/SettingsPage';

// Context
import { NotificationProvider } from './context/NotificationContext';
import { ThemeProvider } from './context/ThemeContext';

const contractAddress = "0xFEeC5C6d57c3cb243f477c39C650Cd3a992fcF42";

function App() {
  const [projects, setProjects] = useState([]);
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use useCallback to memoize the loadBlockchainData function
  const loadBlockchainData = useCallback(async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return [];
    }

    try {
      setIsLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);
      const count = await contract.projectCount();

      console.log("Total projects count:", count.toString());

      const items = [];
      console.log("Project count from contract:", count.toString());

      // Projects are stored in a mapping starting at index 0
      for (let i = 0; i < count; i++) {
        try {
          const project = await contract.projects(i);

          // Skip empty projects (this shouldn't happen, but just in case)
          if (!project || !project.owner) {
            console.log(`Skipping empty project at index ${i}`);
            continue;
          }

          console.log(`Raw project ${i}:`, {
            owner: project.owner,
            description: project.description,
            fundingGoal: project.fundingGoal.toString(),
            amountRaised: project.amountRaised.toString(),
            withdrawn: project.withdrawn
          });

          // Process the project data to extract title and description
          const processedProject = processProjectData(project, i);
          items.push(processedProject);
        } catch (error) {
          console.error(`Error loading project ${i}:`, error);
        }
      }

      console.log("Loaded projects:", items);
      setProjects(items);
      return items; // Return for components that need immediate access
    } catch (error) {
      console.error("Error loading blockchain data:", error);
      return []; // Return empty array on error
    } finally {
      setIsLoading(false);
    }
  }, []);

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
        withdrawn: project.withdrawn || false
      };

      // Add creator field as an alias for owner for compatibility
      processedProject.creator = processedProject.owner;

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

      console.log("Processed project:", {
        id: processedProject.id,
        owner: processedProject.owner,
        title: processedProject.title,
        description: processedProject.description.substring(0, 50) + (processedProject.description.length > 50 ? "..." : ""),
        fundingGoal: ethers.formatEther(processedProject.fundingGoal),
        amountRaised: ethers.formatEther(processedProject.amountRaised),
        withdrawn: processedProject.withdrawn
      });

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
        withdrawn: false
      };
    }
  };

  // Function to get details for a specific project
  const getProjectDetails = useCallback(async (id) => {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask!");
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);

      console.log(`Getting project details for ID: ${id}`);
      const project = await contract.projects(id);
      console.log(`Raw project ${id}:`, project);

      // Process the project data to extract title and description
      const processedProject = processProjectData(project, id);
      return processedProject;
    } catch (error) {
      console.error(`Error getting project ${id}:`, error);
      throw error;
    }
  }, []);

  // Function to donate to a project
  const donate = useCallback(async (id, amount) => {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask!");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);

    const tx = await contract.donate(id, {
      value: ethers.parseEther(amount),
    });
    await tx.wait();
  }, []);

  // Function to withdraw funds from a project
  const withdrawFunds = useCallback(async (id) => {
    if (!window.ethereum) {
      throw new Error("Please install MetaMask!");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi.abi, signer);

    const tx = await contract.withdrawFunds(id);
    await tx.wait();
  }, []);

  // Connect wallet function
  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    try {
      setIsLoading(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);

      // Reload blockchain data after connecting wallet
      await loadBlockchainData();
    } catch (error) {
      console.error("User denied account access", error);
    } finally {
      setIsLoading(false);
    }
  }, [loadBlockchainData]);

  useEffect(() => {
    // Connect wallet on initial load
    connectWallet();

    // Load blockchain data
    loadBlockchainData();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          // Reload blockchain data when account changes
          await loadBlockchainData();
        } else {
          setAccount(null);
        }
      });

      // Listen for network changes
      window.ethereum.on('chainChanged', async () => {
        // Reload blockchain data when network changes
        await loadBlockchainData();
      });
    }

    // Reload data every 30 seconds to keep it fresh
    const intervalId = setInterval(() => {
      loadBlockchainData();
    }, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [connectWallet, loadBlockchainData]);

  return (
    <ThemeProvider>
      <NotificationProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gradient-to-b dark:from-indigo-950 dark:via-purple-950 dark:to-indigo-950 light:from-slate-50 light:via-white light:to-slate-100 transition-colors duration-300">
            {isLoading && <LoadingSpinner fullScreen />}
            <Navbar account={account} connectWallet={connectWallet} />
            <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
              <Routes>
                <Route path="/" element={<HomePage projects={projects} />} />
                <Route path="/projects" element={<ProjectsPage projects={projects} loadBlockchainData={loadBlockchainData} />} />
                <Route path="/project/:id" element={<ProjectDetailPage account={account} getProjectDetails={getProjectDetails} donate={donate} withdrawFunds={withdrawFunds} />} />
                <Route path="/create" element={<CreateProjectPage account={account} loadBlockchainData={loadBlockchainData} />} />
                <Route path="/profile" element={<ProfilePage account={account} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/dashboard" element={<DashboardPage account={account} projects={projects} />} />
                <Route path="/discover" element={<DiscoverPage projects={projects} />} />
                <Route path="/settings" element={<SettingsPage account={account} />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
