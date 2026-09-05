const fs = require('fs');
const path = require('path');

// Path to data/projects.json
const filePath = path.join(__dirname, '../data/projects.json');

// Function to read projects from data/projects.json
function getProjects() {
  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      if (fileData.trim() !== '') {
        return JSON.parse(fileData);
      }
    }
  } catch (error) {
    console.log('\nError reading projects file.\n');
  }
  return [];
}

// Function to display complete details of a single project
function displayProjectDetails(project) {
  console.log('\n========================================');
  console.log('           Project Details');
  console.log('========================================\n');

  console.log('Title:');
  console.log(project.title || '');
  console.log('\nProblem Statement:');
  console.log(project.problemStatement || '');
  console.log('\nDescription:');
  console.log(project.description || '');
  console.log('\nObjectives:');
  console.log(project.objectives || '');
  console.log('\nHow It Works:');
  console.log(project.howItWorks || '');
  console.log('\nTech Stack:');
  console.log(project.techStack || '');
  console.log('\nDomain:');
  console.log(project.domain || '');
  console.log('\nUniversity/College:');
  console.log(project.university || '');
  console.log('\nDepartment:');
  console.log(project.department || '');
  console.log('\nTeam Members:');
  console.log(project.teamMembers || '');
  console.log('\nGitHub Link:');
  console.log(project.githubLink || '');
  console.log('\nDeployed Link:');
  console.log(project.deployedLink || '');
  console.log('\n========================================\n');
}

// Function to handle viewing all projects
async function viewAllProjects(rl) {
  const projects = getProjects();

  if (projects.length === 0) {
    console.log('\nNo projects found.\n');
    await rl.question('Press Enter to return to Browse Projects menu...');
    console.log();
    return;
  }

  console.log('\n========================================');
  console.log('           All Projects');
  console.log('========================================\n');

  projects.forEach((project, index) => {
    console.log(`${index + 1}. ${project.title}`);
  });

  console.log();

  const choice = await rl.question('Enter the project number to view details: ');
  const selectedIndex = parseInt(choice.trim(), 10) - 1;

  if (selectedIndex >= 0 && selectedIndex < projects.length) {
    displayProjectDetails(projects[selectedIndex]);
    await rl.question('Press Enter to return to Browse Projects menu...');
    console.log();
  } else {
    console.log('\nInvalid project number.\n');
  }
}

// Function to handle searching projects
async function searchProjects(rl) {
  const projects = getProjects();

  if (projects.length === 0) {
    console.log('\nNo projects found.\n');
    await rl.question('Press Enter to return to Browse Projects menu...');
    console.log();
    return;
  }

  const query = await rl.question('\nEnter search term: ');
  const trimmedQuery = query.trim().toLowerCase();

  if (trimmedQuery === '') {
    console.log('\nSearch query cannot be empty.\n');
    return;
  }

  const matchingProjects = projects.filter((project) => {
    const fieldsToSearch = [
      project.title,
      project.problemStatement,
      project.description,
      project.objectives,
      project.howItWorks,
      project.techStack,
      project.domain,
      project.university,
      project.department,
      project.teamMembers
    ];

    return fieldsToSearch.some(
      (field) => field && field.toLowerCase().includes(trimmedQuery)
    );
  });

  if (matchingProjects.length === 0) {
    console.log('\nNo matching projects found.\n');
    await rl.question('Press Enter to return to Browse Projects menu...');
    console.log();
    return;
  }

  let inResultsMenu = true;

  while (inResultsMenu) {
    console.log('\n========================================');
    console.log('              Search Results');
    console.log('========================================\n');

    matchingProjects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
    });

    console.log(`${matchingProjects.length + 1}. Back to Browse Menu\n`);

    const choice = await rl.question('Enter your choice: ');
    const selectedIndex = parseInt(choice.trim(), 10) - 1;

    if (selectedIndex >= 0 && selectedIndex < matchingProjects.length) {
      displayProjectDetails(matchingProjects[selectedIndex]);
      await rl.question('Press Enter to return to search results...');
    } else if (selectedIndex === matchingProjects.length) {
      console.log();
      inResultsMenu = false; // Return to Browse Projects Menu
    } else {
      console.log('\nInvalid choice. Please try again.\n');
    }
  }
}

// Function to show the browse projects menu options
function showBrowseMenu() {
  console.log('Browse Projects\n');
  console.log('1. View All Projects');
  console.log('2. Search Projects');
  console.log('3. Back\n');
}

// Function to handle Browse Projects menu
async function browseProjects(rl) {
  let inBrowseMenu = true;

  while (inBrowseMenu) {
    showBrowseMenu();
    const choice = await rl.question('Enter your choice: ');

    if (choice.trim() === '1') {
      await viewAllProjects(rl);
    } else if (choice.trim() === '2') {
      await searchProjects(rl);
    } else if (choice.trim() === '3') {
      console.log();
      inBrowseMenu = false; // Return to Main Menu
    } else {
      console.log('\nInvalid choice. Please enter a number from 1 to 3.\n');
    }
  }
}

module.exports = { browseProjects };
