// Mathematik - Sächsischer Lehrplan (Klassen 1-10) mit dynamischer Aufgaben-Generierung
const MathematikQuestions = {
    // Dynamische Aufgaben-Generierung für alle Klassen
    generateQuestions: function(grade) {
        const questions = [];
        
        switch(grade) {
            case 1:
                return this.generateGrade1Questions();
            case 2:
                return this.generateGrade2Questions();
            case 3:
                return this.generateGrade3Questions();
            case 4:
                return this.generateGrade4Questions();
            case 5:
                return this.generateGrade5Questions();
            case 6:
                return this.generateGrade6Questions();
            case 7:
                return this.generateGrade7Questions();
            case 8:
                return this.generateGrade8Questions();
            case 9:
                return this.generateGrade9Questions();
            case 10:
                return this.generateGrade10Questions();
            default:
                return this.generateGrade1Questions();
        }
    },

    // Klasse 1: Zahlen 1-20, einfache Addition
    generateGrade1Questions: function() {
        const questions = [];
        const operations = ['+', '-'];
        
        for (let i = 0; i < 5; i++) {
            const operation = operations[Math.floor(Math.random() * operations.length)];
            let a, b, result;
            
            if (operation === '+') {
                a = Math.floor(Math.random() * 10) + 1;
                b = Math.floor(Math.random() * 10) + 1;
                result = a + b;
            } else {
                a = Math.floor(Math.random() * 15) + 5;
                b = Math.floor(Math.random() * (a - 1)) + 1;
                result = a - b;
            }
            
            const wrongAnswers = this.generateWrongAnswers(result, 3);
            const options = this.shuffleArray([result, ...wrongAnswers]);
            const correctIndex = options.indexOf(result);
            
            questions.push({
                question: `Wie viel ist ${a} ${operation} ${b}?`,
                options: options.map(String),
                correctAnswer: correctIndex,
                explanation: `Zählen: ${a} ${operation} ${b} = ${result}`
            });
        }
        
        return questions;
    },

    // Klasse 2: Zahlen 1-100, Addition/Subtraktion
    generateGrade2Questions: function() {
        const questions = [];
        const operations = ['+', '-'];
        
        for (let i = 0; i < 5; i++) {
            const operation = operations[Math.floor(Math.random() * operations.length)];
            let a, b, result;
            
            if (operation === '+') {
                a = Math.floor(Math.random() * 50) + 10;
                b = Math.floor(Math.random() * 50) + 10;
                result = a + b;
            } else {
                a = Math.floor(Math.random() * 80) + 20;
                b = Math.floor(Math.random() * (a - 10)) + 5;
                result = a - b;
            }
            
            const wrongAnswers = this.generateWrongAnswers(result, 3);
            const options = this.shuffleArray([result, ...wrongAnswers]);
            const correctIndex = options.indexOf(result);
            
            questions.push({
                question: `Wie viel ist ${a} ${operation} ${b}?`,
                options: options.map(String),
                correctAnswer: correctIndex,
                explanation: `Rechnung: ${a} ${operation} ${b} = ${result}`
            });
        }
        
        return questions;
    },

    // Klasse 3: Einmaleins (1-10)
    generateGrade3Questions: function() {
        const questions = [];
        
        for (let i = 0; i < 5; i++) {
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 10) + 1;
            const result = a * b;
            
            const wrongAnswers = this.generateWrongAnswers(result, 3);
            const options = this.shuffleArray([result, ...wrongAnswers]);
            const correctIndex = options.indexOf(result);
            
            questions.push({
                question: `Wie viel ist ${a} × ${b}?`,
                options: options.map(String),
                correctAnswer: correctIndex,
                explanation: `Einmaleins: ${a} × ${b} = ${result}`
            });
        }
        
        return questions;
    },

    // Klasse 4: Division, Brüche, Geometrie
    generateGrade4Questions: function() {
        const questions = [];
        const questionTypes = ['division', 'simple_fraction'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'division') {
                const b = Math.floor(Math.random() * 8) + 2;
                const quotient = Math.floor(Math.random() * 10) + 1;
                const a = b * quotient;
                const result = quotient;
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Wie viel ist ${a} ÷ ${b}?`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `Division: ${a} ÷ ${b} = ${result}`
                });
            } else {
                const denominator = Math.floor(Math.random() * 6) + 2;
                const numerator1 = Math.floor(Math.random() * (denominator - 1)) + 1;
                const numerator2 = Math.floor(Math.random() * (denominator - 1)) + 1;
                const result = `${numerator1 + numerator2}/${denominator}`;
                
                const wrongOptions = [
                    `${numerator1}/${denominator}`,
                    `${numerator2}/${denominator}`,
                    `${numerator1 + numerator2}/${denominator * 2}`
                ];
                const options = this.shuffleArray([result, ...wrongOptions]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Berechne: ${numerator1}/${denominator} + ${numerator2}/${denominator}`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `Brüche addieren: ${numerator1}/${denominator} + ${numerator2}/${denominator} = ${result}`
                });
            }
        }
        
        return questions;
    },

    // Klasse 5: Dezimalzahlen, Prozente, Klammerregeln
    generateGrade5Questions: function() {
        const questions = [];
        const questionTypes = ['brackets', 'percentages', 'decimals'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'brackets') {
                const a = Math.floor(Math.random() * 5) + 2;
                const b = Math.floor(Math.random() * 5) + 2;
                const c = Math.floor(Math.random() * 5) + 2;
                const result = (a + b) * c;
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Berechne: (${a} + ${b}) × ${c}`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `Klammern zuerst: (${a} + ${b}) × ${c} = ${a + b} × ${c} = ${result}`
                });
            } else if (type === 'percentages') {
                const number = Math.floor(Math.random() * 50) + 10;
                const percentage = Math.floor(Math.random() * 40) + 10;
                const result = Math.round((number * percentage) / 100);
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Wie viel sind ${percentage}% von ${number}?`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `${percentage}% von ${number} = ${number} × ${percentage}/100 = ${result}`
                });
            } else {
                const a = Math.floor(Math.random() * 9) + 1;
                const b = Math.floor(Math.random() * 9) + 1;
                const result = (a / 10) + (b / 10);
                
                const wrongAnswers = [result + 0.1, result - 0.1, result + 0.2];
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Berechne: ${a/10} + ${b/10}`,
                    options: options.map(x => x.toFixed(1)),
                    correctAnswer: correctIndex,
                    explanation: `Dezimalzahlen: ${a/10} + ${b/10} = ${result.toFixed(1)}`
                });
            }
        }
        
        return questions;
    },

    // Klasse 6: Brüche, Verhältnisse, einfache Algebra
    generateGrade6Questions: function() {
        const questions = [];
        const questionTypes = ['fractions', 'ratios', 'simple_algebra'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'fractions') {
                const den1 = Math.floor(Math.random() * 8) + 2;
                const den2 = Math.floor(Math.random() * 8) + 2;
                const num1 = Math.floor(Math.random() * (den1 - 1)) + 1;
                const num2 = Math.floor(Math.random() * (den2 - 1)) + 1;
                const result = `${num1 + num2}/${Math.max(den1, den2)}`;
                
                const wrongOptions = [
                    `${num1}/${den1}`,
                    `${num2}/${den2}`,
                    `${num1 + num2}/${den1 + den2}`
                ];
                const options = this.shuffleArray([result, ...wrongOptions]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Berechne: ${num1}/${den1} + ${num2}/${den2}`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `Brüche addieren: ${num1}/${den1} + ${num2}/${den2} = ${result}`
                });
            } else if (type === 'ratios') {
                const a = Math.floor(Math.random() * 10) + 2;
                const b = Math.floor(Math.random() * 10) + 2;
                const c = Math.floor(Math.random() * 10) + 2;
                const result = Math.round((a * c) / b);
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Verhältnis: ${a} : ${b} = ${c} : x. Was ist x?`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `Verhältnis: ${a} : ${b} = ${c} : x → x = (${c} × ${b}) ÷ ${a} = ${result}`
                });
            } else {
                const a = Math.floor(Math.random() * 10) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                const result = a + b;
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Löse: x + ${a} = ${result}`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `x + ${a} = ${result} → x = ${result} - ${a} = ${a}`
                });
            }
        }
        
        return questions;
    },

    // Klasse 7: Negative Zahlen, Terme, Gleichungen
    generateGrade7Questions: function() {
        const questions = [];
        const questionTypes = ['negative_numbers', 'equations', 'terms'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'negative_numbers') {
                const a = -(Math.floor(Math.random() * 10) + 1);
                const b = Math.floor(Math.random() * 10) + 1;
                const result = a + b;
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Berechne: ${a} + ${b}`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `Negative Zahlen: ${a} + ${b} = ${result}`
                });
            } else if (type === 'equations') {
                const a = Math.floor(Math.random() * 5) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                const c = Math.floor(Math.random() * 20) + 10;
                const result = (c - b) / a;
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Löse: ${a}x + ${b} = ${c}`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `${a}x + ${b} = ${c} → ${a}x = ${c - b} → x = ${result}`
                });
            } else {
                const a = Math.floor(Math.random() * 5) + 1;
                const b = Math.floor(Math.random() * 5) + 1;
                const c = Math.floor(Math.random() * 5) + 1;
                const result = a * b + c;
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Vereinfache: ${a} × ${b} + ${c}`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `${a} × ${b} + ${c} = ${a * b} + ${c} = ${result}`
                });
            }
        }
        
        return questions;
    },

    // Klasse 8: Potenzen, Wurzeln, Funktionen
    generateGrade8Questions: function() {
        const questions = [];
        const questionTypes = ['powers', 'roots', 'functions'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'powers') {
                const base = Math.floor(Math.random() * 5) + 2;
                const exponent = Math.floor(Math.random() * 4) + 2;
                const result = Math.pow(base, exponent);
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Berechne: ${base}^${exponent}`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `${base}^${exponent} = ${base} × ${base}${exponent > 2 ? ' × ' + base : ''} = ${result}`
                });
            } else if (type === 'roots') {
                const number = Math.floor(Math.random() * 10) + 1;
                const result = Math.sqrt(number * number);
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Berechne: √${number * number}`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `√${number * number} = √${number}² = ${number}`
                });
            } else {
                const a = Math.floor(Math.random() * 5) + 1;
                const x = Math.floor(Math.random() * 5) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                const result = a * x + b;
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Berechne f(${x}) für f(x) = ${a}x + ${b}`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `f(${x}) = ${a} × ${x} + ${b} = ${result}`
                });
            }
        }
        
        return questions;
    },

    // Klasse 9: Quadratische Gleichungen, Trigonometrie
    generateGrade9Questions: function() {
        const questions = [];
        const questionTypes = ['quadratic', 'trigonometry', 'factoring'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'quadratic') {
                const a = Math.floor(Math.random() * 3) + 1;
                const b = 0;
                const c = -(Math.floor(Math.random() * 10) + 1);
                const result = Math.sqrt(-c / a);
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Löse: ${a}x² ${c >= 0 ? '+' : ''}${c} = 0`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `${a}x² ${c >= 0 ? '+' : ''}${c} = 0 → x² = ${-c} → x = ±${result}`
                });
            } else if (type === 'trigonometry') {
                const angle = [30, 45, 60][Math.floor(Math.random() * 3)];
                let result, functionName;
                
                if (Math.random() > 0.5) {
                    result = Math.sin(angle * Math.PI / 180);
                    functionName = 'sin';
                } else {
                    result = Math.cos(angle * Math.PI / 180);
                    functionName = 'cos';
                }
                
                const wrongAnswers = [result + 0.1, result - 0.1, result + 0.2];
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Berechne: ${functionName}(${angle}°)`,
                    options: options.map(x => x.toFixed(2)),
                    correctAnswer: correctIndex,
                    explanation: `${functionName}(${angle}°) = ${result.toFixed(2)}`
                });
            } else {
                const a = Math.floor(Math.random() * 5) + 2;
                const b = Math.floor(Math.random() * 5) + 2;
                const result = a * b;
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Faktorisiere: ${result}`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `${result} = ${a} × ${b}`
                });
            }
        }
        
        return questions;
    },

    // Klasse 10: Funktionen, Analysis, Stochastik
    generateGrade10Questions: function() {
        const questions = [];
        const questionTypes = ['derivatives', 'logarithms', 'probability'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'derivatives') {
                const a = Math.floor(Math.random() * 5) + 1;
                const b = Math.floor(Math.random() * 5) + 1;
                const result = a * 2;
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Was ist die Ableitung von ${a}x² + ${b}?`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `Die Ableitung von ${a}x² + ${b} ist ${result}x`
                });
            } else if (type === 'logarithms') {
                const base = 10;
                const number = Math.pow(10, Math.floor(Math.random() * 3) + 1);
                const result = Math.log10(number);
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Berechne: log₁₀(${number})`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `log₁₀(${number}) = ${result}, da ${base}^${result} = ${number}`
                });
            } else {
                const favorable = Math.floor(Math.random() * 3) + 1;
                const total = Math.floor(Math.random() * 5) + 4;
                const result = Math.round((favorable / total) * 100);
                
                const wrongAnswers = this.generateWrongAnswers(result, 3);
                const options = this.shuffleArray([result, ...wrongAnswers]);
                const correctIndex = options.indexOf(result);
                
                questions.push({
                    question: `Wahrscheinlichkeit: ${favorable} von ${total} = ?%`,
                    options: options.map(String),
                    correctAnswer: correctIndex,
                    explanation: `Wahrscheinlichkeit = ${favorable}/${total} = ${result}%`
                });
            }
        }
        
        return questions;
    },

    // Hilfsfunktionen
    generateWrongAnswers: function(correct, count) {
        const wrong = [];
        while (wrong.length < count) {
            const wrongAnswer = correct + Math.floor(Math.random() * 10) - 5;
            if (wrongAnswer !== correct && !wrong.includes(wrongAnswer) && wrongAnswer > 0) {
                wrong.push(wrongAnswer);
            }
        }
        return wrong;
    },

    shuffleArray: function(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    // Legacy-Support für alte Level-Struktur
    level1: function() { return this.generateGrade1Questions(); },
    level2: function() { return this.generateGrade2Questions(); },
    level3: function() { return this.generateGrade3Questions(); },
    level4: function() { return this.generateGrade4Questions(); },
    level5: function() { return this.generateGrade5Questions(); },
    level6: function() { return this.generateGrade6Questions(); },
    level7: function() { return this.generateGrade7Questions(); },
    level8: function() { return this.generateGrade8Questions(); },
    level9: function() { return this.generateGrade9Questions(); },
    level10: function() { return this.generateGrade10Questions(); }
};

// Export für andere Dateien
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MathematikQuestions;
}
