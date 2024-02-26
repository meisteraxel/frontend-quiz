const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const welcome = document.getElementById("welcome");
const questionOne = document.getElementById("question-1");
const resultContainer = document.getElementById("result-container");
let scoreText = document.getElementById("score");
let score = 0;
let currentQuestionIndex = 1;

startBtn.addEventListener("click", () => {
  const name = document.getElementById("name-input").value;

  if (name === "") {
    alert("Please enter a name");
  } else {
    alert(`Hello ${name}!`);
  }

  welcome.style.display = "none";
  questionOne.style.display = "flex";
});

function submit() {
  let answer = document.querySelector('input[name="question"]:checked').value;
  if (answer === "correct") {
    score++;
    hideCurrentQuestion();
    showNextQuestion();
  } else {
    hideCurrentQuestion();
    showNextQuestion();
  }
}

function hideCurrentQuestion() {
  const currentQuestion = document.getElementById(
    `question-${currentQuestionIndex}`
  );
  if (currentQuestion) {
    currentQuestion.style.display = "none";
  }
}

function showNextQuestion() {
  currentQuestionIndex++;

  const nextQuestion = document.getElementById(
    `question-${currentQuestionIndex}`
  );
  if (nextQuestion) {
    nextQuestion.style.display = "flex";
  } else {
    resultContainer.style.display = "flex";
    scoreText.textContent = `Your score is ${score}`;
  }
}
