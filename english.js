// =============================
//
//  ENGLISCH LERNDATEN (STATIC)
//
//  ANTON-STYLE UNITS & LEVELS
//
// =============================

const EnglishData = {
    // ======================
    //        CLASS 7
    // ======================
    7: [
        {
            title: "Personal Information",
            description: "Basics: Name, Age, Living, Self-Introduction",
            questions: [
                {
                    type: "multiple-choice",
                    question: "How do you say: 'Ich wohne in Riesa'?",
                    options: [
                        "I live in Riesa.",
                        "I am Riesa.",
                        "I from Riesa.",
                        "I live on Riesa."
                    ],
                    correct: 0
                },
                {
                    type: "fill-in",
                    question: "I am ____ years old.",
                    answer: "13"
                },
                {
                    type: "multiple-choice",
                    question: "How do you ask for someone's name?",
                    options: [
                        "What's your name?",
                        "How are you?",
                        "Where are you from?",
                        "How old are you?"
                    ],
                    correct: 0
                }
            ]
        },
        {
            title: "School & Classroom",
            description: "School things and instructions",
            questions: [
                {
                    type: "vocabulary",
                    question: "Übersetze: pen",
                    options: ["Stift", "Pinsel", "Buch", "Tasche"],
                    correct: 0
                },
                {
                    type: "multiple-choice",
                    question: "Which one is a 'ruler'?",
                    options: ["Book", "Ruler", "Rubber", "Chair"],
                    correct: 1
                },
                {
                    type: "fill-in",
                    question: "Open your ____.",
                    answer: "book"
                }
            ]
        },
        {
            title: "Prepositions",
            description: "in / on / under / next to",
            questions: [
                {
                    type: "multiple-choice",
                    question: "Where is the cat? It is ____ the box.",
                    options: ["in", "on", "under", "next to"],
                    correct: 0
                },
                {
                    type: "fill-in",
                    question: "The book is ____ the desk.",
                    answer: "on"
                },
                {
                    type: "multiple-choice",
                    question: "The school is ____ Germany.",
                    options: ["in", "on", "under", "between"],
                    correct: 0
                }
            ]
        }
    ],
    // ======================
    //        CLASS 8
    // ======================
    8: [
        {
            title: "Simple Past",
            description: "Regelmäßige & unregelmäßige Verben",
            questions: [
                {
                    type: "multiple-choice",
                    question: "They ____ a film yesterday.",
                    options: ["watch", "watched", "watching", "was watching"],
                    correct: 1
                },
                {
                    type: "multiple-choice",
                    question: "He ____ to London last year.",
                    options: ["go", "goes", "went", "gone"],
                    correct: 2
                },
                {
                    type: "fill-in",
                    question: "I ____ (read) a book yesterday.",
                    answer: "read"
                }
            ]
        },
        {
            title: "Descriptions",
            description: "People, rooms and objects",
            questions: [
                {
                    type: "multiple-choice",
                    question: "He is tall and ____.",
                    options: ["slim", "fat", "big", "short"],
                    correct: 0
                },
                {
                    type: "fill-in",
                    question: "She has ____ hair.",
                    answer: "long"
                },
                {
                    type: "multiple-choice",
                    question: "My room is ____.",
                    options: ["big", "old", "dirty", "ugly"],
                    correct: 0
                }
            ]
        },
        {
            title: "Comparatives & Superlatives",
            description: "bigger, better, the best",
            questions: [
                {
                    type: "multiple-choice",
                    question: "My house is ____ than yours.",
                    options: ["big", "bigger", "biggest", "more big"],
                    correct: 1
                },
                {
                    type: "fill-in",
                    question: "This test was the ____ (easy) of all.",
                    answer: "easiest"
                }
            ]
        }
    ],
    // ======================
    //        CLASS 9
    // ======================
    9: [
        {
            title: "Present Perfect",
            description: "Handlungen mit Bezug zur Gegenwart",
            questions: [
                {
                    type: "multiple-choice",
                    question: "I ____ never seen snow before.",
                    options: ["was", "have", "had", "am"],
                    correct: 1
                },
                {
                    type: "fill-in",
                    question: "She has ____ (finish) her homework.",
                    answer: "finished"
                }
            ]
        },
        {
            title: "Introducing Yourself",
            description: "Blue Line 1 – I'm from Greenwich",
            questions: [
                {
                    type: "multiple-choice",
                    question: "How do you introduce yourself?",
                    options: ["Hello, I'm Tom.", "Hi Tom am I.", "Tom is me.", "Hello Tom I am."],
                    correct: 0
                },
                {
                    type: "fill-in",
                    question: "I live in ____.",
                    answer: "London"
                },
                {
                    type: "multiple-choice",
                    question: "What do you say when meeting someone?",
                    options: ["Nice to meet you", "Goodbye", "Thank you", "See you"],
                    correct: 0
                }
            ]
        },
        {
            title: "If-Clauses Type 1",
            description: "Reale Bedingungen",
            questions: [
                {
                    type: "multiple-choice",
                    question: "If it ____ tomorrow, we will stay at home.",
                    options: ["rains", "rain", "raining", "rained"],
                    correct: 0
                },
                {
                    type: "fill-in",
                    question: "If I study, I ____ (pass) the test.",
                    answer: "will pass"
                }
            ]
        }
    ]
};

// ==================================
// DYNAMISCHE ANTON-STIL GENERATION
// ==================================
const EnglischQuestions = {
    generateQuestions(grade) {
        switch (grade) {
            case 7:
                return this.generateGrade7Questions();
            case 8:
                return this.generateGrade8Questions();
            case 9:
                return this.generateGrade9Questions();
            default:
                return [];
        }
    },

    // DYNAMISCHE ANTON-STYLE (aus deinem Code)
    generateGrade7Questions() {
        return EnglishData[7].flatMap(unit => unit.questions);
    },
    generateGrade8Questions() {
        return EnglishData[8].flatMap(unit => unit.questions);
    },
    generateGrade9Questions() {
        return EnglishData[9].flatMap(unit => unit.questions);
    },

    // Hilfsfunktion falls benötigt
    shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
};

// EXPORT SUPPORT
if (typeof module !== "undefined" && module.exports) {
    module.exports = { EnglishData, EnglischQuestions };
}

if (typeof window !== "undefined") {
    window.EnglishData = EnglishData;
    window.EnglischQuestions = EnglischQuestions;
}

