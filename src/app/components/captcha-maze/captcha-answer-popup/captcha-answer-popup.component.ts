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

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string, buttonTitle: string}) {
    this.message = data.message
    this.buttonTitle = data.buttonTitle
  }
}
