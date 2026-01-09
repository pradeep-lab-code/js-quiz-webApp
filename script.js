const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Machine Language", isCorrect: false },
      { text: "HyperText Markup Language", isCorrect: true },
      { text: "HyperText Markdown Language", isCorrect: false },
      { text: "HighText Markup Language", isCorrect: false }
    ]
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    answers: [
      { text: "anchor (a) tag", isCorrect: true },
      { text: "link tag", isCorrect: false },
      { text: "href tag", isCorrect: false },
      { text: "hyperlink tag", isCorrect: false }
    ]
  },
  {
    question: "Which of the following is a JavaScript data type?",
    answers: [
      { text: "float", isCorrect: false },
      { text: "double", isCorrect: false },
      { text: "string", isCorrect: true },
      { text: "character", isCorrect: false }
    ]
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: [
      { text: "var", isCorrect: true },
      { text: "int", isCorrect: false },
      { text: "define", isCorrect: false },
      { text: "letVar", isCorrect: false }
    ]
  },
  {
    question: "How do you write a comment in JavaScript?",
    answers: [
      { text: "Double slash (//)", isCorrect: true },
      { text: "Hash (#)", isCorrect: false },
      { text: "HTML comment", isCorrect: false },
      { text: "Double star (**)", isCorrect: false }
    ]
  },
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Microsoft", isCorrect: false },
      { text: "Netscape", isCorrect: true },
      { text: "Sun Microsystems", isCorrect: false },
      { text: "Google", isCorrect: false }
    ]
  },
  {
    question: "Which method prints output in the browser console?",
    answers: [
      { text: "console.log()", isCorrect: true },
      { text: "print()", isCorrect: false },
      { text: "log.console()", isCorrect: false },
      { text: "console.print()", isCorrect: false }
    ]
  },
  {
    question: "Which is NOT a JavaScript framework?",
    answers: [
      { text: "React", isCorrect: false },
      { text: "Angular", isCorrect: false },
      { text: "Vue", isCorrect: false },
      { text: "Django", isCorrect: true }
    ]
  }
];
;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nxt-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.isCorrect) {
      button.dataset.isCorrect = "true";
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.isCorrect === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.isCorrect === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
