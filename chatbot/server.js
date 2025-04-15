const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..'))); // Serve the portfolio directory

// Initialize Google Generative AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configure the model
const modelConfig = {
  temperature: 0.7,
  topP: 0.8,
  topK: 40,
};

// Create a system prompt to guide the AI's responses
const systemPrompt = `
You are an AI assistant for Pankti Mevada's portfolio website. Your name is PM Assistant.
You should be helpful, professional, and represent Pankti well.

Here's information about Pankti that you should use when responding to questions:
- Name: Pankti Mevada
- Role: Software Engineer, Full Stack Developer, Tech Innovator
- Education: Master's in Computer Science at The University of Texas at Dallas
- Skills: Full-stack development, Cloud technologies, Software architecture, JavaScript, Python, React, Node.js
- About: Software engineer with a strong foundation in computer science and a passion for building innovative solutions.

When answering:
1. Be concise and professional
2. If asked about Pankti's skills, experience, or background, use the information provided
3. If asked something you don't know, politely say you don't have that specific information
4. Maintain a helpful and friendly tone
5. Format your responses with markdown for better readability
6. If asked about contacting Pankti, suggest using the contact form on the main portfolio page

Do not:
- Make up information about Pankti that isn't provided
- Share personal opinions on controversial topics
- Provide harmful, illegal, or unethical advice
`;

// API endpoint to handle chat requests
app.post('/chatbot/api', async (req, res) => {
  try {
    const { messages, portfolioInfo } = req.body;
    
    // Create a conversation with the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro", ...modelConfig });
    const chat = model.startChat({
      history: messages.slice(0, -1), // Exclude the latest user message
      systemInstruction: systemPrompt,
    });

    // Get response for the latest user message
    const latestUserMessage = messages[messages.length - 1].parts[0].text;
    const result = await chat.sendMessage(latestUserMessage);
    const response = result.response.text();
    
    res.json({ response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
