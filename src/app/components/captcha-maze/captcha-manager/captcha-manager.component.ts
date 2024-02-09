import { ComponentType } from '@angular/cdk/portal';
import { Component, Input } from '@angular/core';
import {MatDialogConfig, MatDialog} from '@angular/material/dialog';
import { CaptchaAnswerPopupComponent } from '../captcha-answer-popup/captcha-answer-popup.component';
import { CaptchaConsts } from '../captcha-consts';
import { Captcha } from '../captcha';

@Component({
  selector: 'app-captcha-manager',
  standalone: true,
  imports: [],
  templateUrl: './captcha-manager.component.html',
  styleUrl: './captcha-manager.component.scss'
})
export class CaptchaManagerComponent {
  @Input() captchaList: Captcha[] = []
  currentCaptchaIndex = 0
  currentCaptcha?: ComponentType<unknown>
  currentData: {question: string, image: any, options: any, correctAnswer: any} = {question: "", image: null, options: null, correctAnswer: null}


  constructor(private dialog: MatDialog) {}

  openCaptcha() {
    if (this.currentCaptcha) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.currentData;

      const dialogRef = this.dialog.open(this.currentCaptcha, dialogConfig);
      dialogRef.disableClose = true;

      dialogRef.afterClosed().subscribe(
          result => this.handleResult(result)
      );    
    }
  }

  openAnswerPopup(messageList: string[], buttonTitle: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    let randomMessageIndex = Math.floor(Math.random() * messageList.length)
    let message = messageList[randomMessageIndex]
    dialogConfig.data = {message: message, buttonTitle: buttonTitle};

    const dialogRef = this.dialog.open(CaptchaAnswerPopupComponent, dialogConfig);
    dialogRef.disableClose = true;
  }

  handleResult(result: boolean){
    if (result){
      this.openAnswerPopup(CaptchaConsts.CORRECT_ANSWER_MESSAGE, "המשך")
      this.getNextCaptcha()
    } else {
      this.openAnswerPopup(CaptchaConsts.WRONG_ANSWER_MESSAGES, "נסו שוב")
    }
    this.openCaptcha()
  }

  getNextCaptcha() {
    this.currentCaptchaIndex += 1
    let captcha = this.captchaList[this.currentCaptchaIndex]
    this.currentCaptcha = captcha.captchaComponent
    this.currentData = captcha.captchaData
  }
}
