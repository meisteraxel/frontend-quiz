const startBtn = document.getElementById("start-btn");
const welcome = document.getElementById("welcome");
const questionOne = document.getElementById("question-one");
const questionTwo = document.getElementById("question-two");
const questionThree = document.getElementById("question-three");
const questionFour = document.getElementById("question-four");

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


