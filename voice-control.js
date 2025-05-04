// Voice Recognition Setup
const micButton = document.getElementById('micButton');
const voiceStatus = document.getElementById('voiceStatus');
const lessonContainer = document.getElementById('lessonContainer');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');

let currentSlideIndex = 1;
const totalSlides = 5;
let recognition = null;

// Initialize Web Speech API
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
} else {
    voiceStatus.textContent = 'Voice recognition is not supported in your browser.';
    micButton.disabled = true;
}

// Voice Recognition Event Handlers
recognition.onstart = () => {
    micButton.classList.add('active');
    voiceStatus.textContent = 'Listening...';
};

recognition.onend = () => {
    micButton.classList.remove('active');
    voiceStatus.textContent = 'Click to start voice commands';
};

recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    voiceStatus.textContent = `Command recognized: "${command}"`;
    
    handleVoiceCommand(command);
};

recognition.onerror = (event) => {
    voiceStatus.textContent = 'Error occurred in recognition: ' + event.error;
};

// Handle Voice Commands
function handleVoiceCommand(command) {
    const topic = extractTopicFromCommand(command);
    
    switch (command.trim().toLowerCase()) {
        case 'start algebra lesson':
            startLesson();
            showVideoSuggestions('algebra');
            break;
        case 'show me algebra videos':
        case 'algebra videos':
            showVideoSuggestions('algebra');
            break;
        case 'show me geometry videos':
        case 'geometry videos':
            showVideoSuggestions('geometry');
            break;
        case 'next slide':
        case 'next':
            navigateSlide('next');
            break;
        case 'previous slide':
        case 'previous':
        case 'back':
            navigateSlide('prev');
            break;
        case 'repeat that':
            repeatSlide();
            break;
        case 'end lesson':
            endLesson();
            break;
        default:
            // Check if the command contains a topic keyword
            if (command.toLowerCase().includes('videos') || 
                command.toLowerCase().includes('show me')) {
                showVideoSuggestions(topic);
            } else {
                voiceStatus.textContent = 'Command not recognized. Please try again.';
            }
    }
}

// Lesson Control Functions
function startLesson() {
    lessonContainer.style.display = 'block';
    currentSlideIndex = 1;
    updateSlideVisibility();
    voiceStatus.textContent = 'Lesson started. Say "next slide" to continue.';
}

function navigateSlide(direction) {
    if (direction === 'next' && currentSlideIndex < totalSlides) {
        currentSlideIndex++;
    } else if (direction === 'prev' && currentSlideIndex > 1) {
        currentSlideIndex--;
    }
    updateSlideVisibility();
}

function updateSlideVisibility() {
    // Hide all slides
    document.querySelectorAll('.slide').forEach(slide => {
        slide.style.display = 'none';
    });
    
    // Show current slide
    const currentSlide = document.querySelector(`[data-slide="${currentSlideIndex}"]`);
    if (currentSlide) {
        currentSlide.style.display = 'block';
    }
    
    // Update progress
    document.getElementById('currentSlide').textContent = currentSlideIndex;
    
    // Update navigation buttons
    prevSlideBtn.disabled = currentSlideIndex === 1;
    nextSlideBtn.disabled = currentSlideIndex === totalSlides;
}

function repeatSlide() {
    const currentSlide = document.querySelector(`[data-slide="${currentSlideIndex}"]`);
    if (currentSlide) {
        // Add a brief animation to indicate repetition
        currentSlide.style.opacity = '0.5';
        setTimeout(() => {
            currentSlide.style.opacity = '1';
        }, 200);
    }
}

function endLesson() {
    lessonContainer.style.display = 'none';
    voiceStatus.textContent = 'Lesson ended. Click the microphone to start a new lesson.';
}

// Button Event Listeners
micButton.addEventListener('click', () => {
    if (recognition) {
        recognition.start();
    }
});

prevSlideBtn.addEventListener('click', () => navigateSlide('prev'));
nextSlideBtn.addEventListener('click', () => navigateSlide('next'));

// Show/Hide Solution Button
document.querySelector('.show-solution')?.addEventListener('click', function() {
    const solution = this.nextElementSibling;
    if (solution) {
        solution.style.display = solution.style.display === 'none' ? 'block' : 'none';
        this.textContent = solution.style.display === 'none' ? 'Show Solution' : 'Hide Solution';
    }
}); 