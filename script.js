const startBtn = document.getElementById("start-btn");
const welcomeContainer = document.getElementById("welcome");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const answersContainer = document.getElementById("answers-container");
const progressBarContainer = document.getElementById("progress-bar-container");
const progressBar = document.getElementById("progress-bar");
const congratulations = document.getElementById("congratulation");
const answersBtn = document.getElementById("answers-btn");
const quizType = document.getElementById("quiz-type");
let currentQuestionIndex = 0;
let score = 0;
let userName = "";
let questions;

//Check which quiz is selected
let quizUrl;

if (quizType.textContent === "HTML") {
  quizUrl = "../questions/html.json";
} else if (quizType.textContent === "CSS") {
  quizUrl = "../questions/css.json";
} else if (quizType.textContent === "JavaScript") {
  quizUrl = "../questions/javascript.json";
} else if (quizType.textContent === "React") {
  quizUrl = "../questions/react.json";
} else if (quizType.textContent === "Angular") {
  quizUrl = "../questions/angular.json";
} else if (quizType.textContent === "Vue.js") {
  quizUrl = "../questions/vuejs.json";
} else if (quizType.textContent === "jQuery") {
  quizUrl = "../questions/jquery.json";
} else if (quizType.textContent === "Bootstrap") {
  quizUrl = "../questions/bootstrap.json";
}

// Get Questions from JSON files
async function fetchQuestions() {
  try {
    const response = await fetch(quizUrl);
    questions = await response.json();
    return questions;
  } catch (error) {
    console.error("Error fetching questions", error);
    return [];
  }
}

// Fetch the questions and store them in the 'questions' variable
async function initializeQuiz() {
  await fetchQuestions();
}
initializeQuiz();

// Confirm name input with Enter Key
document
  .getElementById("name-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      startBtn.click();
    }
  });

// Start the game
startBtn.addEventListener("click", () => {
  userName = document.getElementById("name-input").value;

  if (userName === "") {
    document.getElementById("name-input").style.boxShadow =
      "5px 5px 0px 0px #d40000";
    document.getElementById("name-input").classList.add("shake-horizontal");
  } else {
    document.getElementById("name-input").style.border = "1px solid #5f6368";
    document.getElementById("name-input").classList.remove("shake-horizontal");
    welcomeContainer.style.display = "none";
    progressBarContainer.style.display = "block";
    progressBar.style.width = "0%";
    displayQuestion();
  }
});

//Display the questions
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  //Display the Question Container
  questionContainer.style.display = "flex";

  //Create HTML Elements for the question, options and submit button
  const questionElement = document.createElement("h1");
  questionElement.textContent = currentQuestion.question;

  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options-container");

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit Question";
  submitBtn.classList.add("submit-btn");
  submitBtn.classList.add("btn");
  submitBtn.id = "submit-btn";
  submitBtn.addEventListener("click", checkAnswer);

  currentQuestion.options.forEach((option, index) => {
    const inputElement = document.createElement("input");
    inputElement.type = "radio";
    inputElement.classList.add("radio-btn");
    inputElement.name = "question";
    inputElement.value = option;
    inputElement.id = `option-${index}`;

    const labelElement = document.createElement("label");
    labelElement.htmlFor = `option-${index}`;
    labelElement.textContent = option;

    optionsContainer.appendChild(inputElement);
    optionsContainer.appendChild(labelElement);
  });

  //Add Question to Question Container
  questionContainer.innerHTML = "";
  questionContainer.appendChild(questionElement);
  questionContainer.appendChild(optionsContainer);
  questionContainer.appendChild(submitBtn);

  //Adjust Progress Bar
  progressBar.style.width = `${
    (currentQuestionIndex / questions.length) * 100
  }%`;
}

//Check answer
function checkAnswer() {
  const selectedOption = document.querySelector(
    "input[name='question']:checked"
  );
  if (selectedOption) {
    const userAnswer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    // Store the user's selected answer in the question object
    questions[currentQuestionIndex].userSelectedAnswer = userAnswer;

    if (userAnswer === correctAnswer) {
      score++;
    }
  } else {
    return;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    displayResult();
  }
}

//Display the result
function displayResult() {
  const resultContainer = document.getElementById("result-container");
  const scoreElement = document.getElementById("score");
  const congratsElement = document.getElementById("congratulation");

  document.getElementById("home-btn").style.display = "none";
  questionContainer.style.display = "none";
  resultContainer.style.display = "flex";
  progressBar.style.width = "100%";
  scoreElement.textContent = `Your score is ${score} out of ${currentQuestionIndex}`;

  if (score > currentQuestionIndex / 2) {
    congratulations.textContent = `Great job ${userName}!`;
  } else {
    congratulations.textContent = `Nice try but you can do better ${userName}!`;
  }
}

//Show correct answers
answersBtn.addEventListener("click", () => {
  //Display Home Button and Feedback Button - set Position to Top of Viewport
  document.getElementById("home-btn").style.display = "flex";
  document.getElementById("home-btn").style.position = "absolute";
  document.getElementById("home-btn").style.top = "0%";

  document.getElementById("feedback-btn").style.position = "absolute";
  document.getElementById("feedback-btn").style.top = "0%";
  //Change height of Body to display all Answers
  document.body.style.minHeight = "100vh";
  document.body.style.height = "auto";

  // Display all questions at once
  questions.forEach((currentQuestion, index) => {
    // Create Question Container for each question
    const questionContainer = document.createElement("div");
    questionContainer.classList.add("question-container");

    // Create HTML Elements for the question and options
    const questionElement = document.createElement("h1");
    questionElement.textContent = `${index + 1}. ${currentQuestion.question}`;

    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");

    currentQuestion.options.forEach((option, optionIndex) => {
      const inputElement = document.createElement("input");
      inputElement.type = "radio";
      inputElement.classList.add("radio-btn");
      inputElement.name = `question-${index}`;
      inputElement.value = option;
      inputElement.id = `option-${index}-${optionIndex}`;

      const labelElement = document.createElement("label");
      labelElement.htmlFor = `option-${index}-${optionIndex}`;
      labelElement.textContent = option;

      //Check which option is correct and set color to green
      if (option === currentQuestion.correctAnswer) {
        labelElement.classList.add("correct");
      }

      // Check if the user selected this option
      if (option === currentQuestion.userSelectedAnswer) {
        labelElement.classList.add("user-selected");
      }

      optionsContainer.appendChild(inputElement);
      optionsContainer.appendChild(labelElement);
    });

    // Add Question to Question Container
    questionContainer.appendChild(questionElement);
    questionContainer.appendChild(optionsContainer);

    //Hide Result Container and Progress Bar
    progressBarContainer.style.display = "none";
    answersContainer.style.display = "grid";
    resultContainer.style.display = "none";

    // Append Question Container to the Answers container
    answersContainer.appendChild(questionContainer);
  });
});
