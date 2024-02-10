import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-captcha-answer-popup',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './captcha-answer-popup.component.html',
  styleUrl: './captcha-answer-popup.component.scss'
})
export class CaptchaAnswerPopupComponent {
  message = "hi";
  buttonTitle = "Button";
}
