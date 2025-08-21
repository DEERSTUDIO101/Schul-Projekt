// LernApp - JavaScript Implementation
class LernApp {
    constructor() {
        this.currentScreen = 'loading';
        this.currentSubject = 'Mathematik';
        this.currentLevel = 1;
        this.userLevel = 1;
        this.userXP = 0;
        this.totalStars = 0;
        this.achievements = 0;
        this.gameState = {
            isPlaying: false,
            score: 0,
            timer: 0,
            currentQuestion: 0,
            totalQuestions: 5,
            correctAnswers: 0,
            startTime: null
        };
        this.timerInterval = null;
        this.subjects = {
            'Mathematik': {
                levels: 10,
                questions: this.generateMathQuestions()
            },
            'Deutsch': {
                levels: 8,
                questions: this.generateGermanQuestions()
            },
            'Englisch': {
                levels: 8,
                questions: this.generateEnglishQuestions()
            }
        };
        this.completedLevels = JSON.parse(localStorage.getItem('completedLevels')) || {};
        this.userStats = JSON.parse(localStorage.getItem('userStats')) || {
            totalStars: 0,
            achievements: 0,
            userLevel: 1,
            userXP: 0
        };
        this.init();
    }

    init() {
        this.loadUserData();
        this.showLoadingScreen();
        setTimeout(() => {
            this.showMainMenu();
        }, 3000);
    }

    loadUserData() {
        this.totalStars = this.userStats.totalStars;
        this.achievements = this.userStats.achievements;
        this.userLevel = this.userStats.userLevel;
        this.userXP = this.userStats.userXP;
        this.updateUI();
    }

    saveUserData() {
        this.userStats = {
            totalStars: this.totalStars,
            achievements: this.achievements,
            userLevel: this.userLevel,
            userXP: this.userXP
        };
        localStorage.setItem('userStats', JSON.stringify(this.userStats));
        localStorage.setItem('completedLevels', JSON.stringify(this.completedLevels));
    }

    showLoadingScreen() {
        this.showScreen('loading-screen');
        this.animateLoadingBar();
    }

    animateLoadingBar() {
        const progressBar = document.querySelector('.loading-progress');
        let width = 0;
        const interval = setInterval(() => {
            width += Math.random() * 15;
            if (width >= 100) {
                width = 100;
                clearInterval(interval);
            }
            progressBar.style.width = width + '%';
        }, 100);
    }

    showMainMenu() {
        this.showScreen('main-menu');
        this.updateUI();
    }

    showLevelSelection() {
        this.showScreen('level-selection');
        this.generateLevelGrid();
        document.getElementById('current-subject').textContent = this.currentSubject;
    }

    showGameScreen() {
        this.showScreen('game-screen');
        this.startGame();
    }

    showResultsScreen() {
        this.showScreen('results-screen');
        this.displayResults();
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }
    }

    updateUI() {
        // Update user info
        document.querySelector('.username').textContent = 'Spieler';
        document.querySelector('.level').textContent = `Level ${this.userLevel}`;
        document.querySelector('.xp-progress').style.width = `${(this.userXP % 100)}%`;
        
        // Update stats
        document.getElementById('total-stars').textContent = this.totalStars;
        document.getElementById('achievements').textContent = this.achievements;
        
        // Update level number in game screen
        const levelNumber = document.querySelector('.level-number');
        if (levelNumber) {
            levelNumber.textContent = `Level ${this.currentLevel}`;
        }
    }

    generateLevelGrid() {
        const grid = document.getElementById('levels-grid');
        const subject = this.subjects[this.currentSubject];
        grid.innerHTML = '';

        for (let i = 1; i <= subject.levels; i++) {
            const levelItem = document.createElement('div');
            levelItem.className = 'level-item';
            levelItem.textContent = i;
            
            const levelKey = `${this.currentSubject}-${i}`;
            
            if (this.completedLevels[levelKey]) {
                levelItem.classList.add('completed');
            } else if (i === this.getNextAvailableLevel()) {
                levelItem.classList.add('current');
            } else if (i > this.getNextAvailableLevel()) {
                levelItem.classList.add('locked');
            }

            if (i <= this.getNextAvailableLevel()) {
                levelItem.addEventListener('click', () => this.selectLevel(i));
            }

            grid.appendChild(levelItem);
        }
    }

    getNextAvailableLevel() {
        const subject = this.subjects[this.currentSubject];
        for (let i = 1; i <= subject.levels; i++) {
            const levelKey = `${this.currentSubject}-${i}`;
            if (!this.completedLevels[levelKey]) {
                return i;
            }
        }
        return subject.levels;
    }

    selectLevel(level) {
        this.currentLevel = level;
        this.showGameScreen();
    }

    startGame() {
        this.gameState = {
            isPlaying: true,
            score: 0,
            timer: 0,
            currentQuestion: 0,
            totalQuestions: 5,
            correctAnswers: 0,
            startTime: Date.now()
        };

        this.updateGameUI();
        this.showQuestion();
        this.startTimer();
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.gameState.timer++;
            this.updateGameUI();
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    showQuestion() {
        const gameContent = document.getElementById('game-content');
        const subject = this.subjects[this.currentSubject];
        const questions = subject.questions;
        const questionIndex = (this.currentLevel - 1) * this.gameState.totalQuestions + this.gameState.currentQuestion;
        const question = questions[questionIndex];

        if (!question) {
            this.endGame();
            return;
        }

        const questionHTML = `
            <div class="game-question">
                <div class="question-text">${question.question}</div>
                <div class="answer-options">
                    ${question.options.map((option, index) => `
                        <button class="answer-btn" onclick="app.selectAnswer(${index})">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        gameContent.innerHTML = questionHTML;
    }

    selectAnswer(answerIndex) {
        const subject = this.subjects[this.currentSubject];
        const questions = subject.questions;
        const questionIndex = (this.currentLevel - 1) * this.gameState.totalQuestions + this.gameState.currentQuestion;
        const question = questions[questionIndex];

        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(btn => btn.style.pointerEvents = 'none');

        if (answerIndex === question.correctAnswer) {
            buttons[answerIndex].classList.add('correct');
            this.gameState.correctAnswers++;
            this.gameState.score += 10;
            this.addXP(5);
        } else {
            buttons[answerIndex].classList.add('incorrect');
            buttons[question.correctAnswer].classList.add('correct');
        }

        setTimeout(() => {
            this.gameState.currentQuestion++;
            this.updateProgress();
            
            if (this.gameState.currentQuestion >= this.gameState.totalQuestions) {
                this.endGame();
            } else {
                this.showQuestion();
            }
        }, 1500);
    }

    updateProgress() {
        const progress = (this.gameState.currentQuestion / this.gameState.totalQuestions) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
    }

    updateGameUI() {
        document.getElementById('current-score').textContent = this.gameState.score;
        document.getElementById('game-timer').textContent = this.formatTime(this.gameState.timer);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    endGame() {
        this.stopTimer();
        this.gameState.isPlaying = false;
        
        const accuracy = Math.round((this.gameState.correctAnswers / this.gameState.totalQuestions) * 100);
        const stars = this.calculateStars(accuracy);
        
        // Save level completion
        const levelKey = `${this.currentSubject}-${this.currentLevel}`;
        this.completedLevels[levelKey] = {
            score: this.gameState.score,
            stars: stars,
            time: this.gameState.timer,
            accuracy: accuracy,
            completedAt: Date.now()
        };

        this.totalStars += stars;
        this.addXP(stars * 10);
        this.saveUserData();
        
        this.showResultsScreen();
    }

    calculateStars(accuracy) {
        if (accuracy >= 90) return 3;
        if (accuracy >= 70) return 2;
        if (accuracy >= 50) return 1;
        return 0;
    }

    addXP(amount) {
        this.userXP += amount;
        while (this.userXP >= 100) {
            this.userXP -= 100;
            this.userLevel++;
            this.showLevelUp();
        }
        this.updateUI();
    }

    showLevelUp() {
        // Simple level up notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            color: #333;
            padding: 2rem;
            border-radius: 20px;
            font-size: 1.5rem;
            font-weight: 700;
            z-index: 1000;
            animation: fadeIn 0.5s ease;
        `;
        notification.textContent = `🎉 Level ${this.userLevel} erreicht! 🎉`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    displayResults() {
        const levelKey = `${this.currentSubject}-${this.currentLevel}`;
        const result = this.completedLevels[levelKey];
        
        document.getElementById('stars-earned').textContent = result.stars;
        document.getElementById('final-score').textContent = result.score;
        document.getElementById('final-time').textContent = this.formatTime(result.time);
        document.getElementById('accuracy').textContent = `${result.accuracy}%`;
    }

    // Question Generators
    generateMathQuestions() {
        const questions = [];
        for (let level = 1; level <= 10; level++) {
            for (let i = 0; i < 5; i++) {
                const question = this.generateMathQuestion(level);
                questions.push(question);
            }
        }
        return questions;
    }

    generateMathQuestion(level) {
        let question, correctAnswer, options;
        
        if (level <= 3) {
            // Simple addition and subtraction
            const a = Math.floor(Math.random() * 20) + 1;
            const b = Math.floor(Math.random() * 20) + 1;
            const operation = Math.random() < 0.5 ? '+' : '-';
            
            if (operation === '+') {
                question = `Was ist ${a} + ${b}?`;
                correctAnswer = a + b;
            } else {
                question = `Was ist ${a} - ${b}?`;
                correctAnswer = a - b;
            }
        } else if (level <= 6) {
            // Multiplication
            const a = Math.floor(Math.random() * 12) + 1;
            const b = Math.floor(Math.random() * 12) + 1;
            question = `Was ist ${a} × ${b}?`;
            correctAnswer = a * b;
        } else {
            // Division
            const b = Math.floor(Math.random() * 12) + 1;
            const result = Math.floor(Math.random() * 12) + 1;
            const a = b * result;
            question = `Was ist ${a} ÷ ${b}?`;
            correctAnswer = result;
        }

        options = this.generateOptions(correctAnswer, 4);
        return { question, correctAnswer, options };
    }

    generateGermanQuestions() {
        const questions = [];
        const germanQuestions = [
            { question: "Welches Wort ist ein Synonym für 'groß'?", correctAnswer: 0, options: ["riesig", "klein", "mittel", "kurz"] },
            { question: "Welcher Artikel ist korrekt: '___ Haus'?", correctAnswer: 1, options: ["die", "das", "der", "den"] },
            { question: "Was ist die Mehrzahl von 'Kind'?", correctAnswer: 2, options: ["Kindes", "Kinder", "Kinder", "Kindern"] },
            { question: "Welches Wort ist ein Verb?", correctAnswer: 0, options: ["laufen", "schnell", "Haus", "schön"] },
            { question: "Was bedeutet 'Freund' auf Englisch?", correctAnswer: 1, options: ["Family", "Friend", "Father", "Food"] },
            { question: "Welcher Satz ist grammatikalisch korrekt?", correctAnswer: 2, options: ["Ich gehen Schule", "Ich gehe zur Schule", "Ich gehe zur Schule", "Ich gehe Schule"] },
            { question: "Was ist das Gegenteil von 'heiß'?", correctAnswer: 0, options: ["kalt", "warm", "lauwarm", "kühl"] },
            { question: "Welches Wort reimt sich auf 'Haus'?", correctAnswer: 1, options: ["Baum", "Maus", "Tisch", "Buch"] }
        ];

        for (let level = 1; level <= 8; level++) {
            for (let i = 0; i < 5; i++) {
                const randomQuestion = germanQuestions[Math.floor(Math.random() * germanQuestions.length)];
                questions.push({...randomQuestion});
            }
        }
        return questions;
    }

    generateEnglishQuestions() {
        const questions = [];
        const englishQuestions = [
            { question: "What is the plural of 'child'?", correctAnswer: 0, options: ["children", "childs", "childes", "childen"] },
            { question: "Which word is a color?", correctAnswer: 1, options: ["happy", "blue", "fast", "big"] },
            { question: "What is the opposite of 'hot'?", correctAnswer: 2, options: ["warm", "nice", "cold", "cool"] },
            { question: "Which sentence is correct?", correctAnswer: 0, options: ["I am going to school", "I going to school", "I goes to school", "I go to school"] },
            { question: "What does 'friend' mean in German?", correctAnswer: 1, options: ["Familie", "Freund", "Vater", "Essen"] },
            { question: "Which word rhymes with 'cat'?", correctAnswer: 2, options: ["dog", "bird", "hat", "fish"] },
            { question: "What is the past tense of 'go'?", correctAnswer: 0, options: ["went", "goed", "gone", "going"] },
            { question: "Which is a number?", correctAnswer: 1, options: ["red", "seven", "happy", "fast"] }
        ];

        for (let level = 1; level <= 8; level++) {
            for (let i = 0; i < 5; i++) {
                const randomQuestion = englishQuestions[Math.floor(Math.random() * englishQuestions.length)];
                questions.push({...randomQuestion});
            }
        }
        return questions;
    }

    generateOptions(correctAnswer, count) {
        const options = [correctAnswer];
        while (options.length < count) {
            const wrongAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
            if (wrongAnswer !== correctAnswer && !options.includes(wrongAnswer) && wrongAnswer > 0) {
                options.push(wrongAnswer);
            }
        }
        return this.shuffleArray(options);
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // Navigation functions
    pauseGame() {
        if (this.gameState.isPlaying) {
            this.stopTimer();
            this.gameState.isPlaying = false;
            // Could add pause menu here
        }
    }

    exitGame() {
        this.stopTimer();
        this.showLevelSelection();
    }

    nextLevel() {
        this.currentLevel++;
        if (this.currentLevel > this.subjects[this.currentSubject].levels) {
            this.showMainMenu();
        } else {
            this.showGameScreen();
        }
    }

    retryLevel() {
        this.showGameScreen();
    }

    backToLevels() {
        this.showLevelSelection();
    }
}

// Global functions for HTML onclick handlers
let app;

function startGame() {
    app.showLevelSelection();
}

function showSubjects() {
    // Could implement subject selection here
    alert('Fächer-Auswahl wird implementiert!');
}

function showProgress() {
    // Could implement progress screen here
    alert('Fortschritt wird implementiert!');
}

function showSettings() {
    // Could implement settings screen here
    alert('Einstellungen werden implementiert!');
}

function showMainMenu() {
    app.showMainMenu();
}

function pauseGame() {
    app.pauseGame();
}

function exitGame() {
    app.exitGame();
}

function nextLevel() {
    app.nextLevel();
}

function retryLevel() {
    app.retryLevel();
}

function backToLevels() {
    app.backToLevels();
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app = new LernApp();
});
