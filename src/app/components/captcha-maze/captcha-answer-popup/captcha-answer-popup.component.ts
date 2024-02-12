import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-captcha-answer-popup',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatInputModule, CommonModule],
  templateUrl: './captcha-answer-popup.component.html',
  styleUrl: './captcha-answer-popup.component.scss'
})
export class CaptchaAnswerPopupComponent {
  message = ""
  buttonTitle = ""
  time = 0

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string, buttonTitle: string, time: number}) {
    this.message = data.message
    this.buttonTitle = data.buttonTitle
    this.time = data.time
    this.timer()
  }

  timer() {
    const timer = setInterval(() => {
      if (this.time <= 0) {
        clearInterval(timer);
      } else {
        this.time--;
      }
    }, 1000);
  }
}
