import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.4.min.css";

const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);

  });
}

formRef.addEventListener('submit', onButtonClick);

function onButtonClick(e) {
  e.preventDefault();
  const { elements: { delay, step, amount } } = e.currentTarget;


  let dly = Number(delay.value);
  let stp = Number(step.value);
  let amt = Number(amount.value);
  console.log(dly, stp, amt);

  for (let i = 1; i <= amt; i++) {
    createPromise(i, dly)
      .then(({ position, delay }) => {
        console.log(`delay is: ${delay}`)
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`delay is: ${delay}`)
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    console.log(i);
    dly += stp;
  }
}
