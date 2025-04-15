// Chatbot Widget Loader
(function() {
    // Create link element for chatbot CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '/chatbot/chatbot.css';
    document.head.appendChild(cssLink);

    // Create link for Font Awesome if not already loaded
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
    }

    // Create and append chatbot HTML
    const chatbotHTML = `
        <!-- Chatbot Widget Button -->
        <div id="chatbot-widget-button" class="chatbot-widget-button">
            <i class="fas fa-comment"></i>
        </div>

        <!-- Chatbot Popup Container -->
        <div id="chatbot-popup" class="chatbot-popup">
            <div class="chat-container">
                <div class="chat-header">
                    <h2>AI Assistant</h2>
                    <p>Powered by Google Gemini</p>
                    <button id="close-chat-button" class="close-chat-button">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="chat-messages" id="chat-messages">
                    <div class="message bot-message">
                        <div class="message-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="message-content">
                            <p>Hi there! I'm Pankti's AI assistant powered by Google Gemini. How can I help you today?</p>
                        </div>
                    </div>
                </div>
                <div class="chat-input-container">
                    <textarea id="user-input" placeholder="Type your message here..." rows="1"></textarea>
                    <button id="send-button" class="send-button">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                <div class="chat-footer">
                    <p>This AI assistant uses Google Gemini to provide information about Pankti Mevada and her work.</p>
                </div>
            </div>
        </div>
    `;

    // Create a container for the chatbot
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-widget-container';
    chatbotContainer.innerHTML = chatbotHTML;
    document.body.appendChild(chatbotContainer);
    
    // Add immediate click events to the chat button and close button
    const chatButton = document.getElementById('chatbot-widget-button');
    const chatPopup = document.getElementById('chatbot-popup');
    const closeButton = document.getElementById('close-chat-button');
    
    if (chatButton && chatPopup) {
        chatButton.onclick = function() {
            console.log('Chat button clicked directly');
            chatPopup.classList.add('active');
            // Focus on input field when chat is opened
            setTimeout(() => {
                const userInput = document.getElementById('user-input');
                if (userInput) userInput.focus();
            }, 300);
        };
    }
    
    if (closeButton && chatPopup) {
        closeButton.onclick = function() {
            console.log('Close button clicked directly');
            chatPopup.classList.remove('active');
        };
    }
    
    // Initialize chatbot functionality directly instead of loading external script
    // This ensures the event listeners are attached properly
    setTimeout(() => {
        initChatbot();
    }, 100);

    function initChatbot() {
        // DOM Elements
        const chatMessages = document.getElementById('chat-messages');
        const userInput = document.getElementById('user-input');
        const sendButton = document.getElementById('send-button');
        const chatbotButton = document.getElementById('chatbot-widget-button');
        const chatbotPopup = document.getElementById('chatbot-popup');
        const closeButton = document.getElementById('close-chat-button');
        
        // Chat history to maintain context
        let chatHistory = [
            {
                role: "model",
                parts: [{ text: "Hi there! I'm Pankti's AI assistant powered by Google Gemini. How can I help you today?" }]
            }
        ];
        
        // Portfolio information for the AI to reference
        const portfolioInfo = {
            name: "Pankti Mevada",
            title: "Software Engineer | Full Stack Developer | Tech Innovator",
            education: "Master's in Computer Science at The University of Texas at Dallas",
            skills: [
                "Full-stack development", "Cloud technologies", "Software architecture",
                "JavaScript", "Python", "React", "Node.js"
            ],
            about: "Software engineer with a strong foundation in computer science and a passion for building innovative solutions."
        };

        // Function to add a message to the chat UI
        function addMessageToUI(content, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
            
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'message-avatar';
            
            const icon = document.createElement('i');
            icon.className = isUser ? 'fas fa-user' : 'fas fa-robot';
            avatarDiv.appendChild(icon);
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            // Convert markdown-like syntax to HTML
            let formattedContent = content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br>');
            
            contentDiv.innerHTML = `<p>${formattedContent}</p>`;
            
            messageDiv.appendChild(avatarDiv);
            messageDiv.appendChild(contentDiv);
            
            chatMessages.appendChild(messageDiv);
            
            // Scroll to the bottom of the chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Function to show typing indicator
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator-container';
            typingDiv.id = 'typing-indicator';
            
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'message-avatar';
            
            const icon = document.createElement('i');
            icon.className = 'fas fa-robot';
            avatarDiv.appendChild(icon);
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            typingIndicator.innerHTML = '<span></span><span></span><span></span>';
            
            contentDiv.appendChild(typingIndicator);
            typingDiv.appendChild(avatarDiv);
            typingDiv.appendChild(contentDiv);
            
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Function to remove typing indicator
        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }
        
        // Function to handle user input
        async function handleUserInput() {
            const userMessage = userInput.value.trim();
            
            if (userMessage === '') return;
            
            // Add user message to UI
            addMessageToUI(userMessage, true);
            
            // Add user message to chat history
            chatHistory.push({
                role: "user",
                parts: [{ text: userMessage }]
            });
            
            // Clear input field
            userInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            try {
                // Call the backend API to get response from Gemini
                const response = await fetch('http://localhost:3001/chatbot/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: chatHistory,
                        portfolioInfo: portfolioInfo
                    }),
                });
                
                if (!response.ok) {
                    throw new Error('Failed to get response from AI');
                }
                
                const data = await response.json();
                
                // Remove typing indicator
                removeTypingIndicator();
                
                // Add AI response to UI
                addMessageToUI(data.response);
                
                // Add AI response to chat history
                chatHistory.push({
                    role: "model",
                    parts: [{ text: data.response }]
                });
                
                // Limit chat history to last 10 messages to prevent context overflow
                if (chatHistory.length > 10) {
                    chatHistory = chatHistory.slice(chatHistory.length - 10);
                }
                
            } catch (error) {
                console.error('Error:', error);
                
                // Remove typing indicator
                removeTypingIndicator();
                
                // Show error message
                addMessageToUI("I'm sorry, I encountered an error. Please try again later.");
            }
        }
        
        // Event listeners
        if (sendButton) {
            sendButton.addEventListener('click', handleUserInput);
        }
        
        if (userInput) {
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleUserInput();
                }
            });
            
            // Auto-resize textarea as user types
            userInput.addEventListener('input', () => {
                userInput.style.height = 'auto';
                userInput.style.height = (userInput.scrollHeight) + 'px';
            });
        }
        
        // Chatbot popup toggle
        if (chatbotButton) {
            chatbotButton.addEventListener('click', () => {
                console.log('Chat button clicked');
                chatbotPopup.classList.add('active');
                // Focus on input field when chat is opened
                setTimeout(() => {
                    userInput.focus();
                }, 300);
            });
        }
        
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                chatbotPopup.classList.remove('active');
            });
        }
        
        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (chatbotPopup && !chatbotPopup.contains(e.target) && e.target !== chatbotButton && chatbotPopup.classList.contains('active')) {
                chatbotPopup.classList.remove('active');
            }
        });
        
        console.log('Chatbot initialized successfully');
    }
})();
