// AI Tutor Chat Demo
const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('.chat-input button');
const chatMessages = document.querySelector('.chat-messages');

function addMessage(message, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            addMessage('I understand your question about "' + message + '". Let me help you with that...', false);
        }, 1000);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatButton.click();
    }
});

// Voice Control Demo
const micButton = document.querySelector('.mic-button');
const voiceStatus = document.querySelector('.voice-status');
let isListening = false;

micButton.addEventListener('click', () => {
    isListening = !isListening;
    if (isListening) {
        micButton.style.backgroundColor = '#ff4444';
        voiceStatus.textContent = 'Listening...';
        
        // Simulate voice recognition after 2 seconds
        setTimeout(() => {
            voiceStatus.textContent = 'Recognized: "Start math lesson"';
            isListening = false;
            micButton.style.backgroundColor = '#14BF96';
        }, 2000);
    } else {
        micButton.style.backgroundColor = '#14BF96';
        voiceStatus.textContent = 'Click to start voice commands';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add event listeners for subject headers
document.addEventListener('DOMContentLoaded', function() {
    const subjectHeaders = document.querySelectorAll('.subject-header');
    
    subjectHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.closest('.subject-section');
            const classList = section.querySelector('.class-list');
            const expandBtn = this.querySelector('.expand-btn');
            
            // Toggle active class
            classList.classList.toggle('active');
            expandBtn.classList.toggle('active');
            
            // Set initial max-height when opening
            if (classList.classList.contains('active')) {
                classList.style.maxHeight = classList.scrollHeight + 'px';
            } else {
                classList.style.maxHeight = '0';
            }
        });
    });
}); 