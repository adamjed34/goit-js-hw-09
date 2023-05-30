import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
// referencje
const datePicker = document.getElementById(`datetime-picker`);
const startBtn = document.querySelector(`[data-start]`);
const daysEl = document.querySelector(`[data-days]`);
const hoursEl = document.querySelector(`[data-hours]`);
const minutesEl = document.querySelector(`[data-minutes]`);
const secondsEl = document.querySelector(`[data-seconds]`);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const today = new Date();
    if (selectedDate < today) {
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 10000,
        position: 'right-top',
        clickToClose: true,
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const fp = flatpickr(datePicker, options);
let counterId;
const displayCountdown = value => {
  clearInterval(counterId);
  const selectedDate = value;
  counterId = setInterval(() => {
    const today = new Date();
    const remainingTime = selectedDate - today;
    if (remainingTime < 0) {
      clearInterval(counterId);
    } else {
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      daysEl.textContent = addLeadingZero(days);
      hoursEl.textContent = addLeadingZero(hours);
      minutesEl.textContent = addLeadingZero(minutes);
      secondsEl.textContent = addLeadingZero(seconds);
    }
  }, 1000);
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
}

const addLeadingZero = value => {
  return value.toString().padStart(2, `0`);
};

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  const selectedDate = new Date(datePicker.value);
  displayCountdown(selectedDate);
});
