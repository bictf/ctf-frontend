import { Injectable } from '@angular/core';
import { Captcha } from '../components/captcha-maze/captcha';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CaptchaConsts } from '../components/captcha-maze/captcha-consts';
import { CaptchaAnswerPopupComponent } from '../components/captcha-maze/captcha-answer-popup/captcha-answer-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaptchaApiService } from './captcha-api.service';

/**
 * Currently this service maintains API compatibilty with the CaptchaManager component. 
 * The Optional parameters in the functions below are used to override the default funcitonality expceted from it.
 * Currently the service is not used in place of its predecessor and is currently waiting for approval from our frontend masters.
 * If you decide to remove the API compatibility support, please make sure to remove these heinous adaptations. 
 */
@Injectable({
  providedIn: 'root'
})
export class CaptchaHandlerService {

  captchaList: Captcha[] = [];
  currentCaptchaIndex = 0;
  currentCaptcha?: Captcha;
  // Sleep configuration
  currentSleep = 5;
  MIN_SLEEP_DURATION: number = 5;
  MAX_SLEEP_DURATION: number = 60;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private captchaApi: CaptchaApiService) { }

  ngOnInit() {
    this.captchaList = this.captchaApi.captchaList;
    this.currentCaptcha = this.captchaList[0]
    this.currentCaptchaIndex += 1
  }

  /**
   * 
   * @param onSuccessCallback The functionality to execute after passing the CAPTCHA test. DEafaults to opening more captchas.
   * @param shouldContinueAfterFailing Whether upon failure of a CAPTCHA, to continue opening more iwndows until success.
   */
  openCaptcha(onSuccessCallback: Function = () => {
    this.getNextCaptcha()
    this.openCaptcha(onSuccessCallback, shouldContinueAfterFailing)
  }, shouldContinueAfterFailing: boolean = true) {
    if (this.captchaList.length == 0) {
      this.captchaList = this.captchaApi.captchaList
      this.currentCaptchaIndex = 0
    } else {
      if (this.currentCaptchaIndex < this.captchaList.length) {
        this.currentCaptchaIndex += 1
      } else {
        this.currentCaptchaIndex = 1
      }
    }
    this.currentCaptcha = this.captchaList[this.currentCaptchaIndex]

    if (this.currentCaptcha?.captchaComponent) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      if (this.currentCaptcha?.captchaData) {
        dialogConfig.data = this.currentCaptcha.captchaData;
      }

      const dialogRef = this.dialog.open(this.currentCaptcha.captchaComponent, dialogConfig);
      dialogRef.disableClose = true;

      dialogRef.afterClosed().subscribe(
        result => this.handleResult(result, onSuccessCallback, shouldContinueAfterFailing)
      );
    }
  }

  openCorrectAnswerPopup(onSuccessCallback: Function) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    let randomMessageIndex = Math.floor(Math.random() * CaptchaConsts.CORRECT_ANSWER_MESSAGE.length)
    let message = CaptchaConsts.CORRECT_ANSWER_MESSAGE[randomMessageIndex]
    dialogConfig.data = { message: message, buttonTitle: "המשך", time: 0 };

    this.currentSleep = Math.max(this.MIN_SLEEP_DURATION, this.currentSleep - 10)

    const dialogRef = this.dialog.open(CaptchaAnswerPopupComponent, dialogConfig);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      result => onSuccessCallback()
    )
  }

  openWrongAnswerPopup(shouldContinueAfterFailing: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    let randomMessageIndex = Math.floor(Math.random() * CaptchaConsts.WRONG_ANSWER_MESSAGES.length)
    let message = CaptchaConsts.WRONG_ANSWER_MESSAGES[randomMessageIndex]
    dialogConfig.data = { message: message, buttonTitle: "נסו שוב", time: this.currentSleep };

    this.currentSleep = Math.min(this.MAX_SLEEP_DURATION, this.currentSleep + 10)

    const dialogRef = this.dialog.open(CaptchaAnswerPopupComponent, dialogConfig);
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(
      result => { if (shouldContinueAfterFailing) { this.openCaptcha() } }
    )
  }

  handleResult(result: boolean, onSuccessCallback: Function, shouldContinueAfterFailing: boolean) {
    if (result) {
      this.openCorrectAnswerPopup(onSuccessCallback)
    } else {
      this.openWrongAnswerPopup(shouldContinueAfterFailing)
    }
  }

  getNextCaptcha() {
    if (this.currentCaptchaIndex < this.captchaList.length) {
      this.currentCaptcha = this.captchaList[this.currentCaptchaIndex]
      this.currentCaptchaIndex += 1
    } else {
      this.currentCaptchaIndex = 0
      this.currentCaptcha = this.captchaList[this.currentCaptchaIndex]
      this.currentCaptchaIndex += 1
    }
  }
}
