// Initialize TensorFlow.js and Universal Sentence Encoder
let model;
let encoder;

async function loadModel() {
    try {
        encoder = await use.load();
        console.log('Model loaded successfully');
    } catch (err) {
        console.error('Error loading model:', err);
    }
}

// Load the model when the page loads
document.addEventListener('DOMContentLoaded', loadModel);

// Chat functionality
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');

// Learning style analysis
const learningStyles = {
    visual: 0,
    auditory: 0,
    reading: 0,
    kinesthetic: 0
};

// Sample knowledge base
const knowledgeBase = {
    math: {
        calculus: {
            derivatives: {
                concept: "A derivative measures the rate of change of a function with respect to its variable.",
                examples: [
                    "The derivative of f(x) = x² is f'(x) = 2x",
                    "The derivative of sin(x) is cos(x)"
                ],
                practice: [
                    {
                        question: "Find the derivative of f(x) = x³",
                        answer: "f'(x) = 3x²",
                        explanation: "Using the power rule, multiply by the power and reduce the power by 1"
                    }
                ]
            }
        }
    }
};

// Add a message to the chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send a message
async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Add user message
    addMessage(text, true);
    userInput.value = '';

    // Analyze learning style based on message
    analyzeLearningStyle(text);

    // Generate AI response
    const response = await generateResponse(text);
    addMessage(response);

    // Update learning profile
    updateLearningProfile();
}

// Handle enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Analyze learning style from user input
function analyzeLearningStyle(text) {
    const visualKeywords = ['see', 'look', 'picture', 'diagram', 'graph'];
    const auditoryKeywords = ['hear', 'sound', 'tell', 'explain', 'discuss'];
    const readingKeywords = ['read', 'write', 'text', 'notes', 'book'];
    const kinestheticKeywords = ['do', 'practice', 'try', 'experiment', 'hands-on'];

    text = text.toLowerCase();

    visualKeywords.forEach(word => {
        if (text.includes(word)) learningStyles.visual++;
    });

    auditoryKeywords.forEach(word => {
        if (text.includes(word)) learningStyles.auditory++;
    });

    readingKeywords.forEach(word => {
        if (text.includes(word)) learningStyles.reading++;
    });

    kinestheticKeywords.forEach(word => {
        if (text.includes(word)) learningStyles.kinesthetic++;
    });
}

// Generate AI response
async function generateResponse(text) {
    // Simple response generation based on keywords
    text = text.toLowerCase();
    
    if (text.includes('explain') || text.includes('what is')) {
        return explainConcept(text);
    } else if (text.includes('practice') || text.includes('exercise')) {
        return generatePracticeQuestion();
    } else if (text.includes('plan') || text.includes('schedule')) {
        return createStudyPlan();
    } else {
        return "I'm here to help you learn! You can ask me to explain concepts, generate practice questions, or create a study plan.";
    }
}

// Create personalized study plan
function createStudyPlan() {
    const modal = document.getElementById('studyPlanModal');
    const content = document.getElementById('studyPlanContent');
    
    // Generate plan based on learning style
    const dominantStyle = getDominantLearningStyle();
    
    let plan = `<h3>Your Personalized Study Plan</h3>
                <p>Based on your ${dominantStyle} learning style, here's a customized plan:</p>
                <ul>`;
    
    switch (dominantStyle) {
        case 'visual':
            plan += `
                <li>Watch video tutorials with diagrams and animations</li>
                <li>Create mind maps for complex topics</li>
                <li>Use color-coded notes</li>
                <li>Study with graphs and charts</li>
            `;
            break;
        case 'auditory':
            plan += `
                <li>Listen to educational podcasts</li>
                <li>Participate in group discussions</li>
                <li>Record and replay explanations</li>
                <li>Use verbal mnemonics</li>
            `;
            break;
        case 'reading':
            plan += `
                <li>Read textbook chapters</li>
                <li>Take detailed notes</li>
                <li>Write summaries</li>
                <li>Create flashcards</li>
            `;
            break;
        case 'kinesthetic':
            plan += `
                <li>Hands-on experiments</li>
                <li>Interactive simulations</li>
                <li>Practice problems</li>
                <li>Real-world applications</li>
            `;
            break;
    }
    
    plan += `</ul>`;
    content.innerHTML = plan;
    modal.style.display = 'block';
}

// Close study plan modal
function closeStudyPlan() {
    document.getElementById('studyPlanModal').style.display = 'none';
}

// Get dominant learning style
function getDominantLearningStyle() {
    const styles = Object.entries(learningStyles);
    return styles.reduce((a, b) => b[1] > a[1] ? b : a)[0];
}

// Update learning profile
function updateLearningProfile() {
    const learningTags = document.getElementById('learningTags');
    learningTags.innerHTML = '';
    
    Object.entries(learningStyles).forEach(([style, score]) => {
        if (score > 0) {
            const tag = document.createElement('span');
            tag.className = 'style-tag';
            tag.textContent = style.charAt(0).toUpperCase() + style.slice(1);
            learningTags.appendChild(tag);
        }
    });
}

// Voice input functionality
let recognition;

function startVoiceInput() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = function(event) {
            const text = event.results[0][0].transcript;
            userInput.value = text;
            sendMessage();
        };

        recognition.start();
    } else {
        alert('Voice input is not supported in your browser.');
    }
}

// Practice problems
function startPractice() {
    const question = generatePracticeQuestion();
    addMessage("Let's practice! " + question);
}

// Generate practice question
function generatePracticeQuestion() {
    const topics = Object.keys(knowledgeBase.math.calculus);
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const questions = knowledgeBase.math.calculus[topic].practice;
    const question = questions[Math.floor(Math.random() * questions.length)];
    
    return `${question.question}\n\nTake your time to solve it, and I'll help you understand the solution.`;
}

// Explain concept
function explainConcept(text = '') {
    if (!text) {
        return "What concept would you like me to explain?";
    }

    // Simple concept matching
    for (const subject in knowledgeBase) {
        for (const topic in knowledgeBase[subject]) {
            for (const concept in knowledgeBase[subject][topic]) {
                if (text.includes(concept)) {
                    const conceptData = knowledgeBase[subject][topic][concept];
                    return `${conceptData.concept}\n\nHere's an example:\n${conceptData.examples[0]}`;
                }
            }
        }
    }

    return "I'm not sure about that specific concept. Could you try asking about a different topic?";
}

// Take quiz
function takeQuiz() {
    addMessage("I'll create a quiz based on your recent topics. Ready to begin?");
    // Quiz implementation would go here
} 