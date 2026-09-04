const fs = require('fs');
const path = require('path');

// Path to data/projects.json
const filePath = path.join(__dirname, 'data', 'projects.json');

// Function to add a project (collects all project fields and saves to data/projects.json)
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
      console.log('\ndepartment cannot be empty. Please try again.\n');
    } else {
      department = inputDepartment.trim();
    }
  }

  // Prompt the user for optional team members (can be skipped for solo projects)
  const inputTeamMembers = await rl.question('Enter team members (optional): ');
  const teamMembers = inputTeamMembers.trim();

  // Prompt the user for optional GitHub Link
  const inputGitHubLink = await rl.question('Enter GitHub Link (optional): ');
  const GitHub_Link = inputGitHubLink.trim();

  // Prompt the user for optional Deployed Link
  const inputDeployedLink = await rl.question('Enter Deployed Link (optional): ');
  const Deployed_Link = inputDeployedLink.trim();

  // Create a project object with all collected information
  const newProject = {
    title: projectTitle,
    problemStatement: problemStatement,
    description: description,
    objectives: objectives,
    techStack: techStack,
    domain: domain,
    university: university,
    department: department,
    teamMembers: teamMembers,
    githubLink: GitHub_Link,
    deployedLink: Deployed_Link
  };

  // Save the project to data/projects.json
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
}

// Export the addProject function so it can be used in mainmenu.js
module.exports = { addProject };
