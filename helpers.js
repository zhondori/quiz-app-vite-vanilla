export const getDOMElements = () => {
  return {
    textElement: document.querySelector(".quiz-text"),
    nextBtn: document.querySelector(".next-btn"),
    variantButtons: document.querySelectorAll(".quiz-variants > button"),
    counter: document.querySelector(".counter")
  };
};
