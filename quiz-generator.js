// AI Quiz Generator
class QuizGenerator {
    constructor() {
        this.questionTypes = ['multiple-choice', 'true-false', 'fill-in-blank'];
        this.difficultyLevels = ['easy', 'medium', 'hard'];
    }

    // Generate quiz based on topic and difficulty
    generateQuiz(topic, difficulty = 'medium', questionCount = 5) {
        // Sample questions for different topics
        const questionBank = {
            'algebra': {
                'easy': [
                    {
                        type: 'multiple-choice',
                        question: 'What is the value of x in x + 5 = 12?',
                        options: ['5', '7', '8', '10'],
                        correctAnswer: '7',
                        explanation: 'Subtract 5 from both sides: x = 12 - 5 = 7'
                    },
                    {
                        type: 'true-false',
                        question: 'In algebra, the variable always represents a number.',
                        correctAnswer: true,
                        explanation: 'Variables in algebra represent unknown values, which are numbers.'
                    }
                ],
                'medium': [
                    {
                        type: 'multiple-choice',
                        question: 'Solve for x: 2x + 8 = 16',
                        options: ['3', '4', '6', '8'],
                        correctAnswer: '4',
                        explanation: 'Subtract 8 from both sides: 2x = 8, then divide by 2: x = 4'
                    }
                ],
                'hard': [
                    {
                        type: 'fill-in-blank',
                        question: 'If 3x + 2y = 12 and y = 3, what is x?',
                        correctAnswer: '2',
                        explanation: 'Substitute y = 3: 3x + 2(3) = 12, 3x + 6 = 12, 3x = 6, x = 2'
                    }
                ]
            },
            'geometry': {
                'easy': [
                    {
                        type: 'multiple-choice',
                        question: 'What is the sum of angles in a triangle?',
                        options: ['90°', '180°', '270°', '360°'],
                        correctAnswer: '180°',
                        explanation: 'The sum of angles in any triangle is always 180 degrees.'
                    }
                ],
                'medium': [
                    {
                        type: 'fill-in-blank',
                        question: 'The area of a rectangle with width 4 and length 6 is ___.',
                        correctAnswer: '24',
                        explanation: 'Area of rectangle = length × width = 6 × 4 = 24'
                    }
                ],
                'hard': [
                    {
                        type: 'multiple-choice',
                        question: 'What is the area of a circle with radius 3? (Use π = 3.14)',
                        options: ['18.84', '28.26', '9.42', '12.56'],
                        correctAnswer: '28.26',
                        explanation: 'Area of circle = πr² = 3.14 × 3² = 28.26'
                    }
                ]
            }
        };

        // Get questions for the specified topic and difficulty
        const availableQuestions = questionBank[topic]?.[difficulty] || questionBank['algebra']['medium'];
        return availableQuestions.slice(0, questionCount);
    }

    // Check answer and return feedback
    checkAnswer(question, userAnswer) {
        const isCorrect = userAnswer === question.correctAnswer;
        return {
            correct: isCorrect,
            explanation: question.explanation,
            points: isCorrect ? this.calculatePoints(question.type) : 0
        };
    }

    // Calculate points based on question type
    calculatePoints(questionType) {
        const pointsMap = {
            'multiple-choice': 10,
            'true-false': 5,
            'fill-in-blank': 15
        };
        return pointsMap[questionType] || 10;
    }
}

// Export the QuizGenerator class
window.QuizGenerator = QuizGenerator; 