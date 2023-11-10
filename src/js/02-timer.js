import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const spanDay = document.querySelector('[data-days]');
const spanHour = document.querySelector('[data-hours]');
const spanMin = document.querySelector('[data-minutes]');
const spanSecond = document.querySelector('[data-seconds]');
const buttonStart = document.querySelector('[data-start]');
const dataInput = document.querySelector('#datetime-picker');

buttonStart.addEventListener("click", handleClick);

let timerId = null;

let data = "";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    data = selectedDates[0]
    console.log("data", data);
  },
  onClose(selectedDates) {
    const selected = selectedDates[0].getTime();
    const now = Date.now();
    const delta = selected - now;
    if (delta < 0) {
      // return;
      buttonStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      buttonStart.disabled = false;
      const converted = convertMs(delta);
      // console.log(convertMs(delta));
      renderDate(converted);
    }

  }
};

const selected = flatpickr(dataInput, options);
const selectedDate = selected.selectedDates[0].getTime();

function handleClick() {
  console.log("data", data);
  timerId = setInterval(() => {
    const now = Date.now();
    const delta = data.getTime() - now;
    if (delta < 0) {
      return;
    }
    const converted = convertMs(delta);
    renderDate(converted);
  }, 1000);
};

function renderDate(date) {
  const { days, hours, minutes, seconds } = date;
  spanDay.textContent = addLeadingZero(days);
  spanHour.textContent = addLeadingZero(hours);
  spanMin.textContent = addLeadingZero(minutes);
  spanSecond.textContent = addLeadingZero(seconds);
};

function addLeadingZero(value) {
  // console.log("value", value);
  return String(value).padStart(2, 0);
};

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
};

