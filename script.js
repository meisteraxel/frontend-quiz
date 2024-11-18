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
let amountQuestions;
let renderedQuestion = 0;

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
} else if (quizType.textContent === "Tailwind") {
  quizUrl = "../questions/tailwind.json";
} else if (quizType.textContent === "Typescript") {
  quizUrl = "../questions/typescript.json";
}

// Get Questions from JSON files
async function fetchQuestions() {
  try {
    const response = await fetch(quizUrl);
    const allQuestions = await response.json();
    // Randomly shuffle all questions and take only the amount user selected
    questions = shuffleArray(allQuestions).slice(0, amountQuestions);
    return questions;
  } catch (error) {
    console.error("Error fetching questions", error);
    return [];
  }
}

// Add this new function to shuffle the array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Update initializeQuiz to fetch questions after we know the amount
async function initializeQuiz() {
  // Remove this line as we'll fetch questions when starting the quiz
}

// Update the start button event listener
startBtn.addEventListener("click", async () => {
  userName = document.getElementById("name-input").value;
  amountQuestions = document.querySelector(
    "input[name='amount-questions']:checked"
  ).value;

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

    // Fetch and shuffle questions here
    await fetchQuestions();
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
    (currentQuestionIndex / amountQuestions) * 100
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

  if (currentQuestionIndex < amountQuestions) {
    displayQuestion();
  } else {
    displayResult();
  }
}

function updateStatistics() {
  return {
    correctAnswers: score,
    incorrectAnswers: currentQuestionIndex - score + 1,
    accuracy: `${Math.round((score / (currentQuestionIndex + 1)) * 100)}%`,
  };
}

//Display the result
function displayResult() {
  const resultContainer = document.getElementById("result-container");
  const congratsElement = document.getElementById("congratulation");

  // Calculate statistics
  const stats = updateStatistics();

  // Create statistics container
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  // Create and populate statistics elements
  const statsHTML = `
    <div class="stat-item">
      <h3>Correct Answers</h3>
      <p>${stats.correctAnswers}</p>
    </div>
    <div class="stat-item">
      <h3>Incorrect Answers</h3>
      <p>${stats.incorrectAnswers}</p>
    </div>
    <div class="stat-item">
      <h3>Accuracy</h3>
      <p>${stats.accuracy}</p>
    </div>
  `;

  statsContainer.innerHTML = statsHTML;

  document.getElementById("home-btn").style.display = "none";
  questionContainer.style.display = "none";
  resultContainer.style.display = "flex";
  progressBar.style.width = "100%";

  // Clear previous content and add new elements
  resultContainer.innerHTML = "";
  resultContainer.appendChild(congratsElement);
  resultContainer.appendChild(statsContainer);
  resultContainer.appendChild(answersBtn);

  congratulations.textContent = getResultMessage(
    score,
    currentQuestionIndex + 1
  );
}

function getResultMessage(score, totalQuestions) {
  const percentage = (score / totalQuestions) * 100;

  if (percentage === 100) {
    return `🏆 Perfect score, ${userName}! You're a true expert!`;
  } else if (percentage >= 90) {
    return `🌟 Outstanding work, ${userName}! You really know your stuff!`;
  } else if (percentage >= 80) {
    return `👏 Great job, ${userName}! You've got solid knowledge!`;
  } else if (percentage >= 70) {
    return `💪 Good effort, ${userName}! Keep practicing to improve even more!`;
  } else if (percentage >= 50) {
    return `📚 Not bad, ${userName}! With some more study, you'll do even better!`;
  } else {
    return `🎯 Keep learning, ${userName}! Every attempt makes you stronger!`;
  }
}

//Show correct answers
answersBtn.addEventListener("click", () => {
  //Display Home Button and Feedback Button - set Position to Top of Viewport
  document.getElementById("home-btn").style.display = "flex";
  document.getElementById("home-btn").style.position = "absolute";
  document.getElementById("home-btn").style.top = "0%";

  //Hide Result Container and Progress Bar
  progressBarContainer.style.display = "none";
  answersContainer.style.display = "grid";
  resultContainer.style.display = "none";

  // Display all questions at once
  questions.forEach((currentQuestion, index) => {
    //Render the amount of questions the user selected
    if (renderedQuestion < amountQuestions) {
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

      // Append Question Container to the Answers container
      answersContainer.appendChild(questionContainer);

      renderedQuestion++;
    } else {
      return;
    }
  });
});
