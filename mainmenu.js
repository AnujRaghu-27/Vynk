const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const { addProject } = require('./addproject');

// 1. Function to show the welcome message
function showWelcomeMessage() {
  console.log('========================================');
  console.log('              Welcome to Vynk           ');
  console.log('========================================\n');
}

// 2. Function to show the main menu options
function showMainMenu() {
  console.log('Main Menu\n');
  console.log('1. Browse Projects');
  console.log('2. Add Project');
  console.log('3. Find Similar Projects');
  console.log('4. Find Related Projects');
  console.log('5. Exit\n');
}

// 3. Function to handle the user choice
async function handleChoice(choice, rl) {
  if (choice === '1') {
    console.log('\nBrowse Projects feature will be implemented here.\n');
    return true;
  } else if (choice === '2') {
    await addProject(rl);
    return true;
  } else if (choice === '3') {
    console.log('\nFind Similar Projects feature will be implemented here.\n');
    return true;
  } else if (choice === '4') {
    console.log('\nFind Related Projects feature will be implemented here.\n');
    return true;
  } else if (choice === '5') {
    console.log('\nThank you for using Vynk!');
    console.log('Goodbye.\n');
    return false; // Returning false tells our loop to stop
  } else {
    console.log('\nInvalid choice. Please enter a number from 1 to 5.\n');
    return true;
  }
}

// 4. Main function to run the application
async function main() {
  // Create an interface to read user input from the terminal
  const rl = readline.createInterface({ input, output });

  // Clear the terminal screen before displaying the welcome message
  process.stdout.write('\x1b[2J\x1b[H');

  // Display the welcome banner once when the app starts
  showWelcomeMessage();

  let isRunning = true;

  // Keep showing the menu in a loop until the user chooses to exit
  while (isRunning) {
    showMainMenu();
    const userChoice = await rl.question('Enter your choice: ');
    process.stdout.write('\x1b[2J\x1b[H');
    isRunning = await handleChoice(userChoice.trim(), rl);
  }

  // Close the readline interface when exiting
  rl.close();
}

// Start the application
main();
