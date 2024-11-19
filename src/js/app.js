// Element Selectors
const startScreen = document.getElementById("quiz__start-screen");
const startButton = document.getElementById("start__button");
const quizContainer = document.getElementById("quiz__container");
const progressBarFill = document.getElementById("progress__bar-fill");
const progressText = document.getElementById("progress__text");
const questionText = document.getElementById("question__text");
const answerOptionButtons = document.getElementById("answer__option-buttons");
const nextButton = document.getElementById("button__next");
const submitButton = document.getElementById("button__submit");
const scoreText = document.getElementById("personal__score");
const endScreen = document.getElementById("end__screen");
const restartButton = document.getElementById("restart__button");
const reviewButton = document.getElementById("review__button");
const quizReviewContainer = document.getElementById("quiz__review");

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Quiz Questions
const questions = [
  {
    question: "Who founded Maison Margiela?",
    options: [
      "John Galliano",
      "Martin Margiela",
      "Tom Ford",
      "Alexander McQueen",
    ],
    answer: 1,
  },
  {
    question:
      "When did John Galliano become creative director of Maison Margiela?",
    options: ["2013", "2014", "2015", "2016"],
    answer: 2,
  },
  {
    question:
      "Which of these is a signature design element often associated with Maison Margiela?",
    options: [
      "Exaggerated floral prints",
      "Deconstructed garments",
      "Gold embellishments",
      "Animal prints",
    ],
    answer: 1,
  },
  {
    question:
      "At which fashion house was John Galliano creative director before joining Margiela?",
    options: ["Dior", "Gucci", "Chanel", "Balenciaga"],
    answer: 0,
  },
  {
    question: "What key feature makes Maison Margiela stand out in fashion?",
    options: [
      "Minimalist white stitching as a logo",
      "Iconic red label",
      "Bold animal prints",
      "Sequined designs",
    ],
    answer: 0,
  },
  {
    question:
      "Which of these is a popular technique used by Margiela to challenge traditional fashion?",
    options: [
      "Use of holographic fabrics",
      "Trompe-l’œil designs",
      "Digital print graphics",
      "Velvet textures",
    ],
    answer: 1,
  },
  {
    question:
      "John Galliano is known for his theatrical runway shows. Which of these describes his style?",
    options: [
      "Understated minimalism",
      "Romantic and extravagant",
      "Streetwear-focused",
      "Sporty chic",
    ],
    answer: 1,
  },
  {
    question:
      "Maison Margiela’s ‘Artisanal’ line is best known for which type of fashion?",
    options: [
      "Haute couture",
      "Ready-to-wear basics",
      "Sportswear",
      "Accessories",
    ],
    answer: 0,
  },
];

// Event Listeners
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  showQuestion();
});
submitButton.addEventListener("click", showEndScreen);
restartButton.addEventListener("click", resetQuizToStart);
reviewButton.addEventListener("click", showReview);

// Function to Start the Quiz
function startQuiz() {
  toggleDisplay(startScreen, false);
  toggleDisplay(quizContainer, true);
  toggleDisplay(endScreen, false);
  toggleDisplay(quizReviewContainer, false);

  score = 0;
  currentQuestionIndex = 0;
  userAnswers = Array(questions.length).fill(null); // Resets Users Answers

  showQuestion();
}

// Function to Show the Current Question
function showQuestion() {
  resetState();
  const question = questions[currentQuestionIndex];
  questionText.textContent = question.question;
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;
  // *  Progress Bar
  progressBarFill.style.width = `${
    ((currentQuestionIndex + 1) / questions.length) * 100
  }%`;
  // *  Answer Options
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("button", "quiz__option");
    button.addEventListener("click", () => selectAnswer(index));
    answerOptionButtons.appendChild(button);

    if (userAnswers[currentQuestionIndex] === index) {
      button.classList.add("selected");
    }
  });
  // *  Next / Submit Button
  nextButton.style.display =
    currentQuestionIndex < questions.length - 1 ? "block" : "none";
  submitButton.style.display =
    currentQuestionIndex === questions.length - 1 ? "block" : "none";
}

// Function to Reset State for the Next Question
function resetState() {
  answerOptionButtons.innerHTML = "";
}

// Function to Select an Answer
function selectAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];

  Array.from(answerOptionButtons.children).forEach((button, index) => {
    button.classList.remove("quiz__answer--options", "correct", "incorrect");
    // *  Correct / Incorrect Answer
    if (index === question.answer)
      button.classList.add("quiz__answer--options", "correct");
    else if (index === selectedIndex)
      button.classList.add("quiz__answer--options", "incorrect");

    button.style.pointerEvents = "none";
  });
  if (selectedIndex === question.answer) {
    score++;
  }
  userAnswers[currentQuestionIndex] = selectedIndex;
}

// Function to Show the End Screen
function showEndScreen() {
  toggleDisplay(quizContainer, false);
  toggleDisplay(endScreen, true);
  scoreText.textContent = `${score} / ${questions.length}`;
}

// Function to Show Answer Review
function showReview() {
  quizReviewContainer.innerHTML = "";
  // *  Creating HTML Elements to Display Quiz Review
  questions.forEach((question, index) => {
    const reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");
    // *  Users Anwers compared to Correct Answer
    const userAnswer =
      userAnswers[index] !== null
        ? question.options[userAnswers[index]]
        : "No Answer";
    const correctAnswer = question.options[question.answer];

    reviewItem.classList.add(
      userAnswer === correctAnswer ? "correct" : "incorrect"
    );
    // *  Answer Review Text Styling and Managing
    reviewItem.innerHTML = `
        <p><strong>Question ${index + 1}:</strong> <i>${
      question.question
    }</i></p>
        <p><strong>Your Answer: </strong><span class="answer">${userAnswer}</span></p>
        <p><strong>Correct Answer: </strong><span class="answer">${correctAnswer}</span></p>
      `;
    quizReviewContainer.appendChild(reviewItem);
  });

  toggleDisplay(quizReviewContainer, true);
}

// Function to Reset the Quiz
function resetQuizToStart() {
  score = 0;
  currentQuestionIndex = 0;
  userAnswers = Array(questions.length).fill(null);

  toggleDisplay(startScreen, true);
  toggleDisplay(quizContainer, false);
  toggleDisplay(endScreen, false);
  toggleDisplay(quizReviewContainer, false);
}

// Function to Toggle Element Visibility
function toggleDisplay(element, show) {
  element.style.display = show ? "block" : "none";
}
