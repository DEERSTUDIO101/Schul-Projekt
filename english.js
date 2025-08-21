// Englisch - Grundschulniveau (Klassen 1-10) mit dynamischer Aufgaben-Generierung
const EnglischQuestions = {
    // Dynamische Aufgaben-Generierung für alle Klassen
    generateQuestions: function(grade) {
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

    // Klasse 1: Einfache Wörter, Farben, Zahlen
    generateGrade1Questions: function() {
        const questions = [];
        const questionTypes = ['colors', 'numbers', 'animals', 'rhyming', 'opposites'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'colors') {
                const colors = ['blue', 'red', 'green', 'yellow'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                const wrong = ['cat', 'big', 'run'];
                const options = this.shuffleArray([color, ...wrong]);
                const correctIndex = options.indexOf(color);
                
                questions.push({
                    question: `What color is the sky?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `The sky is ${color}`
                });
            } else if (type === 'numbers') {
                const numbers = ['one', 'two', 'three', 'four', 'five'];
                const number = numbers[Math.floor(Math.random() * numbers.length)];
                const wrong = ['cat', 'big', 'run'];
                const options = this.shuffleArray([number, ...wrong]);
                const correctIndex = options.indexOf(number);
                
                questions.push({
                    question: `Which word is a number?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${number}' is a number`
                });
            } else if (type === 'animals') {
                const animals = ['dog', 'cat', 'bird', 'fish'];
                const animal = animals[Math.floor(Math.random() * animals.length)];
                const wrong = ['house', 'book', 'tree'];
                const options = this.shuffleArray([animal, ...wrong]);
                const correctIndex = options.indexOf(animal);
                
                questions.push({
                    question: `Which word is an animal?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${animal}' is an animal`
                });
            } else if (type === 'rhyming') {
                const rhymes = [
                    { word: 'cat', rhyme: 'hat', wrong: ['dog', 'bird', 'fish'] },
                    { word: 'ball', rhyme: 'fall', wrong: ['house', 'book', 'tree'] },
                    { word: 'sun', rhyme: 'fun', wrong: ['moon', 'star', 'cloud'] }
                ];
                const rhyme = rhymes[Math.floor(Math.random() * rhymes.length)];
                const options = this.shuffleArray([rhyme.rhyme, ...rhyme.wrong]);
                const correctIndex = options.indexOf(rhyme.rhyme);
                
                questions.push({
                    question: `Which word rhymes with '${rhyme.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${rhyme.rhyme}' rhymes with '${rhyme.word}'`
                });
            } else {
                const opposites = [
                    { word: 'big', opposite: 'small', wrong: ['large', 'tiny', 'little'] },
                    { word: 'hot', opposite: 'cold', wrong: ['warm', 'nice', 'cool'] },
                    { word: 'fast', opposite: 'slow', wrong: ['quick', 'rapid', 'quickly'] }
                ];
                const opp = opposites[Math.floor(Math.random() * opposites.length)];
                const options = this.shuffleArray([opp.opposite, ...opp.wrong]);
                const correctIndex = options.indexOf(opp.opposite);
                
                questions.push({
                    question: `Which word means the opposite of '${opp.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${opp.opposite}' means the opposite of '${opp.word}'`
                });
            }
        }
        
        return questions;
    },

    // Klasse 2: Einfache Sätze, Artikel
    generateGrade2Questions: function() {
        const questions = [];
        const questionTypes = ['sentences', 'articles', 'opposites', 'verbs'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'sentences') {
                const sentences = [
                    { correct: 'I am a boy', wrong: ['I is a boy', 'I are a boy', 'I be a boy'] },
                    { correct: 'She is happy', wrong: ['She are happy', 'She am happy', 'She be happy'] },
                    { correct: 'They are friends', wrong: ['They is friends', 'They am friends', 'They be friends'] }
                ];
                const sentence = sentences[Math.floor(Math.random() * sentences.length)];
                const options = this.shuffleArray([sentence.correct, ...sentence.wrong]);
                const correctIndex = options.indexOf(sentence.correct);
                
                questions.push({
                    question: `Which sentence is correct?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${sentence.correct}' is grammatically correct`
                });
            } else if (type === 'articles') {
                const articles = [
                    { word: 'apple', article: 'an', explanation: 'Use "an" before words starting with a vowel sound' },
                    { word: 'book', article: 'a', explanation: 'Use "a" before words starting with a consonant sound' },
                    { word: 'umbrella', article: 'an', explanation: 'Use "an" before words starting with a vowel sound' }
                ];
                const article = articles[Math.floor(Math.random() * articles.length)];
                const options = ['a', 'an', 'the', 'this'];
                const correctIndex = options.indexOf(article.article);
                
                questions.push({
                    question: `Which article is correct: ___ ${article.word}`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: article.explanation
                });
            } else if (type === 'opposites') {
                const opposites = [
                    { word: 'hot', opposite: 'cold', wrong: ['warm', 'nice', 'cool'] },
                    { word: 'big', opposite: 'small', wrong: ['large', 'tiny', 'little'] },
                    { word: 'happy', opposite: 'sad', wrong: ['glad', 'joyful', 'cheerful'] }
                ];
                const opp = opposites[Math.floor(Math.random() * opposites.length)];
                const options = this.shuffleArray([opp.opposite, ...opp.wrong]);
                const correctIndex = options.indexOf(opp.opposite);
                
                questions.push({
                    question: `What is the opposite of '${opp.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${opp.opposite}' is the opposite of '${opp.word}'`
                });
            } else {
                const verbs = ['run', 'jump', 'play', 'eat'];
                const verb = verbs[Math.floor(Math.random() * verbs.length)];
                const options = [verb, 'happy', 'fast', 'big'];
                const correctIndex = options.indexOf(verb);
                
                questions.push({
                    question: `Which word is a verb?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${verb}' is a verb (action word)`
                });
            }
        }
        
        return questions;
    },

    // Klasse 3: Mehrzahl, einfache Grammatik
    generateGrade3Questions: function() {
        const questions = [];
        const questionTypes = ['plural', 'word_classes', 'simple_grammar'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'plural') {
                const plurals = [
                    { singular: 'child', plural: 'children' },
                    { singular: 'book', plural: 'books' },
                    { singular: 'cat', plural: 'cats' },
                    { singular: 'man', plural: 'men' },
                    { singular: 'woman', plural: 'women' }
                ];
                const plural = plurals[Math.floor(Math.random() * plurals.length)];
                const options = [plural.plural, plural.singular, plural.singular + 's', plural.singular + 'es'];
                const correctIndex = options.indexOf(plural.plural);
                
                questions.push({
                    question: `What is the plural of '${plural.singular}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `The plural of '${plural.singular}' is '${plural.plural}'`
                });
            } else if (type === 'word_classes') {
                const classes = [
                    { word: 'house', class: 'noun', explanation: 'naming word' },
                    { word: 'run', class: 'verb', explanation: 'action word' },
                    { word: 'beautiful', class: 'adjective', explanation: 'describing word' },
                    { word: 'quickly', class: 'adverb', explanation: 'describes how an action is done' }
                ];
                const wordClass = classes[Math.floor(Math.random() * classes.length)];
                const options = ['noun', 'verb', 'adjective', 'adverb'];
                const correctIndex = options.indexOf(wordClass.class);
                
                questions.push({
                    question: `Which word is a ${wordClass.class}?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${wordClass.word}' is a ${wordClass.class} (${wordClass.explanation})`
                });
            } else {
                const grammar = [
                    { question: 'Which sentence uses "is"?', correct: 'He is tall', wrong: ['They is tall', 'I is tall', 'We is tall'] },
                    { question: 'Which sentence uses "are"?', correct: 'They are happy', wrong: ['He are happy', 'She are happy', 'It are happy'] }
                ];
                const gram = grammar[Math.floor(Math.random() * grammar.length)];
                const options = this.shuffleArray([gram.correct, ...gram.wrong]);
                const correctIndex = options.indexOf(gram.correct);
                
                questions.push({
                    question: gram.question,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${gram.correct}' uses the correct verb form`
                });
            }
        }
        
        return questions;
    },

    // Klasse 4: Zeiten, Wortschatz
    generateGrade4Questions: function() {
        const questions = [];
        const questionTypes = ['past_tense', 'translations', 'tenses', 'vocabulary'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'past_tense') {
                const verbs = [
                    { infinitive: 'go', past: 'went' },
                    { infinitive: 'see', past: 'saw' },
                    { infinitive: 'come', past: 'came' },
                    { infinitive: 'write', past: 'wrote' }
                ];
                const verb = verbs[Math.floor(Math.random() * verbs.length)];
                const options = [verb.past, verb.infinitive + 'ed', verb.infinitive, verb.infinitive + 'ing'];
                const correctIndex = options.indexOf(verb.past);
                
                questions.push({
                    question: `What is the past tense of '${verb.infinitive}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `The past tense of '${verb.infinitive}' is '${verb.past}'`
                });
            } else if (type === 'translations') {
                const translations = [
                    { english: 'friend', german: 'Freund', wrong: ['Familie', 'Vater', 'Essen'] },
                    { english: 'house', german: 'Haus', wrong: ['Hund', 'Hut', 'Hose'] },
                    { english: 'book', german: 'Buch', wrong: ['Ball', 'Baum', 'Brot'] }
                ];
                const trans = translations[Math.floor(Math.random() * translations.length)];
                const options = this.shuffleArray([trans.german, ...trans.wrong]);
                const correctIndex = options.indexOf(trans.german);
                
                questions.push({
                    question: `What does '${trans.english}' mean in German?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${trans.english}' means '${trans.german}' in German`
                });
            } else if (type === 'tenses') {
                const tenses = [
                    { question: 'Which sentence uses the present continuous?', correct: 'I am going to school', wrong: ['I go to school', 'I went to school', 'I will go to school'] },
                    { question: 'Which sentence uses the simple present?', correct: 'I go to school', wrong: ['I am going to school', 'I went to school', 'I will go to school'] }
                ];
                const tense = tenses[Math.floor(Math.random() * tenses.length)];
                const options = this.shuffleArray([tense.correct, ...tense.wrong]);
                const correctIndex = options.indexOf(tense.correct);
                
                questions.push({
                    question: tense.question,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${tense.correct}' uses the correct tense`
                });
            } else {
                const vocabulary = [
                    { word: 'enormous', meaning: 'very big', wrong: ['small', 'medium', 'tiny'] },
                    { word: 'delicious', meaning: 'very tasty', wrong: ['bad', 'okay', 'terrible'] }
                ];
                const vocab = vocabulary[Math.floor(Math.random() * vocabulary.length)];
                const options = this.shuffleArray([vocab.meaning, ...vocab.wrong]);
                const correctIndex = options.indexOf(vocab.meaning);
                
                questions.push({
                    question: `What does '${vocab.word}' mean?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${vocab.word}' means '${vocab.meaning}'`
                });
            }
        }
        
        return questions;
    },

    // Klasse 5: Komplexere Grammatik, Wortschatz
    generateGrade5Questions: function() {
        const questions = [];
        const questionTypes = ['future_tense', 'pronouns', 'synonyms', 'antonyms', 'adverbs'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'future_tense') {
                const future = [
                    { question: 'Which sentence uses the future tense?', correct: 'I will go to school', wrong: ['I go to school', 'I am going to school', 'I went to school'] },
                    { question: 'Which sentence uses "going to"?', correct: 'I am going to study', wrong: ['I will study', 'I study', 'I studied'] }
                ];
                const fut = future[Math.floor(Math.random() * future.length)];
                const options = this.shuffleArray([fut.correct, ...fut.wrong]);
                const correctIndex = options.indexOf(fut.correct);
                
                questions.push({
                    question: fut.question,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${fut.correct}' uses the future tense`
                });
            } else if (type === 'pronouns') {
                const pronouns = ['he', 'she', 'they', 'we', 'you'];
                const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
                const options = [pronoun, 'happy', 'house', 'run'];
                const correctIndex = options.indexOf(pronoun);
                
                questions.push({
                    question: `Which word is a pronoun?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${pronoun}' is a pronoun`
                });
            } else if (type === 'synonyms') {
                const synonyms = [
                    { word: 'happy', synonym: 'joyful', wrong: ['sad', 'angry', 'tired'] },
                    { word: 'big', synonym: 'large', wrong: ['small', 'tiny', 'little'] },
                    { word: 'fast', synonym: 'quick', wrong: ['slow', 'slowly', 'quiet'] }
                ];
                const syn = synonyms[Math.floor(Math.random() * synonyms.length)];
                const options = this.shuffleArray([syn.synonym, ...syn.wrong]);
                const correctIndex = options.indexOf(syn.synonym);
                
                questions.push({
                    question: `What is a synonym for '${syn.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${syn.synonym}' is a synonym for '${syn.word}'`
                });
            } else if (type === 'antonyms') {
                const antonyms = [
                    { word: 'big', antonym: 'small', wrong: ['large', 'huge', 'great'] },
                    { word: 'hot', antonym: 'cold', wrong: ['warm', 'nice', 'cool'] },
                    { word: 'happy', antonym: 'sad', wrong: ['glad', 'joyful', 'cheerful'] }
                ];
                const ant = antonyms[Math.floor(Math.random() * antonyms.length)];
                const options = this.shuffleArray([ant.antonym, ...ant.wrong]);
                const correctIndex = options.indexOf(ant.antonym);
                
                questions.push({
                    question: `What is an antonym for '${ant.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${ant.antonym}' is the opposite of '${ant.word}'`
                });
            } else {
                const adverbs = ['quickly', 'slowly', 'loudly', 'quietly'];
                const adverb = adverbs[Math.floor(Math.random() * adverbs.length)];
                const options = [adverb, 'quick', 'fast', 'speed'];
                const correctIndex = options.indexOf(adverb);
                
                questions.push({
                    question: `Which word is an adverb?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${adverb}' is an adverb (describes how an action is done)`
                });
            }
        }
        
        return questions;
    },

    // Klasse 6: Erweiterte Grammatik, Literatur
    generateGrade6Questions: function() {
        const questions = [];
        const questionTypes = ['perfect_tense', 'comparatives', 'superlatives', 'conjunctions', 'complex_plural'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'perfect_tense') {
                const perfect = [
                    { question: 'Which sentence uses the present perfect?', correct: 'I have gone to school', wrong: ['I go to school', 'I am going to school', 'I will go to school'] },
                    { question: 'Which sentence uses "has"?', correct: 'He has finished his homework', wrong: ['He have finished his homework', 'He had finished his homework', 'He will finish his homework'] }
                ];
                const perf = perfect[Math.floor(Math.random() * perfect.length)];
                const options = this.shuffleArray([perf.correct, ...perf.wrong]);
                const correctIndex = options.indexOf(perf.correct);
                
                questions.push({
                    question: perf.question,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${perf.correct}' uses the present perfect tense`
                });
            } else if (type === 'comparatives') {
                const comparatives = [
                    { word: 'good', comparative: 'better', wrong: ['gooder', 'more good', 'goodest'] },
                    { word: 'bad', comparative: 'worse', wrong: ['badder', 'more bad', 'baddest'] },
                    { word: 'big', comparative: 'bigger', wrong: ['more big', 'biggest', 'biger'] }
                ];
                const comp = comparatives[Math.floor(Math.random() * comparatives.length)];
                const options = this.shuffleArray([comp.comparative, ...comp.wrong]);
                const correctIndex = options.indexOf(comp.comparative);
                
                questions.push({
                    question: `What is the comparative form of '${comp.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `The comparative form of '${comp.word}' is '${comp.comparative}'`
                });
            } else if (type === 'superlatives') {
                const superlatives = [
                    { word: 'big', superlative: 'biggest', wrong: ['bigger', 'more big', 'most big'] },
                    { word: 'good', superlative: 'best', wrong: ['goodest', 'more good', 'most good'] },
                    { word: 'bad', superlative: 'worst', wrong: ['baddest', 'more bad', 'most bad'] }
                ];
                const sup = superlatives[Math.floor(Math.random() * superlatives.length)];
                const options = this.shuffleArray([sup.superlative, ...sup.wrong]);
                const correctIndex = options.indexOf(sup.superlative);
                
                questions.push({
                    question: `What is the superlative form of '${sup.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `The superlative form of '${sup.word}' is '${sup.superlative}'`
                });
            } else if (type === 'conjunctions') {
                const conjunctions = ['and', 'but', 'or', 'because'];
                const conjunction = conjunctions[Math.floor(Math.random() * conjunctions.length)];
                const options = [conjunction, 'happy', 'quickly', 'house'];
                const correctIndex = options.indexOf(conjunction);
                
                questions.push({
                    question: `Which word is a conjunction?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${conjunction}' is a conjunction (connecting word)`
                });
            } else {
                const plurals = [
                    { singular: 'man', plural: 'men' },
                    { singular: 'woman', plural: 'women' },
                    { singular: 'child', plural: 'children' }
                ];
                const plural = plurals[Math.floor(Math.random() * plurals.length)];
                const options = [plural.plural, plural.singular, plural.singular + 's', plural.singular + 'es'];
                const correctIndex = options.indexOf(plural.plural);
                
                questions.push({
                    question: `What is the plural of '${plural.singular}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `The plural of '${plural.singular}' is '${plural.plural}'`
                });
            }
        }
        
        return questions;
    },

    // Klasse 7: Erweiterte Grammatik, Wortschatz
    generateGrade7Questions: function() {
        const questions = [];
        const questionTypes = ['complex_grammar', 'advanced_vocabulary', 'phrasal_verbs'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'complex_grammar') {
                const grammar = [
                    { question: 'Which sentence uses the passive voice?', correct: 'The book was written by him', wrong: ['He wrote the book', 'He is writing the book', 'He will write the book'] },
                    { question: 'Which sentence uses a relative clause?', correct: 'The man who lives here is my friend', wrong: ['The man is my friend', 'The man lives here', 'The man and my friend'] }
                ];
                const gram = grammar[Math.floor(Math.random() * grammar.length)];
                const options = this.shuffleArray([gram.correct, ...gram.wrong]);
                const correctIndex = options.indexOf(gram.correct);
                
                questions.push({
                    question: gram.question,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${gram.correct}' uses the correct grammar structure`
                });
            } else if (type === 'advanced_vocabulary') {
                const vocabulary = [
                    { word: 'enormous', meaning: 'very big', wrong: ['small', 'medium', 'tiny'] },
                    { word: 'delicious', meaning: 'very tasty', wrong: ['bad', 'okay', 'terrible'] },
                    { word: 'brilliant', meaning: 'very smart', wrong: ['stupid', 'average', 'dull'] }
                ];
                const vocab = vocabulary[Math.floor(Math.random() * vocabulary.length)];
                const options = this.shuffleArray([vocab.meaning, ...vocab.wrong]);
                const correctIndex = options.indexOf(vocab.meaning);
                
                questions.push({
                    question: `What does '${vocab.word}' mean?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${vocab.word}' means '${vocab.meaning}'`
                });
            } else {
                const phrasal = [
                    { verb: 'look up', meaning: 'search for information', example: 'I need to look up that word' },
                    { verb: 'give up', meaning: 'stop trying', example: 'Don\'t give up!' }
                ];
                const phrasalVerb = phrasal[Math.floor(Math.random() * phrasal.length)];
                const options = [phrasalVerb.meaning, 'look at', 'give to', 'search for'];
                const correctIndex = options.indexOf(phrasalVerb.meaning);
                
                questions.push({
                    question: `What does '${phrasalVerb.verb}' mean?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${phrasalVerb.verb}' means '${phrasalVerb.meaning}'`
                });
            }
        }
        
        return questions;
    },

    // Klasse 8: Literatur, Rhetorik
    generateGrade8Questions: function() {
        const questions = [];
        const questionTypes = ['literary_terms', 'rhetoric', 'advanced_grammar'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'literary_terms') {
                const terms = [
                    { term: 'metaphor', explanation: 'Comparison without using like or as', example: 'Life is a journey' },
                    { term: 'simile', explanation: 'Comparison using like or as', example: 'As brave as a lion' },
                    { term: 'alliteration', explanation: 'Repetition of initial consonant sounds', example: 'Peter Piper picked peppers' }
                ];
                const term = terms[Math.floor(Math.random() * terms.length)];
                const options = [term.term, 'rhyme', 'stanza', 'verse'];
                const correctIndex = options.indexOf(term.term);
                
                questions.push({
                    question: `What is a '${term.term}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `${term.term}: ${term.explanation}`
                });
            } else if (type === 'rhetoric') {
                const rhetoric = [
                    { device: 'hyperbole', explanation: 'Exaggeration for effect', example: 'I\'ve told you a million times' },
                    { device: 'irony', explanation: 'Opposite of what is expected', example: 'A fire station burning down' }
                ];
                const rhet = rhetoric[Math.floor(Math.random() * rhetoric.length)];
                const options = [rhet.device, 'metaphor', 'rhyme', 'stanza'];
                const correctIndex = options.indexOf(rhet.device);
                
                questions.push({
                    question: `What is '${rhet.device}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `${rhet.device}: ${rhet.explanation}`
                });
            } else {
                const grammar = [
                    { question: 'What is a subordinate clause?', correct: 'A clause that cannot stand alone', wrong: ['A main clause', 'A simple sentence', 'A compound sentence'] },
                    { question: 'What is a participle?', correct: 'A verb form used as an adjective', wrong: ['A noun', 'An article', 'A preposition'] }
                ];
                const gram = grammar[Math.floor(Math.random() * grammar.length)];
                const options = this.shuffleArray([gram.correct, ...gram.wrong]);
                const correctIndex = options.indexOf(gram.correct);
                
                questions.push({
                    question: gram.question,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: gram.correct
                });
            }
        }
        
        return questions;
    },

    // Klasse 9: Erweiterte Literatur, Stilistik
    generateGrade9Questions: function() {
        const questions = [];
        const questionTypes = ['stylistics', 'literary_periods', 'advanced_analysis'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'stylistics') {
                const styles = [
                    { style: 'irony', explanation: 'Contrast between expectation and reality', example: 'A traffic cop getting a parking ticket' },
                    { style: 'hyperbole', explanation: 'Deliberate exaggeration', example: 'I\'m so hungry I could eat a horse' }
                ];
                const style = styles[Math.floor(Math.random() * styles.length)];
                const options = [style.style, 'metaphor', 'rhyme', 'stanza'];
                const correctIndex = options.indexOf(style.style);
                
                questions.push({
                    question: `What is '${style.style}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `${style.style}: ${style.explanation}`
                });
            } else if (type === 'literary_periods') {
                const periods = [
                    { period: 'Romanticism', time: '1798-1832', characteristic: 'Emotion, nature, individualism' },
                    { period: 'Realism', time: '1850-1900', characteristic: 'Realistic representation, objectivity' }
                ];
                const period = periods[Math.floor(Math.random() * periods.length)];
                const options = [period.period, 'Modernism', 'Classicism', 'Medieval'];
                const correctIndex = options.indexOf(period.period);
                
                questions.push({
                    question: `Which literary period was from ${period.time}?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `${period.period} (${period.time}): ${period.characteristic}`
                });
            } else {
                const analysis = [
                    { question: 'What is interpretation?', correct: 'Explanation and analysis of a text', wrong: ['Summary', 'Retelling', 'Translation'] },
                    { question: 'What is a motif?', correct: 'Recurring theme or element', wrong: ['Character', 'Setting', 'Plot'] }
                ];
                const anal = analysis[Math.floor(Math.random() * analysis.length)];
                const options = this.shuffleArray([anal.correct, ...anal.wrong]);
                const correctIndex = options.indexOf(anal.correct);
                
                questions.push({
                    question: anal.question,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: anal.correct
                });
            }
        }
        
        return questions;
    },

    // Klasse 10: Literaturwissenschaft, Textanalyse
    generateGrade10Questions: function() {
        const questions = [];
        const questionTypes = ['literary_theory', 'text_analysis', 'advanced_stylistics'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'literary_theory') {
                const theory = [
                    { concept: 'narrative perspective', explanation: 'Point of view from which story is told', types: 'First person, third person, omniscient' },
                    { concept: 'symbol', explanation: 'Object representing deeper meaning', example: 'Rose = love' }
                ];
                const theo = theory[Math.floor(Math.random() * theory.length)];
                const options = [theo.concept, 'rhyme', 'stanza', 'verse'];
                const correctIndex = options.indexOf(theo.concept);
                
                questions.push({
                    question: `What is '${theo.concept}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `${theo.concept}: ${theo.explanation}`
                });
            } else if (type === 'text_analysis') {
                const analysis = [
                    { question: 'What is textual analysis?', correct: 'Systematic examination of a text', wrong: ['Summary', 'Retelling', 'Translation'] },
                    { question: 'What is context?', correct: 'Surrounding circumstances and background', wrong: ['Content', 'Form', 'Language'] }
                ];
                const anal = analysis[Math.floor(Math.random() * analysis.length)];
                const options = this.shuffleArray([anal.correct, ...anal.wrong]);
                const correctIndex = options.indexOf(anal.correct);
                
                questions.push({
                    question: anal.question,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: anal.correct
                });
            } else {
                const stylistics = [
                    { device: 'anaphora', explanation: 'Repetition at beginning of sentences', example: 'I came, I saw, I conquered' },
                    { device: 'chiasmus', explanation: 'Reversal of grammatical structures', example: 'Not the years, the hours count' }
                ];
                const style = stylistics[Math.floor(Math.random() * stylistics.length)];
                const options = [style.device, 'metaphor', 'rhyme', 'stanza'];
                const correctIndex = options.indexOf(style.device);
                
                questions.push({
                    question: `What is '${style.device}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `${style.device}: ${style.explanation}`
                });
            }
        }
        
        return questions;
    },

    // Hilfsfunktionen
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
    module.exports = EnglischQuestions;
}
