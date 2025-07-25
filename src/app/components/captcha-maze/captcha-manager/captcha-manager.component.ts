import { Component, Input } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CaptchaAnswerPopupComponent } from '../captcha-answer-popup/captcha-answer-popup.component';
import { CaptchaConsts } from '../captcha-consts';
import { Captcha } from '../captcha';
import { CanSkipCaptchaService } from "../../../modules/openapi/services/can-skip-captcha.service";
import { Router } from '@angular/router';

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
  // Sleep configuration
  currentSleep = 5;
  MIN_SLEEP_DURATION : number = 5;
  MAX_SLEEP_DURATION : number = 60;

  constructor(private router: Router, private dialog: MatDialog, private canContinueService: CanSkipCaptchaService) {
  }

  ngOnInit() {
    this.currentCaptcha = this.captchaList[0]
    this.currentCaptchaIndex += 1
    this.checkApiContinue().then(r => {
      this.openCaptcha();
    })
  }

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

    this.currentSleep = Math.max(this.MIN_SLEEP_DURATION, this.currentSleep - 10)

    const dialogRef = this.dialog.open(CaptchaAnswerPopupComponent, dialogConfig);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      result => {
        this.getNextCaptcha()
        this.openCaptcha()
      }
    )
  }

  openWrongAnswerPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    let randomMessageIndex = Math.floor(Math.random() * CaptchaConsts.WRONG_ANSWER_MESSAGES.length)
    let message = CaptchaConsts.WRONG_ANSWER_MESSAGES[randomMessageIndex]
    dialogConfig.data = {message: message, buttonTitle: "נסו שוב", time: this.currentSleep};

    this.currentSleep = Math.min(this.MAX_SLEEP_DURATION, this.currentSleep + 10)

    const dialogRef = this.dialog.open(CaptchaAnswerPopupComponent, dialogConfig);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      result => this.openCaptcha()
    )
  }

  handleResult(result: boolean) {
    if (!this.canContinue) {
      if (result) {
        this.openCorrectAnswerPopup()
      } else {
        this.openWrongAnswerPopup()
      }
    } else {
      this.gotoDownload();
    }
  }

  getNextCaptcha() {
    this.checkApiContinue().then(r => {
      if (!this.canContinue) {
        if (this.currentCaptchaIndex < this.captchaList.length) {
          this.currentCaptcha = this.captchaList[this.currentCaptchaIndex]
          this.currentCaptchaIndex += 1
        } else {
          this.currentCaptchaIndex = 0
          this.currentCaptcha = this.captchaList[this.currentCaptchaIndex]
          this.currentCaptchaIndex += 1
        }
      } else {
        this.gotoDownload()
      }
    })
  }

  private gotoDownload() {
    this.router.navigate(['download-top-secret-file-which-they-cant-guess-the-uri-for-because-we-are-the-best']);
  }

  private async checkApiContinue() {
    this.canContinueService.canSkipCaptcha().subscribe(
      (canContinue: boolean) => {
        this.canContinue = canContinue;

      })
  }
}
