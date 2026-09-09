const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');
const { loadEnvFile } = require('node:process');

// Load environment variables from .env file
try {
  loadEnvFile(path.join(__dirname, '../.env'));
} catch (error) {
  // Ignore error if already loaded or file doesn't exist
}

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

// Main function to find similar projects
async function findSimilarProjects(rl) {
  console.log('\n========================================');
  console.log('         Find Similar Projects          ');
  console.log('========================================\n');

  // 1. Check if Gemini API Key is available
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('Error: GEMINI_API_KEY is missing. Please set it in your .env file.\n');
    return;
  }

  // 2. Read existing projects from projects.json
  const projects = getProjects();
  if (projects.length === 0) {
    console.log('No projects available for similarity checking.\n');
    return;
  }

  // 3. Ask user for their project idea
  const userIdea = await rl.question('Enter your project idea: ');
  const trimmedIdea = userIdea.trim();

  if (trimmedIdea === '') {
    console.log('\nProject idea cannot be empty.\n');
    return;
  }

  // 4. Prepare project data for Gemini comparison
  const projectsSummary = projects.map((p) => ({
    title: p.title,
    problemStatement: p.problemStatement,
    description: p.description,
    howItWorks: p.howItWorks,
    techStack: p.techStack
  }));

  console.log('\nAnalyzing similarity with existing projects using Gemini...\n');

  try {
    // 5. Initialize Gemini AI client
    const ai = new GoogleGenAI({ apiKey });

    // 6. Build prompt for Gemini
    const prompt = `
You are an expert AI assistant that evaluates the similarity between software project ideas.

User's Project Idea:
"${trimmedIdea}"

Existing Projects in the database:
${JSON.stringify(projectsSummary, null, 2)}

Instructions:
1. Compare the user's project idea with each existing project.
2. For each project, compare against:
   - Description
   - Problem Statement
   - How It Works
   - Tech Stack (as supporting information only; tech stack alone does not make projects similar)
3. The main focus must be on the project's actual purpose, problem solved, and core functionality.
4. Assign a similarity percentage between 0 and 100 for each project.
5. Only include projects in "similarProjects" that are meaningfully similar (similarity >= 40%).
6. Sort the results in descending order of similarity (highest similarity first).

Return ONLY a valid JSON object with the following structure and no extra text or markdown formatting:
{
  "similarProjects": [
    {
      "title": "Project Title",
      "similarity": 91
    }
  ]
}
If no projects are meaningfully similar, return:
{
  "similarProjects": []
}
`;

    // 7. Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    // 8. Parse the JSON response
    let responseText = response.text ? response.text.trim() : '';
    
    // Remove markdown code fences if present (e.g. ```json ... ```)
    if (responseText.startsWith('```')) {
      responseText = responseText.replace(/^```(json)?\n?/, '').replace(/```$/, '').trim();
    }

    const result = JSON.parse(responseText);
    const similarProjects = result.similarProjects || [];

    // 9. Display the similarity results
    if (similarProjects.length === 0) {
      console.log('No similar projects found.\n');
    } else {
      console.log('========== Similar Projects ==========\n');
      similarProjects.forEach((item, index) => {
        console.log(`${index + 1}. ${item.title}`);
        console.log(`   Similarity: ${item.similarity}%\n`);
      });
    }

  } catch (error) {
    console.log('Error analyzing project similarity with Gemini. Please try again.\n');
  }
}

module.exports = { findSimilarProjects };
