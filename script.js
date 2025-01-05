const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        answer: "Pacific Ocean"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hidden');
    resultElement.classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(option, button));
        optionsElement.appendChild(button);
    });
}

function selectOption(selectedOption, button) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
        score++;
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
    }

    // Disable all options after selection
    const options = optionsElement.querySelectorAll('.option');
    options.forEach(opt => {
        opt.disabled = true;
        if (opt.innerText === currentQuestion.answer) {
            opt.classList.add('correct'); // Highlight the correct answer
        }
    });

    nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        nextButton.classList.add('hidden');
    } else {
        showResult();
    }
});

function showResult() {
    questionElement.classList.add('hidden');
    optionsElement.classList.add('hidden');
    resultElement.classList.remove('hidden');
    scoreElement.innerText = `${score} out of ${questions.length}`;
    scoreElement.classList.add('score'); // Add score class for effect

    // Remove the score class after a short delay to allow the effect to be seen
    setTimeout(() => {
        scoreElement.classList.remove('score');
    }, 2000);
}

restartButton.addEventListener('click', startQuiz);

// Start the quiz when the page loads
startQuiz();
