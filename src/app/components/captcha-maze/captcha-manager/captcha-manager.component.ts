import { Component, Input } from '@angular/core';
import {MatDialogConfig, MatDialog} from '@angular/material/dialog';
import { CaptchaAnswerPopupComponent } from '../captcha-answer-popup/captcha-answer-popup.component';
import { CaptchaConsts } from '../captcha-consts';
import { Captcha } from '../captcha';
import { CanSkipCaptchaService } from "../../../modules/openapi/services/can-skip-captcha.service";

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
  currentSleep = 5;


  constructor(private dialog: MatDialog, private canContinueService: CanSkipCaptchaService) {}

  openCaptcha() {
    if (this.currentCaptcha?.captchaComponent) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      if (this.currentCaptcha?.captchaData) {
        dialogConfig.data = this.currentCaptcha.captchaData;
      }

      const dialogRef = this.dialog.open(this.currentCaptcha.captchaComponent, dialogConfig);
      dialogRef.disableClose = true;

      dialogRef.afterClosed().subscribe(
          result => this.handleResult(result)
      );
    }
  }

  openCorrectAnswerPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    let randomMessageIndex = Math.floor(Math.random() * CaptchaConsts.CORRECT_ANSWER_MESSAGE.length)
    let message = CaptchaConsts.CORRECT_ANSWER_MESSAGE[randomMessageIndex]
    dialogConfig.data = {message: message, buttonTitle: "המשך", time: 0};

    const dialogRef = this.dialog.open(CaptchaAnswerPopupComponent, dialogConfig);
    dialogRef.disableClose = true;
  }

  openWrongAnswerPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    let randomMessageIndex = Math.floor(Math.random() * CaptchaConsts.WRONG_ANSWER_MESSAGES.length)
    let message = CaptchaConsts.WRONG_ANSWER_MESSAGES[randomMessageIndex]
    dialogConfig.data = {message: message, buttonTitle: "נסו שוב", time: this.currentSleep};

    this.currentSleep += 10;
    const dialogRef = this.dialog.open(CaptchaAnswerPopupComponent, dialogConfig);
    dialogRef.disableClose = true;
  }

  handleResult(result: boolean){
    if (result){
      this.openCorrectAnswerPopup()
      this.getNextCaptcha()
    } else {
      this.openWrongAnswerPopup()
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
