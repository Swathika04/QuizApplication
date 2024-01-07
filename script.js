const quizData = [
    {
        question: 'Who invented Java Programming?',
        options: ['Guido van Rossum','James Gosling', 'Dennis Ritchie', 'Bjarne Stroustrup'],
        answer: 'James Gosling',
    },
    {
        question: 'Which component is used to compile, debug and execute the java programs?',
        options: ['JRE','JIT','JVM','JDK'],
        answer: 'JVM',
    },
    {
        question: ' Which one of the following is not a Java feature?',
        options: ['object-oriented','use of pointers','portable','Dynamic and extensible'],
        answer: 'use of pointers',
    },
    {
        question: ' Which of these cannot be used for a variable name in Java?',
        options: ['identifier & keyword', 'identifier', 'Keyword', 'none of the above'],
        answer: 'Keywords',
    },
    {
        question: 'What is the extension of java code files?',
        options: [
            '.js',
            '.txt',
            '.class',
            '.java',
        ],
        answer: '.java',
    },
    {
        question: 'Which environment variable is used to set the java path?',
        options: ['MAVENpath','JAVApath','JAVA','JAVAhome'],
        answer: 'JAVAhome',
    },
    {
        question: 'Which of the following is not an OOPS concept in Java?',
        options: [
            'Polymorphism',
            'encapsulation',
            'Compilation',
            'Inheritance',
        ],
        answer: 'Compilation',
    },
    {
        question: 'What is the extension of compiled java classes?',
        options: ['.txt', '.js', '.class', '.java'],
        answer: '.class',
    },
    {
        question: ' Which of these are selection statements in Java?',
        options: [
            'Break',
            'Continue',
            'for()',
            'if()',
        ],
        answer: 'if()',
    },
    {
        question: 'Number of primitive data types in Java are?',
        options: ['6','7','8','9'],
        answer: '8',
    },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
    }

    resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();