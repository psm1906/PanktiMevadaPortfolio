# Pankti Mevada - AI Chatbot

This is an AI chatbot for Pankti Mevada's portfolio website, powered by Google Gemini. The chatbot is designed to match the portfolio's theme and provide information about Pankti's skills, experience, and projects.

## Setup Instructions

### 1. Get a Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key

### 2. Create a .env File

Create a `.env` file in the `chatbot` directory with the following content:

```
GEMINI_API_KEY=your_api_key_here
PORT=3001
```

Replace `your_api_key_here` with the API key you obtained from Google AI Studio.

### 3. Install Dependencies

Navigate to the chatbot directory and run:

```bash
npm install
```

This will install all the required dependencies for the chatbot.

### 4. Start the Server

Start the server by running:

```bash
npm start
```

For development with auto-restart on file changes:

```bash
npm run dev
```

### 5. Access the Chatbot

Open your browser and go to:

```
http://localhost:3001/chatbot/
```

## Features

- Responsive design that matches the portfolio theme
- Real-time chat interface with typing indicators
- Context-aware conversations using Google Gemini
- Markdown support for formatting responses
- Mobile-friendly interface

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- AI: Google Gemini API

## Customization

You can customize the chatbot's behavior by modifying the `systemPrompt` in `server.js`. This prompt guides the AI's responses and provides context about Pankti Mevada.

## Security Notes

- The `.env` file containing your API key is included in `.gitignore` to prevent it from being committed to version control
- Always keep your API key private and never share it publicly
