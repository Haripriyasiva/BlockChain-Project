// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CommunityFunding {

    struct Project {
        address payable owner;
        string description;
        uint fundingGoal;
        uint amountRaised;
        bool withdrawn;
    }

    uint public projectCount = 0;
    mapping(uint => Project) public projects;

    event ProjectCreated(uint projectId, address owner, uint goal, string description);
    event DonationReceived(uint projectId, address donor, uint amount);
    event FundsWithdrawn(uint projectId, uint amount);

    function createProject(string memory _description, uint _fundingGoal) public {
        require(_fundingGoal > 0, "Funding goal must be greater than 0");

        projects[projectCount] = Project({
            owner: payable(msg.sender),
            description: _description,
            fundingGoal: _fundingGoal,
            amountRaised: 0,
            withdrawn: false
        });

        emit ProjectCreated(projectCount, msg.sender, _fundingGoal, _description);

        projectCount++;
    }

    function donate(uint _projectId) public payable {
        Project storage project = projects[_projectId];
        require(msg.value > 0, "Donation must be greater than 0");
        require(project.amountRaised < project.fundingGoal, "Funding goal already met");

        project.amountRaised += msg.value;
        emit DonationReceived(_projectId, msg.sender, msg.value);
    }

    function withdrawFunds(uint _projectId) public {
        Project storage project = projects[_projectId];
        require(msg.sender == project.owner, "Only project owner can withdraw");
        require(project.amountRaised >= project.fundingGoal, "Funding goal not met");
        require(!project.withdrawn, "Funds already withdrawn");

        project.withdrawn = true;
        project.owner.transfer(project.amountRaised);

        emit FundsWithdrawn(_projectId, project.amountRaised);
    }
}