// LernApp - JavaScript Implementation mit Account-System, Fächer-Auswahl und Profil-Personalisierung
class LernApp {
    constructor() {
        this.currentScreen = 'loading';
        this.currentSubject = 'Mathematik';
        this.currentLevel = 1;
        this.userLevel = 1;
        this.userXP = 0;
        this.totalStars = 0;
        this.achievements = 0;
        this.currentUser = null;
        this.gameState = {
            isPlaying: false,
            score: 0,
            timer: 0,
            currentQuestion: 0,
            totalQuestions: 5,
            correctAnswers: 0,
            startTime: null,
            wrongAnswers: [],
            secondChanceMode: false
        };
        this.timerInterval = null;
        
        // Profil-Einstellungen
        this.profileSettings = {
            theme: 'light',
            background: 'gradient-blue',
            backgroundImage: null,
            avatar: null
        };
        
        // Lade Fragen aus separaten Dateien
        this.subjects = {
            'Mathematik': {
                levels: 10,
                questions: this.loadSubjectQuestions('Mathematik')
            },
            'Deutsch': {
                levels: 10,
                questions: this.loadSubjectQuestions('Deutsch')
            },
            'Englisch': {
                levels: 10,
                questions: this.loadSubjectQuestions('Englisch')
            }
        };
        
        this.completedLevels = {};
        this.userStats = {};
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.loadProfileSettings();
        this.applyTheme();
        this.applyBackground();
        setTimeout(() => {
            this.checkAutoLogin();
        }, 3000);
    }

    loadSubjectQuestions(subject) {
        // Lade Fragen aus den separaten Dateien
        let questions = [];
        
        switch(subject) {
            case 'Mathematik':
                if (typeof MathematikQuestions !== 'undefined') {
                    for (let i = 1; i <= 10; i++) {
                        const gradeQuestions = MathematikQuestions.generateQuestions(i);
                        questions = questions.concat(gradeQuestions);
                    }
                }
                break;
            case 'Deutsch':
                if (typeof DeutschQuestions !== 'undefined') {
                    for (let i = 1; i <= 10; i++) {
                        const gradeQuestions = DeutschQuestions.generateQuestions(i);
                        questions = questions.concat(gradeQuestions);
                    }
                }
                break;
            case 'Englisch':
                if (typeof EnglischQuestions !== 'undefined') {
                    for (let i = 1; i <= 10; i++) {
                        const gradeQuestions = EnglischQuestions.generateQuestions(i);
                        questions = questions.concat(gradeQuestions);
                    }
                }
                break;
        }
        
        return questions;
    }

    checkAutoLogin() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.loadUserData();
                this.showMainMenu();
            } catch (e) {
                this.showAuthScreen();
            }
        } else {
            this.showAuthScreen();
        }
    }

    showAuthScreen() {
        this.showScreen('auth-screen');
        this.showLoginForm();
    }

    showLoginForm() {
        document.getElementById('login-form').classList.remove('hidden');
        document.getElementById('register-form').classList.add('hidden');
    }

    showRegisterForm() {
        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('register-form').classList.remove('hidden');
    }

    login() {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();

        if (!username || !password) {
            this.showError('Bitte fülle alle Felder aus!');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.loadUserData();
            this.showMainMenu();
        } else {
            this.showError('Benutzername oder Passwort falsch!');
        }
    }

    register() {
        const username = document.getElementById('register-username').value.trim();
        const password = document.getElementById('register-password').value.trim();
        const confirm = document.getElementById('register-confirm').value.trim();
        const grade = document.getElementById('register-grade').value;

        if (!username || !password || !confirm || !grade) {
            this.showError('Bitte fülle alle Felder aus!');
            return;
        }

        if (password !== confirm) {
            this.showError('Passwörter stimmen nicht überein!');
            return;
        }

        if (password.length < 4) {
            this.showError('Passwort muss mindestens 4 Zeichen lang sein!');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.find(u => u.username === username)) {
            this.showError('Benutzername bereits vergeben!');
            return;
        }

        const newUser = {
            username,
            password,
            grade: parseInt(grade),
            userLevel: 1,
            userXP: 0,
            totalStars: 0,
            achievements: 0,
            completedLevels: {},
            createdAt: Date.now()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        this.loadUserData();
        this.showMainMenu();
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.showAuthScreen();
    }

    showError(message) {
        // Einfache Fehlermeldung
        alert(message);
    }

    loadUserData() {
        if (!this.currentUser) return;
        
        this.userLevel = this.currentUser.userLevel;
        this.userXP = this.currentUser.userXP;
        this.totalStars = this.currentUser.totalStars;
        this.achievements = this.currentUser.achievements;
        this.completedLevels = this.currentUser.completedLevels || {};
        this.updateUI();
    }

    saveUserData() {
        if (!this.currentUser) return;
        
        this.currentUser.userLevel = this.userLevel;
        this.currentUser.userXP = this.userXP;
        this.currentUser.totalStars = this.totalStars;
        this.currentUser.achievements = this.currentUser.achievements;
        this.currentUser.completedLevels = this.completedLevels;
        
        // Update in localStorage
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        // Update in users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.username === this.currentUser.username);
        if (userIndex !== -1) {
            users[userIndex] = this.currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // Profil-Personalisierung
    showProfile() {
        this.showScreen('profile-screen');
        this.loadProfileSettings();
        this.updateProfileUI();
    }

    loadProfileSettings() {
        const saved = localStorage.getItem('profileSettings');
        if (saved) {
            this.profileSettings = { ...this.profileSettings, ...JSON.parse(saved) };
        }
    }

    saveProfileSettings() {
        localStorage.setItem('profileSettings', JSON.stringify(this.profileSettings));
        this.applyTheme();
        this.applyBackground();
        this.updateAvatar();
        this.showSuccess('Einstellungen gespeichert!');
    }

    updateProfileUI() {
        // Theme-Optionen aktualisieren
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[onclick="app.setTheme('${this.profileSettings.theme}')"]`)?.classList.add('active');

        // Hintergrund-Optionen aktualisieren
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.classList.remove('active');
        });
        document.querySelector(`[data-color="${this.profileSettings.background}"]`)?.classList.add('active');

        // Avatar aktualisieren
        this.updateAvatar();

        // Hintergrund-Vorschau aktualisieren
        this.updateBackgroundPreview();

        // Theme-Icon aktualisieren
        this.updateThemeIcon();
    }

    setTheme(theme) {
        this.profileSettings.theme = theme;
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[onclick="app.setTheme('${theme}')"]`)?.classList.add('active');
        this.updateThemeIcon();
    }

    toggleTheme() {
        const themes = ['light', 'dark', 'auto'];
        const currentIndex = themes.indexOf(this.profileSettings.theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.setTheme(themes[nextIndex]);
    }

    updateThemeIcon() {
        const icon = document.getElementById('theme-icon');
        if (!icon) return;

        switch (this.profileSettings.theme) {
            case 'light':
                icon.className = 'fas fa-sun';
                break;
            case 'dark':
                icon.className = 'fas fa-moon';
                break;
            case 'auto':
                icon.className = 'fas fa-adjust';
                break;
        }
    }

    applyTheme() {
        let theme = this.profileSettings.theme;
        
        if (theme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            theme = prefersDark ? 'dark' : 'light';
        }

        document.documentElement.setAttribute('data-theme', theme);
    }

    setBackground(background) {
        this.profileSettings.background = background;
        this.profileSettings.backgroundImage = null; // Entferne Bild wenn Farbe gewählt wird
        
        document.querySelectorAll('.color-preset').forEach(preset => {
            preset.classList.remove('active');
        });
        document.querySelector(`[data-color="${background}"]`)?.classList.add('active');
        
        this.updateBackgroundPreview();
    }

    applyBackground() {
        const app = document.getElementById('app');
        if (!app) return;

        if (this.profileSettings.backgroundImage) {
            // Apply background image to body for better mobile support
            document.body.style.background = `url(${this.profileSettings.backgroundImage}) center/cover no-repeat fixed`;
            document.body.style.backgroundAttachment = 'fixed';
            
            // Remove gradient classes from screens
            const screens = document.querySelectorAll('.screen');
            screens.forEach(screen => {
                screen.className = screen.className.replace(/gradient-\w+/g, '');
                screen.style.background = 'transparent';
            });
        } else {
            // Reset body background
            document.body.style.background = '';
            document.body.style.backgroundAttachment = '';
            
            // Apply gradient backgrounds to screens
            const screens = document.querySelectorAll('.screen');
            screens.forEach(screen => {
                screen.style.background = '';
                screen.className = screen.className.replace(/gradient-\w+/g, '');
                screen.classList.add(this.profileSettings.background);
            });
        }
    }

    updateBackgroundPreview() {
        const preview = document.getElementById('bg-preview');
        if (!preview) return;

        if (this.profileSettings.backgroundImage) {
            preview.style.backgroundImage = `url(${this.profileSettings.backgroundImage})`;
            preview.innerHTML = '<p>Hintergrundbild ausgewählt</p>';
        } else {
            preview.style.backgroundImage = '';
            preview.className = `background-preview ${this.profileSettings.background}`;
            preview.innerHTML = '<p>Kein Bild ausgewählt</p>';
        }
    }

    removeBackgroundImage() {
        this.profileSettings.backgroundImage = null;
        this.updateBackgroundPreview();
    }

    updateAvatar() {
        const avatar = document.getElementById('user-avatar');
        if (!avatar) return;

        if (this.profileSettings.avatar) {
            avatar.style.backgroundImage = `url(${this.profileSettings.avatar})`;
            avatar.innerHTML = '';
        } else {
            avatar.style.backgroundImage = '';
            avatar.innerHTML = '<i class="fas fa-user"></i>';
        }
    }

    updateAvatarPreview() {
        const preview = document.getElementById('avatar-preview');
        if (!preview) return;

        if (this.profileSettings.avatar) {
            preview.style.backgroundImage = `url(${this.profileSettings.avatar})`;
            preview.innerHTML = '';
        } else {
            preview.style.backgroundImage = '';
            preview.innerHTML = '<i class="fas fa-user"></i>';
        }
    }

    showSuccess(message) {
        // Einfache Erfolgsmeldung
        alert(message);
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

    showSubjectSelection() {
        this.showScreen('subject-selection');
        this.generateSubjectGrid();
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
        if (!this.currentUser) return;
        
        // Update user info
        document.querySelector('.username').textContent = this.currentUser.username;
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

        // Update avatar
        this.updateAvatar();
    }

    generateSubjectGrid() {
        const subjectGrid = document.getElementById('subject-grid');
        if (!subjectGrid) return;
        
        subjectGrid.innerHTML = '';
        
        const subjects = [
            { name: 'Mathematik', icon: 'fas fa-calculator', color: '#667eea' },
            { name: 'Deutsch', icon: 'fas fa-book', color: '#764ba2' },
            { name: 'Englisch', icon: 'fas fa-language', color: '#f093fb' }
        ];
        
        subjects.forEach(subject => {
            const subjectItem = document.createElement('div');
            subjectItem.className = 'subject-item';
            subjectItem.style.background = `linear-gradient(45deg, ${subject.color}, ${subject.color}dd)`;
            subjectItem.innerHTML = `
                <i class="${subject.icon}"></i>
                <span>${subject.name}</span>
            `;
            
            subjectItem.addEventListener('click', () => this.selectSubject(subject.name));
            subjectGrid.appendChild(subjectItem);
        });
    }

    selectSubject(subjectName) {
        this.currentSubject = subjectName;
        this.showLevelSelection();
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
            startTime: Date.now(),
            wrongAnswers: [],
            secondChanceMode: false
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

    async showQuestion() {
        const gameContent = document.getElementById('game-content');
        const subject = this.subjects[this.currentSubject];
        const questions = subject.questions;
        
        let question;
        if (this.gameState.secondChanceMode && this.gameState.wrongAnswers.length > 0) {
            // Show wrong answer from second chance
            const wrongAnswerIndex = this.gameState.currentQuestion % this.gameState.wrongAnswers.length;
            question = this.gameState.wrongAnswers[wrongAnswerIndex];
        } else {
            // Show normal question
            const questionIndex = (this.currentLevel - 1) * 5 + this.gameState.currentQuestion;
            question = questions[questionIndex];
        }

        if (!question) {
            this.endGame();
            return;
        }

        const imageHTML = question.image ? `<img class="question-image" src="${question.image}" alt="Aufgabe" />` : '';
        const explanationHTML = question.explanation ? `<div id="explanation" class="explanation is-hidden">${question.explanation}</div>` : '';
        const secondChanceHTML = this.gameState.secondChanceMode ? '<div class="second-chance-banner">🔄 Zweite Chance - Lerne aus deinen Fehlern!</div>' : '';
        
        const questionHTML = `
            <div class="game-question pop">
                ${secondChanceHTML}
                ${imageHTML}
                <div class="question-text">${question.question}</div>
                <div class="answer-options">
                    ${question.options.map((option, index) => `
                        <button class="answer-btn" onclick="app.selectAnswer(${index})">
                            ${option}
                        </button>
                    `).join('')}
                </div>
                ${explanationHTML}
            </div>
        `;

        gameContent.innerHTML = questionHTML;

        if (window.MathJax) {
            await MathJax.typesetPromise?.();
        }
    }

    selectAnswer(answerIndex) {
        const subject = this.subjects[this.currentSubject];
        const questions = subject.questions;
        
        let question;
        if (this.gameState.secondChanceMode && this.gameState.wrongAnswers.length > 0) {
            const wrongAnswerIndex = this.gameState.currentQuestion % this.gameState.wrongAnswers.length;
            question = this.gameState.wrongAnswers[wrongAnswerIndex];
        } else {
            const questionIndex = (this.currentLevel - 1) * 5 + this.gameState.currentQuestion;
            question = questions[questionIndex];
        }

        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach(btn => btn.style.pointerEvents = 'none');

        if (answerIndex === question.correctAnswer) {
            buttons[answerIndex].classList.add('correct');
            this.gameState.correctAnswers++;
            this.gameState.score += 10;
            this.addXP(5);
            this.fireConfetti();
            this.toggleExplanation(true);
        } else {
            buttons[answerIndex].classList.add('incorrect');
            buttons[question.correctAnswer].classList.add('correct');
            document.querySelector('.game-question')?.classList.add('shake');
            this.toggleExplanation(true);
            
            // Store wrong answer for second chance (only in normal mode)
            if (!this.gameState.secondChanceMode) {
                this.gameState.wrongAnswers.push(question);
            }
        }

        setTimeout(() => {
            this.gameState.currentQuestion++;
            this.updateProgress();
            
            if (this.gameState.currentQuestion >= this.gameState.totalQuestions) {
                this.handleLevelCompletion();
            } else {
                this.showQuestion();
            }
        }, 1500);
    }

    handleLevelCompletion() {
        if (this.gameState.wrongAnswers.length > 0 && !this.gameState.secondChanceMode) {
            // Start second chance mode
            this.gameState.secondChanceMode = true;
            this.gameState.currentQuestion = 0;
            this.gameState.totalQuestions = Math.min(this.gameState.wrongAnswers.length, 3); // Max 3 second chance questions
            this.showSecondChanceScreen();
        } else {
            // End game normally
            this.endGame();
        }
    }

    showSecondChanceScreen() {
        const gameContent = document.getElementById('game-content');
        gameContent.innerHTML = `
            <div class="second-chance-intro">
                <h2>🔄 Zweite Chance!</h2>
                <p>Du hattest ${this.gameState.wrongAnswers.length} Fehler. Lerne daraus!</p>
                <p>Du bekommst noch ${this.gameState.totalQuestions} Fragen, um es besser zu machen.</p>
                <button class="btn primary" onclick="app.startSecondChance()">
                    <i class="fas fa-play"></i>
                    Zweite Chance starten
                </button>
            </div>
        `;
    }

    startSecondChance() {
        this.gameState.currentQuestion = 0;
        this.showQuestion();
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
        const oldLevel = this.userLevel;
        this.userXP += amount;
        while (this.userXP >= 100) {
            this.userXP -= 100;
            this.userLevel++;
        }
        
        // Only show level up notification if level actually increased
        if (this.userLevel > oldLevel) {
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

    toggleExplanation(show) {
        const el = document.getElementById('explanation');
        if (!el) return;
        el.classList.toggle('is-hidden', !show);
        if (window.MathJax && show) {
            MathJax.typesetPromise?.();
        }
    }

    fireConfetti() {
        if (typeof confetti !== 'function') return;
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
        });
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
            this.showSubjectSelection();
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

    backToSubjects() {
        this.showSubjectSelection();
    }
}

// Global functions for HTML onclick handlers
let app;

function startGame() {
    app.showSubjectSelection();
}

function showSubjects() {
    app.showSubjectSelection();
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

function backToSubjects() {
    app.backToSubjects();
}

// File upload handlers
document.addEventListener('DOMContentLoaded', () => {
    app = new LernApp();
    
    // Avatar upload handler
    const avatarInput = document.getElementById('avatar-input');
    if (avatarInput) {
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    app.profileSettings.avatar = e.target.result;
                    app.updateAvatarPreview();
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Background image upload handler
    const bgImageInput = document.getElementById('bg-image-input');
    if (bgImageInput) {
        bgImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    app.profileSettings.backgroundImage = e.target.result;
                    app.updateBackgroundPreview();
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Theme change listener for auto mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (app.profileSettings.theme === 'auto') {
            app.applyTheme();
        }
    });
});
