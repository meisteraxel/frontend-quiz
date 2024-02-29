const startBtn = document.getElementById("start-btn");
const submitBtn = document.querySelectorAll(".submit-btn");
const welcome = document.getElementById("welcome");
const questionOne = document.getElementById("question-1");
const resultContainer = document.getElementById("result-container");
const progressBarContainer = document.getElementById("progress-bar-container");
const progressBar = document.getElementById("progress-bar");
const scoreText = document.getElementById("score");
const congratulations = document.getElementById("congratulation");
const totalQuestions = document.querySelectorAll(".question").length;
const allQuestions = document.querySelectorAll(".question");
const answersBtn = document.getElementById("answers-btn");
const correctLabel = document.querySelectorAll(".correct");
const labels = document.querySelectorAll("label");
let score = 0;
let currentQuestionIndex = 1;
let userName = "";

// Start the game
startBtn.addEventListener("click", () => {
  userName = document.getElementById("name-input").value;

  if (userName === "") {
    document.getElementById("name-input").style.boxShadow =
      "5px 5px 0px 0px #FF0000";
    document.getElementById("name-input").classList.add("shake-horizontal");
  } else {
    document.getElementById("name-input").style.border = "1px solid #5f6368";
    document.getElementById("name-input").classList.remove("shake-horizontal");
    welcome.style.display = "none";
    questionOne.style.display = "flex";
    progressBarContainer.style.display = "block";
    progressBar.style.width = "0%";
  }
});

submitBtn.forEach((submitBtn) => {
  submitBtn.addEventListener("click", submit);
});

// Submit and check answer
function submit() {
  if (document.querySelector('input[name="question"]:checked')) {
    let answer = document.querySelector('input[name="question"]:checked').value;
    if (answer === "correct") {
      score++;
      hideCurrentQuestion();
      showNextQuestion();
    } else {
      hideCurrentQuestion();
      showNextQuestion();
    }
  } else {
    return;
  }
  document.querySelector('input[name="question"]:checked').checked = false;
}

// Hide the current question
function hideCurrentQuestion() {
  const currentQuestion = document.getElementById(
    `question-${currentQuestionIndex}`
  );
  if (currentQuestion) {
    currentQuestion.style.display = "none";
  }
}

// Show the next question
function showNextQuestion() {
  currentQuestionIndex++;
  progressBar.style.width = `${
    ((currentQuestionIndex - 1) / totalQuestions) * 100
  }%`;
  const nextQuestion = document.getElementById(
    `question-${currentQuestionIndex}`
  );
  if (nextQuestion) {
    nextQuestion.style.display = "flex";
  } else {
    resultContainer.style.display = "flex";
    scoreText.textContent = `Your score is ${score} out of ${totalQuestions}`;
    if (score >= 6) {
      congratulations.textContent = `Great job ${userName}!`;
      currentQuestionIndex = 1;
    } else {
      congratulations.textContent = `Nice try but you can do better ${userName}!`;
      currentQuestionIndex = 1;
    }
  }
}

answersBtn.addEventListener("click", () => {
  allQuestions.forEach((question) => {
    resultContainer.style.display = "none";
    question.style.display = "flex";
    question.style.width = "1000px";
    question.style.margin = "20px 0px";
  });
  submitBtn.forEach((submitBtn) => {
    submitBtn.removeEventListener("click", submit);
  });
  correctLabel.forEach((label) => {
    label.style.backgroundColor = "#0B6623";
  });
  progressBarContainer.style.display = "none";
});
