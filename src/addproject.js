const fs = require('fs');
const path = require('path');

// Path to data/projects.json
const filePath = path.join(__dirname, '../data/projects.json');

// Helper function to validate if a link is a valid GitHub URL
function isValidGithubLink(link) {
  return link.startsWith('https://github.com/');
}

// Function to add a project (collects all project fields, reviews, and saves to data/projects.json)
async function addProject(rl) {
  console.log('Add Project\n');

  let projectTitle = '';

  // Prompt the user until a non-empty project title is provided
  while (!projectTitle) {
    const inputTitle = await rl.question('Enter project title: ');
    if (inputTitle.trim() === '') {
      console.log('\nProject title cannot be empty. Please try again.\n');
    } else {
      projectTitle = inputTitle.trim();
    }
  }

  let problemStatement = '';

  // Prompt the user until a non-empty problem statement is provided
  while (!problemStatement) {
    const inputStatement = await rl.question('Enter problem statement: ');
    if (inputStatement.trim() === '') {
      console.log('\nProblem statement cannot be empty. Please try again.\n');
    } else {
      problemStatement = inputStatement.trim();
    }
  }

  let description = '';

  // Prompt the user until a non-empty description is provided
  while (!description) {
    const inputDescription = await rl.question('Enter project description: ');
    if (inputDescription.trim() === '') {
      console.log('\nDescription cannot be empty. Please try again.\n');
    } else {
      description = inputDescription.trim();
    }
  }

  let objectives = '';

  // Prompt the user until non-empty objectives are provided
  while (!objectives) {
    const inputObjectives = await rl.question('Enter project objectives: ');
    if (inputObjectives.trim() === '') {
      console.log('\nObjectives cannot be empty. Please try again.\n');
    } else {
      objectives = inputObjectives.trim();
    }
  }

  let howItWorks = '';

  // Prompt the user until a non-empty how it works is provided
  while (!howItWorks) {
    const inputHowItWorks = await rl.question('Enter how the project works: ');
    if (inputHowItWorks.trim() === '') {
      console.log('\nHow It Works cannot be empty. Please try again.\n');
    } else {
      howItWorks = inputHowItWorks.trim();
    }
  }

  let techStack = '';

  // Prompt the user until a non-empty tech stack is provided
  while (!techStack) {
    const inputTechStack = await rl.question('Enter tech stack: ');
    if (inputTechStack.trim() === '') {
      console.log('\nTech stack cannot be empty. Please try again.\n');
    } else {
      techStack = inputTechStack.trim();
    }
  }

  let domain = '';

  // Prompt the user until a non-empty domain is provided
  while (!domain) {
    const inputDomain = await rl.question('Enter project domain: ');
    if (inputDomain.trim() === '') {
      console.log('\nDomain cannot be empty. Please try again.\n');
    } else {
      domain = inputDomain.trim();
    }
  }

  let university = '';

  // Prompt the user until a non-empty university/college name is provided
  while (!university) {
    const inputUniversity = await rl.question('Enter university/college name: ');
    if (inputUniversity.trim() === '') {
      console.log('\nUniversity/College name cannot be empty. Please try again.\n');
    } else {
      university = inputUniversity.trim();
    }
  }

  let department = '';

  // Prompt the user until a non-empty department is provided
  while (!department) {
    const inputDepartment = await rl.question('Enter project department: ');
    if (inputDepartment.trim() === '') {
      console.log('\nDepartment cannot be empty. Please try again.\n');
    } else {
      department = inputDepartment.trim();
    }
  }

  // Prompt the user for optional team members (can be skipped for solo projects)
  const inputTeamMembers = await rl.question('Enter team members (optional): ');
  let teamMembers = inputTeamMembers.trim();

  // Prompt the user for optional GitHub Link with validation
  let githubLink = '';
  while (true) {
    const inputGitHubLink = await rl.question('Enter GitHub Link (optional): ');
    const trimmedLink = inputGitHubLink.trim();

    if (trimmedLink === '') {
      githubLink = 'Not Provided';
      break;
    } else if (isValidGithubLink(trimmedLink)) {
      githubLink = trimmedLink;
      break;
    } else {
      console.log('\nInvalid GitHub link. Please enter a valid GitHub URL starting with https://github.com/\n');
    }
  }

  // Prompt the user for optional Deployed Link
  const inputDeployedLink = await rl.question('Enter Deployed Link (optional): ');
  let deployedLink = inputDeployedLink.trim();
  if (deployedLink === '') {
    deployedLink = 'Not Provided';
  }

  // Review and confirmation loop
  let reviewing = true;

  while (reviewing) {
    console.log('\n========================================');
    console.log('           Review Project');
    console.log('========================================\n');

    console.log('Title:');
    console.log(projectTitle);
    console.log('\nProblem Statement:');
    console.log(problemStatement);
    console.log('\nDescription:');
    console.log(description);
    console.log('\nObjectives:');
    console.log(objectives);
    console.log('\nHow It Works:');
    console.log(howItWorks);
    console.log('\nTech Stack:');
    console.log(techStack);
    console.log('\nDomain:');
    console.log(domain);
    console.log('\nUniversity/College:');
    console.log(university);
    console.log('\nDepartment:');
    console.log(department);
    console.log('\nTeam Members:');
    console.log(teamMembers);
    console.log('\nGitHub Link:');
    console.log(githubLink);
    console.log('\nDeployed Link:');
    console.log(deployedLink);

    console.log('\n========================================\n');
    console.log('1. Confirm');
    console.log('2. Edit');
    console.log('3. Cancel\n');

    const confirmChoice = await rl.question('Enter your choice: ');

    if (confirmChoice.trim() === '1') {
      // 1. Confirm: Create the project object and save to file
      const newProject = {
        title: projectTitle,
        problemStatement: problemStatement,
        description: description,
        objectives: objectives,
        howItWorks: howItWorks,
        techStack: techStack,
        domain: domain,
        university: university,
        department: department,
        teamMembers: teamMembers,
        githubLink: githubLink,
        deployedLink: deployedLink
      };

      try {
        let projects = [];

        // Check if the file exists and read existing projects
        if (fs.existsSync(filePath)) {
          const fileData = fs.readFileSync(filePath, 'utf-8');
          if (fileData.trim() !== '') {
            projects = JSON.parse(fileData);
          }
        }

        // Add the new project to the array
        projects.push(newProject);

        // Write the updated array back to data/projects.json
        fs.writeFileSync(filePath, JSON.stringify(projects, null, 2), 'utf-8');

        console.log('\nProject added successfully!\n');
      } catch (error) {
        console.log('\nError saving project to file. Please try again.\n');
      }

      reviewing = false;
    } else if (confirmChoice.trim() === '2') {
      // 2. Edit: Show the edit menu and update chosen field
      let editing = true;
      while (editing) {
        console.log('\nWhat would you like to edit?\n');
        console.log('1. Title');
        console.log('2. Problem Statement');
        console.log('3. Description');
        console.log('4. Objectives');
        console.log('5. How It Works');
        console.log('6. Tech Stack');
        console.log('7. Domain');
        console.log('8. University/College');
        console.log('9. Department');
        console.log('10. Team Members');
        console.log('11. GitHub Link');
        console.log('12. Deployed Link');
        console.log('13. Back to Review\n');

        const editChoice = await rl.question('Enter your choice: ');

        if (editChoice.trim() === '1') {
          let newTitle = '';
          while (!newTitle) {
            const inputTitle = await rl.question('\nEnter new project title: ');
            if (inputTitle.trim() === '') {
              console.log('\nProject title cannot be empty. Please try again.\n');
            } else {
              newTitle = inputTitle.trim();
            }
          }
          projectTitle = newTitle;
          editing = false;
        } else if (editChoice.trim() === '2') {
          let newStatement = '';
          while (!newStatement) {
            const inputStatement = await rl.question('\nEnter new problem statement: ');
            if (inputStatement.trim() === '') {
              console.log('\nProblem statement cannot be empty. Please try again.\n');
            } else {
              newStatement = inputStatement.trim();
            }
          }
          problemStatement = newStatement;
          editing = false;
        } else if (editChoice.trim() === '3') {
          let newDescription = '';
          while (!newDescription) {
            const inputDescription = await rl.question('\nEnter new project description: ');
            if (inputDescription.trim() === '') {
              console.log('\nDescription cannot be empty. Please try again.\n');
            } else {
              newDescription = inputDescription.trim();
            }
          }
          description = newDescription;
          editing = false;
        } else if (editChoice.trim() === '4') {
          let newObjectives = '';
          while (!newObjectives) {
            const inputObjectives = await rl.question('\nEnter new project objectives: ');
            if (inputObjectives.trim() === '') {
              console.log('\nObjectives cannot be empty. Please try again.\n');
            } else {
              newObjectives = inputObjectives.trim();
            }
          }
          objectives = newObjectives;
          editing = false;
        } else if (editChoice.trim() === '5') {
          let newHowItWorks = '';
          while (!newHowItWorks) {
            const inputHowItWorks = await rl.question('\nEnter new How It Works: ');
            if (inputHowItWorks.trim() === '') {
              console.log('\nHow It Works cannot be empty. Please try again.\n');
            } else {
              newHowItWorks = inputHowItWorks.trim();
            }
          }
          howItWorks = newHowItWorks;
          editing = false;
        } else if (editChoice.trim() === '6') {
          let newTechStack = '';
          while (!newTechStack) {
            const inputTechStack = await rl.question('\nEnter new tech stack: ');
            if (inputTechStack.trim() === '') {
              console.log('\nTech stack cannot be empty. Please try again.\n');
            } else {
              newTechStack = inputTechStack.trim();
            }
          }
          techStack = newTechStack;
          editing = false;
        } else if (editChoice.trim() === '7') {
          let newDomain = '';
          while (!newDomain) {
            const inputDomain = await rl.question('\nEnter new project domain: ');
            if (inputDomain.trim() === '') {
              console.log('\nDomain cannot be empty. Please try again.\n');
            } else {
              newDomain = inputDomain.trim();
            }
          }
          domain = newDomain;
          editing = false;
        } else if (editChoice.trim() === '8') {
          let newUniversity = '';
          while (!newUniversity) {
            const inputUniversity = await rl.question('\nEnter new university/college name: ');
            if (inputUniversity.trim() === '') {
              console.log('\nUniversity/College name cannot be empty. Please try again.\n');
            } else {
              newUniversity = inputUniversity.trim();
            }
          }
          university = newUniversity;
          editing = false;
        } else if (editChoice.trim() === '9') {
          let newDepartment = '';
          while (!newDepartment) {
            const inputDepartment = await rl.question('\nEnter new project department: ');
            if (inputDepartment.trim() === '') {
              console.log('\nDepartment cannot be empty. Please try again.\n');
            } else {
              newDepartment = inputDepartment.trim();
            }
          }
          department = newDepartment;
          editing = false;
        } else if (editChoice.trim() === '10') {
          const inputTeam = await rl.question('\nEnter new team members (optional): ');
          teamMembers = inputTeam.trim();
          editing = false;
        } else if (editChoice.trim() === '11') {
          let newGitHubLink = '';
          while (true) {
            const inputGitHub = await rl.question('\nEnter new GitHub Link (optional): ');
            const trimmedGitHub = inputGitHub.trim();

            if (trimmedGitHub === '') {
              newGitHubLink = 'Not Provided';
              break;
            } else if (isValidGithubLink(trimmedGitHub)) {
              newGitHubLink = trimmedGitHub;
              break;
            } else {
              console.log('\nInvalid GitHub link. Please enter a valid GitHub URL starting with https://github.com/\n');
            }
          }
          githubLink = newGitHubLink;
          editing = false;
        } else if (editChoice.trim() === '12') {
          const inputDeployed = await rl.question('\nEnter new Deployed Link (optional): ');
          deployedLink = inputDeployed.trim();
          if (deployedLink==""){
            deployedLink="Not Provided";
          }
          editing = false;
        } else if (editChoice.trim() === '13') {
          editing = false;
        } else {
          console.log('\nInvalid choice. Please enter a number from 1 to 13.\n');
        }
      }
    } else if (confirmChoice.trim() === '3') {
      // 3. Cancel: Discard project and return to Main Menu
      console.log('\nProject creation cancelled.\n');
      reviewing = false;
    } else {
      console.log('\nInvalid choice. Please enter 1, 2, or 3.\n');
    }
  }
}

// Export the addProject function
module.exports = { addProject };
