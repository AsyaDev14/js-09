const buttonStart = document.querySelector("button[data-start]");
const buttonStop = document.querySelector("button[data-stop]");
const body = document.querySelector('body');

buttonStart.addEventListener('click', handleStart);
buttonStop.addEventListener('click', handleStop);

let timerId = null;

function handleStart() {
  timerId = setInterval(bgColorSwitch, 1000);
  console.log("timerId", timerId);
  buttonStart.disabled = true;
};

function handleStop() {
  clearInterval(timerId)
  buttonStart.disabled = false;
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

function bgColorSwitch() {
  body.style.backgroundColor = getRandomHexColor();
};
