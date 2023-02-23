//All questions for the quiz
let allQuestions = [
  {
    question: "Дали Крис оди на кафе само Памела кога не е во Англија?",
    answer: "Многу нормално",
    options: ["Не", "Понекогаш", "Малку", "Многу нормално"],
  },
  {
    question: "Дали Ицката сака мажи?",
    answer: "Многу",
    options: ["Не", "Да", "Малку", "Многу"],
  },
  {
    question: "Дали Зоки му уплаќа спортска на други од Македонија?",
    answer: "Секогаш",
    options: [
      "Понекогаш",
      "Никогаш",
      "Секогаш",
      "По некој пат",
    ],
  },
  {
    question: "Колку пари кошта колата на Мартин?",
    answer: "Една Бала Пари",
    options: [
      "500 Фунти",
      "Една Бала Пари",
      "1000 Фунти",
      "Не кошта ништо",
    ],
  },
  {
    question: "Дали Стеван оди на секс забава секоја вечер?",
    answer: "Само на сон",
    options: ["Понекогаш", "Никогаш", "Само на сон", "Често"],
  },
  {
    question: "Какви банани сака Сашко?",
    answer: "Не сака банани",
    options: ["Зелени", "Жолти", "Не сака банани", "Со дамки"],
  },
   {
    question: "Колку често е нервозен Стојанчо во текот на денот?",
    answer: "Цело време е нервозен",
    options: ["Малку", "Многу", "Цело време е нервозен", "Воопшто не е нервозен"],
  },
  {
    question: "Кој спрат од куќата во Македонија му е препишана на Ненад?",
    answer: "Горниот спрат",
    options: ["Долниот спрат", "Подрумот", "Горниот Спрат", "Го оставија без куќа човекот"],
  },
];
// declared variables
var score = 0;
var questionIndex = 0;
var timer = document.querySelector("#timer");
var startButton = document.querySelector("#start-button");
var questions = document.querySelector("#questions");
var container = document.querySelector("#container");
//Holders for the timer and penalty 
var secondsLeft = 100;
var holdInterval = 0;
var penalty = 15;

var createUl = document.createElement("ul");
//Event listener for the start button to start the quiz and the timer
startButton.addEventListener("click", function () {
  if (holdInterval === 0) {
    holdInterval = setInterval(function () {
      secondsLeft--;
      timer.textContent = "Време: " + secondsLeft;

      if (secondsLeft <= 0) {
        clearInterval(holdInterval);
        finish();
        timer.textContent = "Времето истече!";
      }
    }, 1000);
  }
  render(questionIndex);
});
//This will render the questions and choices to the page
function render() {
  questions.innerHTML = "";
  createUl.innerHTML = "";
  for (var i = 0; i < allQuestions.length; i++) {
    var showQuestion = allQuestions[questionIndex].question;
    var userChoices = allQuestions[questionIndex].options;
    questions.textContent = showQuestion;
  }
//New forEach for the questions choises
  userChoices.forEach(function (item) {
    var listItem = document.createElement("li");
    listItem.textContent = item;
    questions.append(createUl);
    createUl.append(listItem);
    listItem.addEventListener("click", compareAnswer);
  });
}
//This function will compare the choices with the right answer
function compareAnswer(event) {
  var element = event.target;
  if (element.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");
    if (element.textContent == allQuestions[questionIndex].answer) {
      score++;
      createDiv.textContent = "Точен Одговор Човеќе!";
      setTimeout(() => {
        createDiv.textContent = "";
      }, 3000);
    } else {
      secondsLeft = secondsLeft - penalty;
      createDiv.textContent = "Грешка оди мани си бомба!";
      setTimeout(() => {
        createDiv.textContent = "";
      }, 3000);
    }
  }
  questionIndex++;
  if (questionIndex >= allQuestions.length) {
    finish();
    var endDiv = document.createElement('div');
    endDiv.setAttribute("id", "endDiv");
		endDiv.textContent =
      "Крај на квизот" +
      " " +
      "Твојот резлутат е " +
      score +
      "/" +
      allQuestions.length +
      " Точни одговори!";
      questions.append(endDiv);
  } else {
    render(questionIndex);
  }
  questions.append(createDiv);
}
//This will append the final page to enter initials and to submit your score
function finish() {
  questions.innerHTML = "";
  timer.innerHTML = "";

  // Create Heading:
  var createHeader = document.createElement("h1");
  createHeader.setAttribute("id", "createH1");
  createHeader.textContent = "Крај на квизот за шофериштата од Ковентри!";

  questions.append(createHeader);
  // Create Paragraph
  var createParagraph = document.createElement("p");
  createParagraph.setAttribute("id", "createP");
  questions.append(createParagraph);

  if (secondsLeft >= 0) {
    var timeRemaining = secondsLeft;
    var createParagraph = document.createElement("p");
    clearInterval(holdInterval);
    createParagraph.textContent = "Твоето време е: " + timeRemaining;

    questions.append(createParagraph);
  }
  // Create input for initials
  var createLabel = document.createElement("label");
  createLabel.setAttribute("id", "create-label");
  createLabel.textContent = "Напиши си ги твоите иницијали: ";
  questions.append(createLabel);

  // Create input for initials
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";

  questions.append(createInput);

  // Create submit nutton
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "submit");
  createSubmit.textContent = "Потврди";

  questions.append(createSubmit);

  // Event listener to capture initials and local storage for initials and score
  createSubmit.addEventListener("click", function () {
    var typedInitials = createInput.value;
    var correctQuestions = (score + "/" + allQuestions.length);

    if (typedInitials === "") {
      alert("Напиши ги твоите иницијали");
    } else {
      var scores = {
        initials: typedInitials,
        score: timeRemaining,
        final: correctQuestions,

      };
      var finalScores = localStorage.getItem("allScores");
      if (finalScores === null) {
        finalScores = [];
      } else {
        finalScores = JSON.parse(finalScores);
      }
      finalScores.push(scores);
      var newScore = JSON.stringify(finalScores);
      localStorage.setItem("finalScores", newScore);
      // This will take you to the high-score.html
      window.location.replace("https://datahaed.github.io/-/assets/high-score.html");
    }
  });
}
