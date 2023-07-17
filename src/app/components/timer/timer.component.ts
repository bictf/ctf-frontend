import { Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  timerDisplay: string = ''
  timerStarted = false

  public startTimer(minutes: number) {
    this.timerStarted = true

    let seconds: number = minutes * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    const prefix = minutes < 10 ? '0' : '';

    const timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.timerDisplay = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        console.log('finished');
        clearInterval(timer);

        this.timerDisplay = ""
        this.timerStarted = false
      }
    }, 1000);
  }
}
