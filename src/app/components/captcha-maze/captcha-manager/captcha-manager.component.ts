import { Component, Input } from '@angular/core';
import {MatDialogConfig, MatDialog} from '@angular/material/dialog';
import { CaptchaAnswerPopupComponent } from '../captcha-answer-popup/captcha-answer-popup.component';
import { CaptchaConsts } from '../captcha-consts';
import { Captcha } from '../captcha';
import { CanSkipCaptchaService } from 'src/app/modules/openapi/services';

@Component({
  selector: 'app-captcha-manager',
  templateUrl: './captcha-manager.component.html',
  styleUrl: './captcha-manager.component.scss'
})
export class CaptchaManagerComponent {
  @Input() captchaList: Captcha[] = [];
  currentCaptchaIndex = 0;
  currentCaptcha?: Captcha;
  canContinue: boolean = false;


  constructor(private dialog: MatDialog, private canContinueService: CanSkipCaptchaService) {}

  openCaptcha() {
    if (this.currentCaptcha?.captchaComponent) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;

      if (this.currentCaptcha.captchaData) {
        dialogConfig.data = this.currentCaptcha.captchaData;
      }

      const dialogRef = this.dialog.open(this.currentCaptcha.captchaComponent, dialogConfig);
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
    this.canContinueService.canSkipCaptcha().subscribe(
      (canContinue: boolean) => {
        this.canContinue = canContinue;
      })

      if (!this.canContinue) {
        this.currentCaptcha = this.captchaList[this.currentCaptchaIndex++]
      } else {
        //Continue with CTF
      }
  }
}
