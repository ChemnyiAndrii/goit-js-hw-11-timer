import './styles.css';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);
    this.targetDate = targetDate;
    this.refs = {
      daysValue: this.selector.querySelector('span[data-value="days"]'),
      hoursValue: this.selector.querySelector('span[data-value="hours"]'),
      minsValue: this.selector.querySelector('span[data-value="mins"]'),
      secsValue: this.selector.querySelector('span[data-value="secs"]'),
    };
  }

  startTimer() {
    const timerId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = this.targetDate.getTime() - startTime;

      const days = pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
      const hours = pad(
        Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );
      const mins = pad(
        Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60)),
      );
      const secs = pad(Math.floor((deltaTime % (1000 * 60)) / 1000));

      this.refs.daysValue.textContent = days;
      this.refs.hoursValue.textContent = hours;
      this.refs.minsValue.textContent = mins;
      this.refs.secsValue.textContent = secs;

      if (deltaTime < 0) {
        clearInterval(timerId);
        this.selector.innerHTML = 'EXPIRED';
      }
    }, 1000);
  }
}
function pad(value) {
  return String(value).padStart(2, '0');
}
const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('January 31, 2021'),
});

timer.startTimer();
