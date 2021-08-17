//* ======== ELEMENT VARIABLES ========
const intro_screen = document.querySelector(".intro-screen");
const start_btn = document.querySelector(".intro-screen button");
const results = document.querySelector(".results");
const quiz_box = document.querySelector(".quiz_box");
const next_btn = document.querySelector("footer .next_btn");
const option_list = document.querySelector(".option_list");
const restart_btn = document.querySelector(".results button");

const points = document.querySelector(".points_numb");
const totalPoints = document.querySelector(".total_points");
const totalTimeTaken = document.querySelector(".total_time");
const time_left = document.querySelector(".timer_sec");

//* ======== QUIZ VARIABLES ========
var checked = false;
var timeleft;
const timeAllowed = 20;
var countdownTimer;
var totalTime;
var que_count;
var que_total = Object.keys(questions).length;
var userScore;
var counter;
var counterLine;
var widthValue;

//* ======== SOUND EFFECTS ========
const success = new Audio("/assets/audio/click-success.wav");
const error = new Audio("/assets/audio/click-error.wav");
const button = new Audio("/assets/audio/click-button.wav");

//* ======== INITIALISE QUIZ ========
resetQuiz();
showQuestions(que_numb);

//* ======== ADD CLICK EVENTS ========
next_btn.onclick = () => {
  button.play();
  que_numb++;
  if (que_numb + 1 <= que_total) {
    showQuestions(que_numb);
  } else {
    showResults();
  }
};

restart_btn.onclick = () => {
  button.play();
  resetQuiz();
  quiz_box.classList.remove("hidden");
  results.classList.add("hidden");
};

start_btn.onclick = () => {
  button.play();
  intro_screen.classList.add("hidden");
  quiz_box.classList.remove("hidden");
  showQuestions(que_numb);
};

//* ======== FUNCTIONS ========
function resetQuiz() {
  timeleft = timeAllowed;
  totalTime = 0;
  que_count = 0;
  que_numb = 0;
  userScore = 0;
  totalTime = 0;
  time_left.innerHTML = timeAllowed;
  showQuestions(que_numb);
  updateScore();

  quiz_box.classList.add("hidden");
  results.classList.add("hidden");
}

function showQuestions(que_numb) {
  next_btn.disabled = true;
  time_left.innerHTML = timeAllowed;
  checked = false;
  const total_que = document.querySelector(".que_total");
  const que_number = document.querySelector(".que_numb");
  const que_text = document.querySelector(".que_text");
  let que_tag = "<span>" + questions[que_numb].question + "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[que_numb].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[que_numb].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[que_numb].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[que_numb].options[3] +
    "</span></div>";

  total_que.innerHTML = que_total;
  que_number.innerHTML = questions[que_numb].numb;
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;

  // Option Selected
  const option = option_list.querySelectorAll(".option");
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "checkAnswer(this)");
  }

  startTimer(timeleft);
}

function checkAnswer(answer) {
  let userAns = answer.textContent;
  let correctAns = questions[que_numb].answer;
  const allOptions = option_list.children.length;
  
  if (checked == false) {
    if (userAns == correctAns) {
      answer.classList.add("correct");
      userScore += 100;
      success.play();
    } else {
      answer.classList.add("incorrect");
      error.play();
    }

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].innerHTML == correctAns) {
        option_list.children[i].classList.add("correct");
      } else {
        option_list.children[i].classList.add("disabled");
      }
    }
  }
  next_btn.disabled = false;
  clearInterval(countdownTimer);
  checked = true;
  updateScore();
  updateTime();
}

function highlightCorrect(que_numb) {
  const allOptions = option_list.children.length;
  let correctAns = questions[que_numb].answer;
  for (i = 0; i < allOptions; i++) {
    if (option_list.children[i].innerText == correctAns) {
      option_list.children[i].classList.add("correct");
    } else {
      option_list.children[i].classList.add("disabled");
    }
  }
  checked = true;
  updateScore();
}

function updateScore() {
  points.innerText = userScore;
}

function startTimer(time) {
  clearInterval(counter);
  counter = setInterval(timer, 1000);
  function timer() {
    time--;
    if (time < 0) {
      clearInterval(counter);
    } else if (time >= 0) {
      time_left.innerHTML = time;
    }
  }
}

function updateTime() {
  clearInterval(counter);
  timeTaken = timeAllowed - parseInt(time_left.innerHTML);
  totalTime += timeTaken;
}

function showResults() {
  quiz_box.classList.add("hidden");
  results.classList.remove("hidden");
  totalTimeTaken.innerHTML = totalTime;
  totalPoints.innerHTML = userScore;
}

