// Deutsch - Grundschulniveau (Klassen 1-10) mit dynamischer Aufgaben-Generierung
const DeutschQuestions = {
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

    // Klasse 1: Buchstaben, einfache Wörter
    generateGrade1Questions: function() {
        const questions = [];
        const questionTypes = ['missing_letter', 'rhyming', 'first_letter', 'categories', 'colors'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'missing_letter') {
                const words = ['Apfel', 'Haus', 'Ball', 'Katze', 'Buch'];
                const word = words[Math.floor(Math.random() * words.length)];
                const missingIndex = Math.floor(Math.random() * (word.length - 1)) + 1;
                const missingLetter = word[missingIndex];
                const incompleteWord = word.slice(0, missingIndex) + '_' + word.slice(missingIndex + 1);
                
                const options = [missingLetter, 'e', 'a', 'i'];
                const correctIndex = options.indexOf(missingLetter);
                
                questions.push({
                    question: `Welcher Buchstabe fehlt: ${incompleteWord}`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `Das Wort ist '${word}' - der fehlende Buchstabe ist '${missingLetter}'`
                });
            } else if (type === 'rhyming') {
                const rhymes = [
                    { word: 'Haus', rhyme: 'Maus', wrong: ['Baum', 'Tisch', 'Buch'] },
                    { word: 'Ball', rhyme: 'Fall', wrong: ['Auto', 'Dach', 'Fenster'] },
                    { word: 'Katze', rhyme: 'Matze', wrong: ['Hund', 'Maus', 'Vogel'] }
                ];
                const rhyme = rhymes[Math.floor(Math.random() * rhymes.length)];
                const options = this.shuffleArray([rhyme.rhyme, ...rhyme.wrong]);
                const correctIndex = options.indexOf(rhyme.rhyme);
                
                questions.push({
                    question: `Welches Wort reimt sich auf '${rhyme.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${rhyme.rhyme}' reimt sich auf '${rhyme.word}'`
                });
            } else if (type === 'first_letter') {
                const letters = ['B', 'H', 'K', 'A'];
                const letter = letters[Math.floor(Math.random() * letters.length)];
                const words = {
                    'B': ['Ball', 'Buch', 'Baum'],
                    'H': ['Haus', 'Hund', 'Hase'],
                    'K': ['Katze', 'Kuh', 'Kind'],
                    'A': ['Apfel', 'Auto', 'Auge']
                };
                const correctWord = words[letter][Math.floor(Math.random() * words[letter].length)];
                const wrongWords = ['Tisch', 'Fenster', 'Dach'];
                const options = this.shuffleArray([correctWord, ...wrongWords]);
                const correctIndex = options.indexOf(correctWord);
                
                questions.push({
                    question: `Welches Wort beginnt mit '${letter}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${correctWord}' beginnt mit dem Buchstaben '${letter}'`
                });
            } else if (type === 'categories') {
                const categories = [
                    { category: 'Tier', correct: 'Katze', wrong: ['Tisch', 'Haus', 'Buch'] },
                    { category: 'Farbe', correct: 'blau', wrong: ['groß', 'schnell', 'alt'] },
                    { category: 'Gegenstand', correct: 'Tisch', wrong: ['Hund', 'Baum', 'Wasser'] }
                ];
                const cat = categories[Math.floor(Math.random() * categories.length)];
                const options = this.shuffleArray([cat.correct, ...cat.wrong]);
                const correctIndex = options.indexOf(cat.correct);
                
                questions.push({
                    question: `Welches Wort ist ein ${cat.category}?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${cat.correct}' ist ein ${cat.category}`
                });
            } else {
                const colors = ['blau', 'rot', 'grün', 'gelb'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                const wrong = ['groß', 'schnell', 'alt'];
                const options = this.shuffleArray([color, ...wrong]);
                const correctIndex = options.indexOf(color);
                
                questions.push({
                    question: `Welches Wort ist eine Farbe?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${color}' ist eine Farbe`
                });
            }
        }
        
        return questions;
    },

    // Klasse 2: Artikel, einfache Sätze
    generateGrade2Questions: function() {
        const questions = [];
        const questionTypes = ['articles', 'word_types', 'simple_sentences'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'articles') {
                const nouns = [
                    { word: 'Haus', article: 'das', gender: 'neutral' },
                    { word: 'Katze', article: 'die', gender: 'feminine' },
                    { word: 'Hund', article: 'der', gender: 'masculine' },
                    { word: 'Buch', article: 'das', gender: 'neutral' },
                    { word: 'Frau', article: 'die', gender: 'feminine' }
                ];
                const noun = nouns[Math.floor(Math.random() * nouns.length)];
                const options = ['der', 'das', 'die', 'den'];
                const correctIndex = options.indexOf(noun.article);
                
                questions.push({
                    question: `Welcher Artikel ist korrekt: ___ ${noun.word}`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `Das Wort '${noun.word}' ist ${noun.gender}, daher '${noun.article} ${noun.word}'`
                });
            } else if (type === 'word_types') {
                const wordTypes = [
                    { word: 'laufen', type: 'Verb', explanation: 'Tätigkeitswort' },
                    { word: 'groß', type: 'Adjektiv', explanation: 'Eigenschaftswort' },
                    { word: 'Haus', type: 'Nomen', explanation: 'Namenwort' },
                    { word: 'schnell', type: 'Adverb', explanation: 'Umstandswort' }
                ];
                const wordType = wordTypes[Math.floor(Math.random() * wordTypes.length)];
                const options = ['Verb', 'Adjektiv', 'Nomen', 'Adverb'];
                const correctIndex = options.indexOf(wordType.type);
                
                questions.push({
                    question: `Welches Wort ist ein ${wordType.type}?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${wordType.word}' ist ein ${wordType.type} (${wordType.explanation})`
                });
            } else {
                const sentences = [
                    { correct: 'Ich gehe zur Schule', wrong: ['Ich gehen zur Schule', 'Ich geht zur Schule'] },
                    { correct: 'Das Kind spielt', wrong: ['Das Kind spielen', 'Das Kind spiele'] },
                    { correct: 'Wir sind Freunde', wrong: ['Wir ist Freunde', 'Wir seid Freunde'] }
                ];
                const sentence = sentences[Math.floor(Math.random() * sentences.length)];
                const options = this.shuffleArray([sentence.correct, ...sentence.wrong]);
                const correctIndex = options.indexOf(sentence.correct);
                
                questions.push({
                    question: `Welcher Satz ist korrekt?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${sentence.correct}' ist grammatikalisch korrekt`
                });
            }
        }
        
        return questions;
    },

    // Klasse 3: Mehrzahl, Wortarten
    generateGrade3Questions: function() {
        const questions = [];
        const questionTypes = ['plural', 'word_classes', 'pronouns'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'plural') {
                const plurals = [
                    { singular: 'Kind', plural: 'Kinder' },
                    { singular: 'Haus', plural: 'Häuser' },
                    { singular: 'Buch', plural: 'Bücher' },
                    { singular: 'Mann', plural: 'Männer' },
                    { singular: 'Frau', plural: 'Frauen' }
                ];
                const plural = plurals[Math.floor(Math.random() * plurals.length)];
                const options = [plural.plural, plural.singular, plural.singular + 'e', plural.singular + 'en'];
                const correctIndex = options.indexOf(plural.plural);
                
                questions.push({
                    question: `Was ist die Mehrzahl von '${plural.singular}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `Die Mehrzahl von '${plural.singular}' ist '${plural.plural}'`
                });
            } else if (type === 'word_classes') {
                const classes = [
                    { word: 'Haus', class: 'Nomen', explanation: 'Namenwort' },
                    { word: 'gehen', class: 'Verb', explanation: 'Tätigkeitswort' },
                    { word: 'schön', class: 'Adjektiv', explanation: 'Eigenschaftswort' },
                    { word: 'schnell', class: 'Adverb', explanation: 'Umstandswort' }
                ];
                const wordClass = classes[Math.floor(Math.random() * classes.length)];
                const options = ['Nomen', 'Verb', 'Adjektiv', 'Adverb'];
                const correctIndex = options.indexOf(wordClass.class);
                
                questions.push({
                    question: `Welches Wort ist ein ${wordClass.class}?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${wordClass.word}' ist ein ${wordClass.class} (${wordClass.explanation})`
                });
            } else {
                const pronouns = ['ich', 'du', 'er', 'sie', 'es'];
                const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];
                const options = [pronoun, 'groß', 'gehen', 'Haus'];
                const correctIndex = options.indexOf(pronoun);
                
                questions.push({
                    question: `Welches Wort ist ein Pronomen?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${pronoun}' ist ein Pronomen (Fürwort)`
                });
            }
        }
        
        return questions;
    },

    // Klasse 4: Grammatik, Satzbau
    generateGrade4Questions: function() {
        const questions = [];
        const questionTypes = ['grammar', 'synonyms', 'antonyms', 'adverbs'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'grammar') {
                const sentences = [
                    { correct: 'Ich gehe zur Schule', wrong: ['Ich gehen zur Schule', 'Ich geht zur Schule', 'Ich gehe Schule'] },
                    { correct: 'Das Kind spielt', wrong: ['Das Kind spielen', 'Das Kind spiele', 'Das Kind spielst'] },
                    { correct: 'Wir haben Hunger', wrong: ['Wir hat Hunger', 'Wir habt Hunger', 'Wir hast Hunger'] }
                ];
                const sentence = sentences[Math.floor(Math.random() * sentences.length)];
                const options = this.shuffleArray([sentence.correct, ...sentence.wrong]);
                const correctIndex = options.indexOf(sentence.correct);
                
                questions.push({
                    question: `Welcher Satz ist grammatikalisch korrekt?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${sentence.correct}' ist grammatikalisch korrekt`
                });
            } else if (type === 'synonyms') {
                const synonyms = [
                    { word: 'groß', synonym: 'riesig', wrong: ['klein', 'mittel', 'kurz'] },
                    { word: 'schön', synonym: 'hübsch', wrong: ['hässlich', 'groß', 'klein'] },
                    { word: 'schnell', synonym: 'rasch', wrong: ['langsam', 'groß', 'klein'] }
                ];
                const syn = synonyms[Math.floor(Math.random() * synonyms.length)];
                const options = this.shuffleArray([syn.synonym, ...syn.wrong]);
                const correctIndex = options.indexOf(syn.synonym);
                
                questions.push({
                    question: `Welches Wort ist ein Synonym für '${syn.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${syn.synonym}' ist ein Synonym für '${syn.word}'`
                });
            } else if (type === 'antonyms') {
                const antonyms = [
                    { word: 'heiß', antonym: 'kalt', wrong: ['warm', 'lauwarm', 'kühl'] },
                    { word: 'hell', antonym: 'dunkel', wrong: ['leuchtend', 'strahlend', 'glänzend'] },
                    { word: 'groß', antonym: 'klein', wrong: ['mittel', 'groß', 'riesig'] }
                ];
                const ant = antonyms[Math.floor(Math.random() * antonyms.length)];
                const options = this.shuffleArray([ant.antonym, ...ant.wrong]);
                const correctIndex = options.indexOf(ant.antonym);
                
                questions.push({
                    question: `Welches Wort ist das Gegenteil von '${ant.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${ant.antonym}' ist das Gegenteil von '${ant.word}'`
                });
            } else {
                const adverbs = ['schnell', 'langsam', 'laut', 'leise'];
                const adverb = adverbs[Math.floor(Math.random() * adverbs.length)];
                const options = [adverb, 'Haus', 'gehen', 'groß'];
                const correctIndex = options.indexOf(adverb);
                
                questions.push({
                    question: `Welches Wort ist ein Adverb?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${adverb}' kann als Adverb verwendet werden`
                });
            }
        }
        
        return questions;
    },

    // Klasse 5: Zeiten, Wortschatz
    generateGrade5Questions: function() {
        const questions = [];
        const questionTypes = ['past_tense', 'translations', 'loan_words'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'past_tense') {
                const verbs = [
                    { infinitive: 'gehen', past: 'ging' },
                    { infinitive: 'kommen', past: 'kam' },
                    { infinitive: 'sehen', past: 'sah' },
                    { infinitive: 'schreiben', past: 'schrieb' }
                ];
                const verb = verbs[Math.floor(Math.random() * verbs.length)];
                const options = [verb.past, verb.infinitive, verb.infinitive + 't', verb.infinitive + 'te'];
                const correctIndex = options.indexOf(verb.past);
                
                questions.push({
                    question: `Was ist die Vergangenheitsform von '${verb.infinitive}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `Die Vergangenheitsform von '${verb.infinitive}' ist '${verb.past}'`
                });
            } else if (type === 'translations') {
                const translations = [
                    { german: 'Freund', english: 'Friend', wrong: ['Family', 'Father', 'Food'] },
                    { german: 'Haus', english: 'House', wrong: ['Home', 'Room', 'Building'] },
                    { german: 'Buch', english: 'Book', wrong: ['Read', 'Page', 'Story'] }
                ];
                const trans = translations[Math.floor(Math.random() * translations.length)];
                const options = this.shuffleArray([trans.english, ...trans.wrong]);
                const correctIndex = options.indexOf(trans.english);
                
                questions.push({
                    question: `Was bedeutet '${trans.german}' auf Englisch?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${trans.german}' bedeutet auf Englisch '${trans.english}'`
                });
            } else {
                const loanWords = ['Computer', 'Manager', 'Team', 'Job'];
                const loanWord = loanWords[Math.floor(Math.random() * loanWords.length)];
                const options = [loanWord, 'Haus', 'Buch', 'Tisch'];
                const correctIndex = options.indexOf(loanWord);
                
                questions.push({
                    question: `Welches Wort ist ein Fremdwort?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${loanWord}' ist ein Fremdwort aus dem Englischen`
                });
            }
        }
        
        return questions;
    },

    // Klasse 6: Komplexere Grammatik, Literatur
    generateGrade6Questions: function() {
        const questions = [];
        const questionTypes = ['conjunctions', 'prepositions', 'advanced_synonyms', 'advanced_antonyms', 'complex_plural'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'conjunctions') {
                const conjunctions = ['und', 'oder', 'aber', 'weil'];
                const conjunction = conjunctions[Math.floor(Math.random() * conjunctions.length)];
                const options = [conjunction, 'groß', 'gehen', 'Haus'];
                const correctIndex = options.indexOf(conjunction);
                
                questions.push({
                    question: `Welches Wort ist eine Konjunktion?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${conjunction}' ist eine Konjunktion (Bindewort)`
                });
            } else if (type === 'prepositions') {
                const prepositions = ['in', 'auf', 'unter', 'über'];
                const preposition = prepositions[Math.floor(Math.random() * prepositions.length)];
                const options = [preposition, 'groß', 'gehen', 'Haus'];
                const correctIndex = options.indexOf(preposition);
                
                questions.push({
                    question: `Welches Wort ist eine Präposition?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${preposition}' ist eine Präposition (Verhältniswort)`
                });
            } else if (type === 'advanced_synonyms') {
                const synonyms = [
                    { word: 'schön', synonym: 'hübsch', wrong: ['hässlich', 'groß', 'klein'] },
                    { word: 'groß', synonym: 'riesig', wrong: ['klein', 'mittel', 'kurz'] },
                    { word: 'schnell', synonym: 'rasch', wrong: ['langsam', 'groß', 'klein'] }
                ];
                const syn = synonyms[Math.floor(Math.random() * synonyms.length)];
                const options = this.shuffleArray([syn.synonym, ...syn.wrong]);
                const correctIndex = options.indexOf(syn.synonym);
                
                questions.push({
                    question: `Was ist ein Synonym für '${syn.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${syn.synonym}' ist ein Synonym für '${syn.word}'`
                });
            } else if (type === 'advanced_antonyms') {
                const antonyms = [
                    { word: 'hell', antonym: 'dunkel', wrong: ['leuchtend', 'strahlend', 'glänzend'] },
                    { word: 'laut', antonym: 'leise', wrong: ['schnell', 'groß', 'klein'] },
                    { word: 'alt', antonym: 'jung', wrong: ['neu', 'groß', 'klein'] }
                ];
                const ant = antonyms[Math.floor(Math.random() * antonyms.length)];
                const options = this.shuffleArray([ant.antonym, ...ant.wrong]);
                const correctIndex = options.indexOf(ant.antonym);
                
                questions.push({
                    question: `Welches Wort ist ein Antonym zu '${ant.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${ant.antonym}' ist das Gegenteil von '${ant.word}'`
                });
            } else {
                const plurals = [
                    { singular: 'Mann', plural: 'Männer' },
                    { singular: 'Frau', plural: 'Frauen' },
                    { singular: 'Kind', plural: 'Kinder' }
                ];
                const plural = plurals[Math.floor(Math.random() * plurals.length)];
                const options = [plural.plural, plural.singular, plural.singular + 'e', plural.singular + 'en'];
                const correctIndex = options.indexOf(plural.plural);
                
                questions.push({
                    question: `Was ist die Mehrzahl von '${plural.singular}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `Die Mehrzahl von '${plural.singular}' ist '${plural.plural}'`
                });
            }
        }
        
        return questions;
    },

    // Klasse 7: Erweiterte Grammatik, Wortschatz
    generateGrade7Questions: function() {
        const questions = [];
        const questionTypes = ['complex_grammar', 'literary_terms', 'advanced_vocabulary'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'complex_grammar') {
                const grammar = [
                    { question: 'Welcher Satz verwendet das Passiv?', correct: 'Das Buch wird gelesen', wrong: ['Ich lese das Buch', 'Das Buch ist interessant', 'Das Buch liegt da'] },
                    { question: 'Welcher Satz verwendet den Konjunktiv?', correct: 'Ich würde gerne kommen', wrong: ['Ich komme gerne', 'Ich kam gestern', 'Ich komme morgen'] }
                ];
                const gram = grammar[Math.floor(Math.random() * grammar.length)];
                const options = this.shuffleArray([gram.correct, ...gram.wrong]);
                const correctIndex = options.indexOf(gram.correct);
                
                questions.push({
                    question: gram.question,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${gram.correct}' verwendet die korrekte Grammatik`
                });
            } else if (type === 'literary_terms') {
                const terms = [
                    { term: 'Metapher', explanation: 'Bildlicher Vergleich ohne Vergleichswort' },
                    { term: 'Reim', explanation: 'Gleichklang am Ende von Versen' },
                    { term: 'Strophe', explanation: 'Gruppe von Versen in einem Gedicht' }
                ];
                const term = terms[Math.floor(Math.random() * terms.length)];
                const options = [term.term, 'Satz', 'Wort', 'Buchstabe'];
                const correctIndex = options.indexOf(term.term);
                
                questions.push({
                    question: `Was ist eine '${term.term}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `Eine ${term.term} ist: ${term.explanation}`
                });
            } else {
                const vocabulary = [
                    { word: 'Konsequenz', meaning: 'Folge, Ergebnis', wrong: ['Anfang', 'Mitte', 'Ende'] },
                    { word: 'Perspektive', meaning: 'Sichtweise, Blickwinkel', wrong: ['Farbe', 'Form', 'Größe'] }
                ];
                const vocab = vocabulary[Math.floor(Math.random() * vocabulary.length)];
                const options = this.shuffleArray([vocab.meaning, ...vocab.wrong]);
                const correctIndex = options.indexOf(vocab.meaning);
                
                questions.push({
                    question: `Was bedeutet '${vocab.word}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `'${vocab.word}' bedeutet: ${vocab.meaning}`
                });
            }
        }
        
        return questions;
    },

    // Klasse 8: Literatur, Rhetorik
    generateGrade8Questions: function() {
        const questions = [];
        const questionTypes = ['rhetoric', 'literary_analysis', 'advanced_grammar'];
        
        for (let i = 0; i < 5; i++) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            if (type === 'rhetoric') {
                const rhetoric = [
                    { device: 'Alliteration', example: 'Peter Piper picked peppers', explanation: 'Wiederholung gleicher Anfangslaute' },
                    { device: 'Metapher', example: 'Das Leben ist eine Reise', explanation: 'Bildlicher Vergleich ohne wie/als' }
                ];
                const rhet = rhetoric[Math.floor(Math.random() * rhetoric.length)];
                const options = [rhet.device, 'Reim', 'Strophe', 'Vers'];
                const correctIndex = options.indexOf(rhet.device);
                
                questions.push({
                    question: `Was ist eine '${rhet.device}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `${rhet.device}: ${rhet.explanation}`
                });
            } else if (type === 'literary_analysis') {
                const analysis = [
                    { question: 'Was ist der Hauptcharakter?', correct: 'Die wichtigste Figur in der Geschichte', wrong: ['Der Autor', 'Der Leser', 'Der Verlag'] },
                    { question: 'Was ist die Handlung?', correct: 'Die Abfolge der Ereignisse', wrong: ['Die Personen', 'Der Ort', 'Die Zeit'] }
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
                const grammar = [
                    { question: 'Was ist ein Relativsatz?', correct: 'Ein Nebensatz mit Relativpronomen', wrong: ['Ein Hauptsatz', 'Ein Fragesatz', 'Ein Ausrufesatz'] },
                    { question: 'Was ist ein Partizip?', correct: 'Eine Verbform zwischen Verb und Adjektiv', wrong: ['Ein Nomen', 'Ein Artikel', 'Eine Präposition'] }
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
                    { style: 'Ironie', explanation: 'Gegensatz zwischen Gesagtem und Gemeintem', example: 'Bei Regen: "Schönes Wetter!"' },
                    { style: 'Hyperbel', explanation: 'Übertreibung zur Verstärkung', example: 'Ich habe tausendmal angerufen' }
                ];
                const style = styles[Math.floor(Math.random() * styles.length)];
                const options = [style.style, 'Metapher', 'Reim', 'Strophe'];
                const correctIndex = options.indexOf(style.style);
                
                questions.push({
                    question: `Was ist eine '${style.style}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `${style.style}: ${style.explanation}`
                });
            } else if (type === 'literary_periods') {
                const periods = [
                    { period: 'Romantik', time: '1795-1835', characteristic: 'Gefühl, Natur, Individualität' },
                    { period: 'Realismus', time: '1850-1890', characteristic: 'Wirklichkeitsdarstellung, Objektivität' }
                ];
                const period = periods[Math.floor(Math.random() * periods.length)];
                const options = [period.period, 'Moderne', 'Antike', 'Mittelalter'];
                const correctIndex = options.indexOf(period.period);
                
                questions.push({
                    question: `Welche Literaturepoche war von ${period.time}?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `${period.period} (${period.time}): ${period.characteristic}`
                });
            } else {
                const analysis = [
                    { question: 'Was ist eine Interpretation?', correct: 'Deutung und Erklärung eines Textes', wrong: ['Zusammenfassung', 'Wiedergabe', 'Übersetzung'] },
                    { question: 'Was ist ein Motiv?', correct: 'Wiederkehrendes Thema oder Element', wrong: ['Person', 'Ort', 'Zeit'] }
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
                    { concept: 'Erzählperspektive', explanation: 'Aus welcher Sicht wird erzählt', types: 'Ich-Erzähler, Er-Erzähler, auktorial' },
                    { concept: 'Symbol', explanation: 'Zeichen mit tieferer Bedeutung', example: 'Rose = Liebe' }
                ];
                const theo = theory[Math.floor(Math.random() * theory.length)];
                const options = [theo.concept, 'Reim', 'Strophe', 'Vers'];
                const correctIndex = options.indexOf(theo.concept);
                
                questions.push({
                    question: `Was ist '${theo.concept}'?`,
                    options: options,
                    correctAnswer: correctIndex,
                    explanation: `${theo.concept}: ${theo.explanation}`
                });
            } else if (type === 'text_analysis') {
                const analysis = [
                    { question: 'Was ist eine Textanalyse?', correct: 'Systematische Untersuchung eines Textes', wrong: ['Zusammenfassung', 'Nacherzählung', 'Übersetzung'] },
                    { question: 'Was ist der Kontext?', correct: 'Umgebung und Zusammenhang des Textes', wrong: ['Der Inhalt', 'Die Form', 'Die Sprache'] }
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
                    { device: 'Anapher', explanation: 'Wiederholung am Satzanfang', example: 'Ich komme, ich sehe, ich siege' },
                    { device: 'Chiasmus', explanation: 'Kreuzstellung von Satzgliedern', example: 'Nicht die Jahre, die Stunden zählen' }
                ];
                const style = stylistics[Math.floor(Math.random() * stylistics.length)];
                const options = [style.device, 'Metapher', 'Reim', 'Strophe'];
                const correctIndex = options.indexOf(style.device);
                
                questions.push({
                    question: `Was ist eine '${style.device}'?`,
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
    module.exports = DeutschQuestions;
}
