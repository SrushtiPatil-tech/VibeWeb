// Sample video data (in a real application, this would come from an API)
const sampleVideos = {
    'algebra': [
        {
            title: 'Introduction to Algebra',
            thumbnail: 'https://img.youtube.com/vi/NybHckSEQBI/maxresdefault.jpg',
            description: 'Learn the basics of algebra and variables',
            duration: '10:15',
            url: 'https://www.youtube.com/watch?v=NybHckSEQBI'
        },
        {
            title: 'Solving Linear Equations',
            thumbnail: 'https://img.youtube.com/vi/wVc8UKsZCWE/maxresdefault.jpg',
            description: 'Master the art of solving linear equations',
            duration: '12:30',
            url: 'https://www.youtube.com/watch?v=wVc8UKsZCWE'
        }
    ],
    'geometry': [
        {
            title: 'Introduction to Geometry',
            thumbnail: 'https://img.youtube.com/vi/302eJ3TzJQU/maxresdefault.jpg',
            description: 'Learn basic geometric concepts and shapes',
            duration: '15:20',
            url: 'https://www.youtube.com/watch?v=302eJ3TzJQU'
        }
    ],
    // Add more topics as needed
};

function showVideoSuggestions(topic) {
    const videoSuggestionsContainer = document.getElementById('videoSuggestions');
    const videoGrid = document.getElementById('videoGrid');
    
    // Clear previous suggestions
    videoGrid.innerHTML = '';
    
    // Get videos for the topic (default to algebra if topic not found)
    const videos = sampleVideos[topic.toLowerCase()] || sampleVideos['algebra'];
    
    // Create video cards
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-description">${video.description}</p>
                <p class="video-duration">${video.duration}</p>
            </div>
        `;
        
        // Add click event to open video
        videoCard.addEventListener('click', () => {
            window.open(video.url, '_blank');
        });
        
        videoGrid.appendChild(videoCard);
    });
    
    // Show the suggestions container
    videoSuggestionsContainer.style.display = 'block';
}

// Function to extract topic from voice command
function extractTopicFromCommand(command) {
    const topicKeywords = {
        'algebra': ['algebra', 'equation', 'variable', 'linear'],
        'geometry': ['geometry', 'shape', 'triangle', 'circle'],
        // Add more topics and their keywords
    };
    
    command = command.toLowerCase();
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
        if (keywords.some(keyword => command.includes(keyword))) {
            return topic;
        }
    }
    
    return 'algebra'; // Default topic
}

// Export functions for use in voice-control.js
window.showVideoSuggestions = showVideoSuggestions;
window.extractTopicFromCommand = extractTopicFromCommand; 