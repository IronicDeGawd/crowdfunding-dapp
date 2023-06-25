//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrowdFunding{

    uint public projectCount;
    mapping(uint=>Project) public idToProjects;

    struct Project{
        uint projectId;
        address creator;
        string title;
        uint goalAmount;
        uint currentAmount;
        bool reachedGoal;
    }

    function createProject(string memory _title, uint _goalAmount) public {
        require(_goalAmount>0, "Goal amount should be greater than 0");

        Project storage currProject = idToProjects[projectCount];

        currProject.projectId = projectCount;
        currProject.creator = msg.sender;
        currProject.title = _title;
        currProject.goalAmount = _goalAmount;
        currProject.creator = msg.sender;

        projectCount++;
}

    function contribute(uint _projectId) public payable {
        Project storage currProject = idToProjects[_projectId];
        require(!currProject.reachedGoal, "Goal has been reached");
        require(msg.value>0, "Contribution should be greater than 0");

        currProject.currentAmount += msg.value;

        if(currProject.currentAmount>=currProject.goalAmount){
            currProject.reachedGoal = true;
        }
}

    function withdrawFunds(uint _projectId) public {
        Project storage currProject = idToProjects[_projectId];
        require(msg.sender==currProject.creator, "You are not the Creator");
        require(currProject.reachedGoal, "Your project has not reached the goal");
        payable(msg.sender).transfer(currProject.currentAmount);
        currProject.currentAmount=0;

    }

    function getProjects() public view returns(Project[] memory){
        Project[] memory projectsArr = new Project[](projectCount);
        for(uint i=0; i<projectCount; i++){
            Project storage currProject = idToProjects[i];
            projectsArr[i].projectId = currProject.projectId;
            projectsArr[i].creator = currProject.creator;
            projectsArr[i].title = currProject.title;
            projectsArr[i].goalAmount = currProject.goalAmount;
            projectsArr[i].currentAmount = currProject.currentAmount;
            projectsArr[i].reachedGoal = currProject.reachedGoal;


        }

        return projectsArr;

    }
}
