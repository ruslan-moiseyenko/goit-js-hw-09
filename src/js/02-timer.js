import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.4.min.css";


const startButton = document.querySelector('[data-start]');
const countdownRefs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
}

let selectedDate = 0;
let intervalID = null;

const calendar = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    const currentDate = Date.now();

    if ((selectedDate - currentDate) <= 0) {
      startButton.disabled = true;

      Notify.failure('Selected date cannot be in the past', {
        clickToClose: true,
      });
      return;
    }
    startButton.disabled = false;
    clearInterval(intervalID);
    timer.isActive = false;
  },
});


const timer = {
  //intervalID: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    startButton.disabled = true;

    intervalID = setInterval(() => {
      this.isActive = true;

      const currentDate = Date.now();
      const remainedTime = selectedDate - currentDate;

      if (remainedTime <= 0) {
        clearInterval(intervalID);
        return;
      }

      updateCountdownUI(remainedTime);

    }, 1000);
  }

}

function updateCountdownUI(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  // console.log(days, hours, minutes, seconds);

  countdownRefs.days.innerText = addLeadingZero(days);
  countdownRefs.hours.innerText = addLeadingZero(hours);
  countdownRefs.minutes.innerText = addLeadingZero(minutes);
  countdownRefs.seconds.innerText = addLeadingZero(seconds);


}

startButton.addEventListener('click', timer.start.bind(timer));


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}