
const API_KEY = 'AIzaSyCfmRZieKSsgXZyBckTQA791tFgv98voZw';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    
    addMessage(message, 'user');
    userInput.value = '';


    const loadingMessage = addMessage('Wait please...', 'bot');

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: message
                    }]
                }]
            })
        });

        const data = await response.json();
        const botResponse = data.candidates[0].content.parts[0].text;

        loadingMessage.remove();
        addMessage(botResponse, 'bot');
    } catch (error) {
        loadingMessage.remove();
        addMessage('Sorry, something went wrong. Please try again.', 'bot');
        console.error('Error:', error);
    }
}

function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageElement;
}


userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});