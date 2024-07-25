export class Timer {
  private timerId: number | null = null;
  private timeLeft;

  constructor(
    private totalTime = 60000,
    private interval = 1000,
    private onTick?: (timeLeft: number) => void,
    private onFinish?: () => void
  ) {
    this.timeLeft = totalTime;
  }

  start() {
    if (this.timerId != null) return;

    this.timerId = setInterval(() => {
      this.timeLeft -= this.interval;
      if (this.timeLeft < 0) {
        this.onFinish?.();
        return this.stop();
      }
      this.onTick?.(this.timeLeft);
    }, this.interval);
  }

  stop() {
    if (this.timerId == null) return;

    clearInterval(this.timerId);
    this.timerId = null;
  }

  reset() {
    this.stop();
    this.timeLeft = this.totalTime;
  }
}
