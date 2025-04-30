import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from './contract';

function App() {
  const [projects, setProjects] = useState([]);
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [account, setAccount] = useState(null);

  // Connect Wallet
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  };

  // Load all projects
  const loadProjects = async () => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = getContract(provider);

    try {
      const count = await contract.projectCount();
      const items = [];

      for (let i = 0; i < count; i++) {
        const project = await contract.projects(i);
        items.push({ id: i, ...project });
      }

      setProjects(items);
    } catch (err) {
      console.error("Error loading projects:", err);
    }
  };

  // Create project
  const createProject = async () => {
    if (!description || !goal) return alert("Please fill all fields");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.createProject(description, ethers.utils.parseEther(goal));
      await tx.wait();
      alert("Project created!");
      setDescription('');
      setGoal('');
      loadProjects();
    } catch (err) {
      console.error("Error creating project:", err);
      alert("Failed to create project.");
    }
  };

  // Donate
  const donateToProject = async (projectId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.donate(projectId, {
        value: ethers.utils.parseEther("0.01"),
      });
      await tx.wait();
      alert("Donation successful!");
      loadProjects();
    } catch (err) {
      console.error("Donation failed:", err);
      alert("Error donating to project.");
    }
  };

  // Withdraw
  const withdrawFunds = async (projectId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.withdrawFunds(projectId);
      await tx.wait();
      alert("Withdrawal successful!");
      loadProjects();
    } catch (err) {
      console.error("Withdrawal failed:", err);
      alert("Cannot withdraw: goal not reached or already withdrawn.");
    }
  };

  useEffect(() => {
    loadProjects();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => window.location.reload());
    }
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
      <h2>Transparent Community Project Funding</h2>

      {/* Wallet Section */}
      <div style={{ marginBottom: '20px' }}>
        {account ? (
          <p><b>Connected Wallet:</b> {account}</p>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}
      </div>

      {/* Project List */}
      <ul>
        {projects.map((proj, i) => (
          <li key={i} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <p><b>Project #{proj.id}</b></p>
            <p><b>Description:</b> {proj.description}</p>
            <p><b>Owner:</b> {proj.owner}</p>
            <p><b>Goal:</b> {ethers.utils.formatEther(proj.fundingGoal)} ETH</p>
            <p><b>Raised:</b> {ethers.utils.formatEther(proj.amountRaised)} ETH</p>
            <p><b>Status:</b> {proj.withdrawn ? "Withdrawn" : "Active"}</p>

            <button onClick={() => donateToProject(proj.id)} style={{ marginRight: '10px' }}>
              Donate 0.01 ETH
            </button>

            {!proj.withdrawn && account === proj.owner && (
              <button onClick={() => withdrawFunds(proj.id)}>
                Withdraw
              </button>
            )}
          </li>
        ))}
      </ul>

      <hr />

      {/* Create Project */}
      <h3>Create New Project</h3>
      <textarea
        placeholder="Project Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows="3"
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="text"
        placeholder="Funding Goal (ETH)"
        value={goal}
        onChange={e => setGoal(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <button onClick={createProject}>Submit Project</button>
    </div>
  );
}

export default App;