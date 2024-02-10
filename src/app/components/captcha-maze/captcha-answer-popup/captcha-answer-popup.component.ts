import { Component, Inject } from '@angular/core';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-captcha-answer-popup',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './captcha-answer-popup.component.html',
  styleUrl: './captcha-answer-popup.component.scss'
})
export class CaptchaAnswerPopupComponent {
  message = ""
  buttonTitle = ""

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string, buttonTitle: string}) {
    this.message = data.message
    this.buttonTitle = data.buttonTitle
  }
}
