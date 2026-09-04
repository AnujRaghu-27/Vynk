// Function to add a project (currently collects project title, problem statement, description, objectives, tech stack, domain, and university/college name)
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

  console.log('\nProject details collected successfully!\n');
}

// Export the addProject function so it can be used in mainmenu.js
module.exports = { addProject };
