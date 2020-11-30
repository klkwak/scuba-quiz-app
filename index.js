"use strict";

const QUESTIONCHOICES = [
  {
    question:
      "An object that does not float OR sink in water can be considered:",
    choices: [
      "Neutrally buoyant",
      "Negatively buoyant",
      "Positively buoyant",
      "Partially buoyant",
    ],
    correct: 0,
  },
  {
    question: "Most diver injuries caused by aquatic animals happen because:",
    choices: [
      "The animal considers you as prey",
      "The animal has an aggressive nature",
      "The animal is protecting itself from you",
      "Your shampoo/conditioner attracts them",
    ],
    correct: 2,
  },
  {
    question:
      "Decompression sickness (DCS) is a potentially fatal condition that all divers" +
      " should remain aware of. Which substance causes DCS when it forms in a diver’s" +
      " bloodstream and tissues?",
    choices: [
      "Poisons",
      "Hydrogen bubbles",
      "Bodily waste",
      "Nitrogen bubbles",
    ],
    correct: 3,
  },
  {
    question:
      "You enter the water off the coast of California and notice a mild current. How should" +
      " you begin your dive?",
    choices: [
      "Swimming into/against the current ",
      "Swimming across the current, letting it push you sideways",
      "Swimming with the current, letting it push you",
      "None of the above",
    ],
    correct: 0,
  },
  {
    question:
      "Some items underwater may appear ______ as compared to their appearance on the surface.",
    choices: [
      "Smaller and distant",
      "Smaller and closer",
      "Larger and distant",
      "Larger and closer",
    ],
    correct: 3,
  },
  {
    question: "Which water entry method is considered acceptable for divers?",
    choices: [
      "Wading entry; walk into the ocean backwards from the shore",
      "Giant-stride; stand on the edge of the boat/platform and take a huge step into the water",
      "Back roll; do a backwards somersault off the boat/platform into the water",
      "All of the above",
    ],
    correct: 3,
  },
  {
    question:
      "You run out of oxygen underwater and urgently need to ascend to the surface." +
      " What is the most important thing to remember as you proceed?",
    choices: [
      "Take out your regulator and close your mouth so water doesn’t get in",
      "Look down and hold your breath as you ascend rapidly",
      "Swim up slowly while looking up and gently exhaling",
      "Ignore other divers and focus on yourself first",
    ],
    correct: 1,
  },
  {
    question: "What is the main use of a dive knife?",
    choices: [
      "Self defense against aggressive animals",
      "Helping to untangle yourself/other divers from fishing lines",
      "Fending off pirates",
      "Collecting samples of coral reefs and other aquatic life",
    ],
    correct: 1,
  },
];

function renderStartPage() {
  console.log("renderStartPage ran");
  $(".js-page-display").html(`
        <h2>Welcome, aspiring divers!</h2>
        <p>This short quiz will test your knowledge about scuba diving whether\
         you're a novice just testing the waters, or an expert looking to\ 
         brush up on your skills.</p>
        <button class="js-start-button">Dive in!</button>
    `);
}

let index = 0;
let questionsProgress = 0;
let questionsCorrect = 0;
let questionsIncorrect = 0;
let questionsLength = 7;

function renderQuestionPage() {
  $(".js-page-display").on("click", ".js-start-button", function (event) {
    console.log("renderQuestionPage ran");
    let currentQuestion = QUESTIONCHOICES[index];
    if (index <= questionsLength) {
      $(".js-page-display").html(`
              <h2>${currentQuestion.question}</h2>
              <form>
                <div class="choices-box">
                  <div>
                    <label id="container" for="choice1">
                      <input id="choice1"
                        type="radio"
                        name="choices"
                        value="0"
                        checked>${currentQuestion.choices[0]}
                    </label>
                  </div>
                  <div>
                    <label id="container" for="choice2">
                      <input id="choice2"
                          type="radio"
                          name="choices"
                          value="1">${currentQuestion.choices[1]}
                    </label>
                  </div>
                  <div>
                    <label id="container" for="choice3">
                      <input id="choice3"
                        type="radio"
                        name="choices"
                        value="2">${currentQuestion.choices[2]}
                    </label>
                  </div>
                  <div>
                    <label id="container" for="choice4">
                      <input id="choice4"
                        type="radio"
                        name="choices"
                        value="3">${currentQuestion.choices[3]}
                    </label>
                  </div>
                </div>
                <br>
                <button class="js-submit-button">Submit</button>
              </form>
          `);
      questionsProgress++;
      $(".js-questions-progress").html(`${questionsProgress}`);
    } else if (index > questionsLength) {
      renderFinalPage();
      restartQuiz();
    }
  });
}

function renderFeedbackPage() {
  console.log("renderFeedbackPage ran");
  $(".js-page-display").on("click", ".js-submit-button", function (event) {
    const correctChoice = QUESTIONCHOICES[index].correct;
    const selectedChoice = $("input[name='choices']:checked").val();
    if (selectedChoice == correctChoice) {
      $(".js-page-display").html(
        `<h2>Correct!</h2>
        <button class="js-start-button">Next Question</button>`
      );
      questionsCorrect++;
      $(".js-questions-correct").html(`${questionsCorrect}`);
    } else if (selectedChoice !== correctChoice) {
      $(".js-page-display").html(
        `<h2>Sorry, wrong answer!</h2>
        <p>The correct answer was\
        "${QUESTIONCHOICES[index].choices[correctChoice]}"</p>
        <button class="js-start-button">Next Question</button>`
      );
      questionsIncorrect++;
      $(".js-questions-incorrect").html(`${questionsIncorrect}`);
    }
    index++;
  });
}

function renderFinalPage() {
  console.log("renderFinalPage ran");
  $(".js-page-display").html(`
    <h2>Congratulations, you're done!</h2>
    <h3>You got ${questionsCorrect}/10 questions correct.</h3>
    <p>No matter your skill level, it's always important to review the facts on dry land\
     so you're better prepared underwater. See you beneath the waves!</p>
    <button class="js-restart-button">Start Over</button>
  `);
}

function restartQuiz() {
  console.log("restartQuiz ran");
  $(".js-page-display").on("click", ".js-restart-button", function (event) {
    location.reload();
  });
}

function handleQuizApp() {
  console.log("handleQuizApp ran");
  renderStartPage();
  renderQuestionPage();
  renderFeedbackPage();
}

$(handleQuizApp);
