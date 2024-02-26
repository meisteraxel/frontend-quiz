const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const welcome = document.getElementById("welcome");
const questionOne = document.getElementById("question-1");
const resultContainer = document.getElementById("result-container");
let scoreText = document.getElementById("score");
let congratulations = document.getElementById("congratulation");
let score = 0;
let currentQuestionIndex = 1;
let userName = "";

startBtn.addEventListener("click", () => {
  userName = document.getElementById("name-input").value;

  if (userName === "") {
    document.getElementById("name-input").style.border = "1px solid red";
  } else {
    document.getElementById("name-input").style.border = "1px solid #5f6368";
    welcome.style.display = "none";
    questionOne.style.display = "flex";
  }
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
    scoreText.textContent = `Your score is ${score} of 4`;
    if (score >= 3) {
      congratulations.textContent = `Great job ${userName}!`;
      currentQuestionIndex = 1;
    } else {
      congratulations.textContent = `Nice try but you can do better ${userName}!`;
      currentQuestionIndex = 1;
    }
  }
}
