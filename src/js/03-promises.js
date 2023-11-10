import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const firstDelay = document.querySelector('[name=delay]');
const delayStep = document.querySelector('[name=step]');
const amountDelay = document.querySelector('[name=amount]');

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;
  // console.log(delay.value, step.value, amount.value);
  let delayValue = Number(delay.value);
  for (let i = 1; i <= amount.value; i += 1){
   
    setTimeout(() => {
      createPromise(i, delayValue)
        .then(({ position, delay }) => {
           Notiflix.Notify.success(
          `✅ Fulfilled promise ${i} in ${delay}ms`
        );
        })
        .catch(({ position, delay }) => {
           Notiflix.Notify.failure(
          `❌ Rejected promise ${i} in ${delay}ms`
        );
        });
    }, delayValue);

    // console.log(delayValue);
    delayValue +=Number(step.value);
  };
};


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
   
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve({position, delay})
    } else {
      // Reject
      reject({position, delay})
    }
  });
}
 