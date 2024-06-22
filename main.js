import "./style.css";
import quizzes from "./quiz.json";
import { getDOMElements } from "./helpers";

import { showConfetti } from "./confetti";

const MAX_INDEX = quizzes.length - 1;

let currentQuizIndex = 0;
let isSelected = false;

function renderQuiz() {
  const quiz = quizzes[currentQuizIndex];

  const { nextBtn, textElement, variantButtons } = getDOMElements();

  textElement.innerHTML = quiz.question;

  variantButtons.forEach((btn, index) => {
    const { variants } = quiz;

    const variant = variants[index];
    btn.innerText = variant.text;
    btn.dataset.correct = variant.correct;

    btn.addEventListener("click", () => {
      if (isSelected) {
        return;
      }

      if (currentQuizIndex === MAX_INDEX) {
        showConfetti();
      }

      isSelected = true;

      if (variant.correct) {
        btn.classList.add("correct");
      } else {
        btn.classList.add("incorrect");
        const correctBtn = document.querySelector("button[data-correct=true]");
        correctBtn.classList.add("correct");
      }
    });
  });

  nextBtn.addEventListener("click", nextButtonClick);
}

const removeClasses = () => {
  const { variantButtons } = getDOMElements();

  variantButtons.forEach((btn) => {
    btn.classList.remove("correct");
    btn.classList.remove("incorrect");
  });
};

const incrementCounter = () => {
  const { counter } = getDOMElements();

  counter.textContent = currentQuizIndex + 1;
};

const nextButtonClick = () => {
  if (isSelected) {
    if (currentQuizIndex + 1 < 10) {
      currentQuizIndex += 1;
      isSelected = false;
      removeClasses();
      incrementCounter();
      renderQuiz();
    }
  }
};

renderQuiz();
