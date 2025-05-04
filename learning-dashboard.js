// Learning Dashboard and Gamification System
class LearningDashboard {
    constructor(userId) {
        this.userId = userId;
        this.progress = this.loadProgress();
        this.badges = this.loadBadges();
        this.leaderboard = this.loadLeaderboard();
    }

    // Load user's progress from localStorage
    loadProgress() {
        const savedProgress = localStorage.getItem(`progress_${this.userId}`);
        return savedProgress ? JSON.parse(savedProgress) : {
            totalPoints: 0,
            level: 1,
            experience: 0,
            completedLessons: [],
            quizScores: {},
            streakDays: 0,
            lastLoginDate: new Date().toISOString()
        };
    }

    // Load badges from localStorage
    loadBadges() {
        const savedBadges = localStorage.getItem(`badges_${this.userId}`);
        return savedBadges ? JSON.parse(savedBadges) : {
            earned: [],
            available: [
                {
                    id: 'first_lesson',
                    name: 'First Step',
                    description: 'Complete your first lesson',
                    icon: '🎯'
                },
                {
                    id: 'perfect_quiz',
                    name: 'Perfect Score',
                    description: 'Get 100% on a quiz',
                    icon: '🌟'
                },
                {
                    id: 'streak_7',
                    name: 'Week Warrior',
                    description: 'Maintain a 7-day streak',
                    icon: '🔥'
                },
                {
                    id: 'points_1000',
                    name: 'Point Master',
                    description: 'Earn 1000 points',
                    icon: '💎'
                }
            ]
        };
    }

    // Load leaderboard data
    loadLeaderboard() {
        const savedLeaderboard = localStorage.getItem('leaderboard');
        return savedLeaderboard ? JSON.parse(savedLeaderboard) : [];
    }

    // Update user's progress
    updateProgress(points, lessonId = null) {
        this.progress.totalPoints += points;
        
        // Update experience and level
        this.progress.experience += points;
        this.checkLevelUp();
        
        // Update completed lessons
        if (lessonId && !this.progress.completedLessons.includes(lessonId)) {
            this.progress.completedLessons.push(lessonId);
        }
        
        // Update streak
        this.updateStreak();
        
        // Save progress
        this.saveProgress();
        
        // Check for new badges
        this.checkBadges();
        
        // Update leaderboard
        this.updateLeaderboard();
    }

    // Check if user levels up
    checkLevelUp() {
        const experienceNeeded = this.progress.level * 1000;
        if (this.progress.experience >= experienceNeeded) {
            this.progress.level++;
            this.progress.experience -= experienceNeeded;
            this.showLevelUpNotification();
        }
    }

    // Update daily streak
    updateStreak() {
        const lastLogin = new Date(this.progress.lastLoginDate);
        const today = new Date();
        const diffDays = Math.floor((today - lastLogin) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            this.progress.streakDays++;
        } else if (diffDays > 1) {
            this.progress.streakDays = 0;
        }
        
        this.progress.lastLoginDate = today.toISOString();
    }

    // Check and award badges
    checkBadges() {
        const newBadges = [];
        
        this.badges.available.forEach(badge => {
            if (!this.badges.earned.some(earned => earned.id === badge.id)) {
                switch (badge.id) {
                    case 'first_lesson':
                        if (this.progress.completedLessons.length > 0) {
                            newBadges.push(badge);
                        }
                        break;
                    case 'perfect_quiz':
                        if (Object.values(this.progress.quizScores).some(score => score === 100)) {
                            newBadges.push(badge);
                        }
                        break;
                    case 'streak_7':
                        if (this.progress.streakDays >= 7) {
                            newBadges.push(badge);
                        }
                        break;
                    case 'points_1000':
                        if (this.progress.totalPoints >= 1000) {
                            newBadges.push(badge);
                        }
                        break;
                }
            }
        });
        
        if (newBadges.length > 0) {
            this.badges.earned.push(...newBadges);
            this.saveBadges();
            this.showBadgeNotifications(newBadges);
        }
    }

    // Update leaderboard
    updateLeaderboard() {
        const userIndex = this.leaderboard.findIndex(entry => entry.userId === this.userId);
        const userEntry = {
            userId: this.userId,
            points: this.progress.totalPoints,
            level: this.progress.level
        };
        
        if (userIndex === -1) {
            this.leaderboard.push(userEntry);
        } else {
            this.leaderboard[userIndex] = userEntry;
        }
        
        // Sort leaderboard by points
        this.leaderboard.sort((a, b) => b.points - a.points);
        
        // Save leaderboard
        localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
    }

    // Save progress to localStorage
    saveProgress() {
        localStorage.setItem(`progress_${this.userId}`, JSON.stringify(this.progress));
    }

    // Save badges to localStorage
    saveBadges() {
        localStorage.setItem(`badges_${this.userId}`, JSON.stringify(this.badges));
    }

    // UI Notifications
    showLevelUpNotification() {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <h3>Level Up! 🎉</h3>
            <p>You've reached level ${this.progress.level}</p>
        `;
        this.showNotification(notification);
    }

    showBadgeNotifications(newBadges) {
        newBadges.forEach(badge => {
            const notification = document.createElement('div');
            notification.className = 'badge-notification';
            notification.innerHTML = `
                <h3>New Badge Earned! ${badge.icon}</h3>
                <p>${badge.name}: ${badge.description}</p>
            `;
            this.showNotification(notification);
        });
    }

    showNotification(notificationElement) {
        const container = document.getElementById('notification-container') || document.createElement('div');
        if (!document.getElementById('notification-container')) {
            container.id = 'notification-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(notificationElement);
        setTimeout(() => {
            notificationElement.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        }, 3000);
    }
}

// Export the LearningDashboard class
window.LearningDashboard = LearningDashboard; 