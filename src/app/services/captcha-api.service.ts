import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaptchaPicturesService, CaptchaQuestionsService } from '../modules/openapi/services';
import { Captcha } from '../components/captcha-maze/captcha';
import { OpenQuestionCaptchaComponent } from '../components/captcha-maze/captchas/open-question-captcha/open-question-captcha.component';
import { AmericanQuestionCaptchaComponent } from '../components/captcha-maze/captchas/american-question-captcha/american-question-captcha.component';
import { SingleImageGridCaptchaComponent } from '../single-image-grid-captcha/single-image-grid-captcha.component';

/**
 * Service for retrieving CAPTCHA data and creating pop ups for them. 
 */
@Injectable({
  providedIn: 'root'
})
export class CaptchaApiService {

  captchaList: Captcha[] = []
  hasInitialized: Boolean = false;

  constructor(private snackBar: MatSnackBar, private captchaPictureService: CaptchaPicturesService, private captchaQuestionService: CaptchaQuestionsService) {
    this.initializeCaptchaList()
  }

  /**
   * Retrieves all the CAPTCHAs from the API and creates a shuffled list from them
   *  to be accessed by users of this service.
   */
  async initializeCaptchaList() {
    await this.getMultipleAnswerQuestionCaptchas()
    await this.getOpenQuestionCaptchas()
    await this.getTextRecognitionCaptchas()

    this.captchaList = this._shuffleCaptchaList(this.captchaList)
    this.hasInitialized = true
  }

  /**
   * Creates a new list based on the existing, with a randomized order.
   * @param captchaList A list of Captcha objects to shuffle
   * @returns A shuffled list of Captcha objects
   */
  _shuffleCaptchaList(captchaList: Captcha[]): Captcha[] {
    const listLength = captchaList.length
    const shuffledList: Captcha[] = []
    while (captchaList.length != 0) {
      let index = Math.floor(Math.random() * (listLength - 1))
      const newCaptcha = captchaList[index]
      captchaList.splice(index, 1)
      if (newCaptcha !== undefined) {
        shuffledList.push(newCaptcha)
      }
    }
    return shuffledList
  }

  async getOpenQuestionCaptchas() {
    return new Promise<void>((resolve, reject) => {
      this.captchaQuestionService.getAllOpenCaptchaQuestions().subscribe(
        (result) => {
          for (let question of result) {
            let captchaData = { question: question.title, image: question.image, options: null, correctAnswer: question.answer.toString() }
            this.captchaList.push(new Captcha(captchaData, OpenQuestionCaptchaComponent))
          }
          resolve()
        },
        (error) => {
          this.snackBar.open(error.error, '', { duration: 3000, panelClass: 'error-snack-bar' })
          reject(error)
        }
      )
    })
  }

  async getTextRecognitionCaptchas() {
    return new Promise<void>((resolve, reject) => {
      this.captchaQuestionService.getTextCaptcha().subscribe(
        (result) => {
          for (let question of result) {
            let captchaData = { question: "הזינו את המילה המופיעה בתמונה על מנת להוכיח שאינכם ציוניים", image: question.encryptedName, options: null, correctAnswer: question.solution }
            this.captchaList.push(new Captcha(captchaData, OpenQuestionCaptchaComponent))
          }
          resolve()
        },
        (error) => {
          this.snackBar.open(error.error, '', { duration: 3000, panelClass: 'error-snack-bar' })
          reject(error)
        }
      )
    })
  }

  getMultipleAnswerQuestionCaptchas() {
    return new Promise<void>((resolve, reject) => {
      this.captchaQuestionService.getAllChoiceCaptchaQuestions().subscribe(
        (result) => {
          for (let question of result) {
            console.log(question)
            let captchaData = { question: question.title, image: null, options: question.answers, correctAnswer: question.correctAnswer }

            let newCaptcha = new Captcha(captchaData, AmericanQuestionCaptchaComponent)
            console.log(newCaptcha)
            this.captchaList.push(newCaptcha)
          }
          resolve()
        },
        (error) => {
          this.snackBar.open(error.error, '', { duration: 3000, panelClass: 'error-snack-bar' })
          reject(error)
        }
      )
    })
  }
}
