// Referencje
const startEl = document.querySelector(`button[data-start]`);
const stopEl = document.querySelector(`button[data-stop]`);
const bodyEl = document.querySelector('body');
// funckja podająca losową liczbę dla koloru
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;

startEl.addEventListener('click', () => {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startEl.disabled = true;
  stopEl.disabled = false;
});

stopEl.addEventListener('click', () => {
  clearInterval(timerId);
  stopEl.disabled = true;
  startEl.disabled = false;
});

