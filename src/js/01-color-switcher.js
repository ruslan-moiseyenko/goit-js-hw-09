
const buttonsRef = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
}
let timeOutID = null;


buttonsRef.start.addEventListener('click', onStartClick);
buttonsRef.stop.addEventListener('click', onStopClick);
buttonsRef.stop.disabled = true;

function onStartClick() {
  const { start, stop } = buttonsRef;
  // if (timeOutID !== null) {
  //   console.log(timeOutID);
  //   return;
  // }
  start.disabled = true;
  stop.disabled = false;
  timeOutID = setInterval(changeColor, 1000);
}

function onStopClick() {
  const { start, stop } = buttonsRef;
  clearInterval(timeOutID);
  timeOutID = null;
  start.disabled = false;
  stop.disabled = true;

}

function changeColor() {
  document.querySelector('body').style.background = getRandomHexColor();

}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}