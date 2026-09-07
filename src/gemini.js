const { GoogleGenAI } = require('@google/genai');
const { loadEnvFile } = require('node:process');

loadEnvFile('../.env');

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function testGemini() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash-lite',
    contents: `
    Compare these two project ideas:
Project Idea 1:
AI system that detects fake news using NLP

Project Idea 2:
Machine learning system that identifies fake and misleading news

Tell me:
1. Whether they are similar
2. Their similarity percentage
3. A short reason for the similarity`
  });

  console.log(response.text);
}

testGemini();