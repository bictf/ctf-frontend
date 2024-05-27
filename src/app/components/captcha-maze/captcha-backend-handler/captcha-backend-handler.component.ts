import { Component } from '@angular/core';
import { Captcha } from '../captcha';
import { OpenQuestionCaptchaComponent } from '../captchas/open-question-captcha/open-question-captcha.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AmericanQuestionCaptchaComponent } from '../captchas/american-question-captcha/american-question-captcha.component';
import { SingleImageGridCaptchaComponent } from '../captchas/single-image-grid-captcha/single-image-grid-captcha.component';
import { CaptchaPicturesService } from "../../../modules/openapi/services/captcha-pictures.service";
import { CaptchaQuestionsService } from "../../../modules/openapi/services/captcha-questions.service";
import { CaptchaPicturesByNameService } from "../../../modules/openapi/services/captcha-pictures-by-name.service";

@Component({
  selector: 'app-captcha-backend-handler',
  templateUrl: './captcha-backend-handler.component.html',
  styleUrl: './captcha-backend-handler.component.scss'
})
export class CaptchaBackendHandlerComponent {
  captchaList: Captcha[] = []
  hasInitialized: Boolean = false;

  constructor(private snackBar: MatSnackBar, private captchaPictureService: CaptchaPicturesService, private captchaQuestionService: CaptchaQuestionsService, private captchaPicturesByNameService: CaptchaPicturesByNameService) {
    this.initializeCaptchaList()
  }

  async initializeCaptchaList() {
    // TODO fix the picture fetching and all that.
    await this.getImageGridCaptchas()
    await this.getMultipleAnswerQuestionCaptchas()
    await this.getOpenQuestionCaptchas()
    await this.getTextRecognitionCaptchas()

    this.captchaList = this.shuffleCaptchaList(this.captchaList)
    this.hasInitialized = true
  }

  shuffleCaptchaList(captchaList: Captcha[]) : Captcha[] {
    const listLength = captchaList.length
    const shuffledList: Captcha[] = []
    while (captchaList.length != 0) {
      let index = Math.floor(Math.random() * (listLength - 1))
      const newCaptcha = captchaList[index]
      captchaList.splice(index, 1)
      if (newCaptcha!==undefined) {
        shuffledList.push(newCaptcha)
      }
    }
    return shuffledList
  }

  async getOpenQuestionCaptchas(){
    return new Promise<void>((resolve, reject) => {
      this.captchaQuestionService.getAllOpenCaptchaQuestions().subscribe(
        (result) => {
          for (let question of result){
            let captchaData = {question: question.title, image: question.image, options: null, correctAnswer: question.answer.toString()}
            this.captchaList.push(new Captcha(captchaData, OpenQuestionCaptchaComponent))
          }
          resolve()
        },
        (error) => {
          this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
          reject(error)
        }
      )
    })
  }

  async getTextRecognitionCaptchas(){
    return new Promise<void>((resolve, reject) => {
      this.captchaQuestionService.getTextCaptcha().subscribe(
        (result) => {
          for (let question of result){
            let captchaData = {question: "הזינו את המילה המופיעה בתמונה על מנת להוכיח שאינכם ציוניים", image: question.encryptedName, options: null, correctAnswer: question.solution}
            this.captchaList.push(new Captcha(captchaData, OpenQuestionCaptchaComponent))
          }
          resolve()
        },
        (error) => {
          this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
          reject(error)
        }
      )
    })
  }

  getMultipleAnswerQuestionCaptchas(){
    return new Promise<void>((resolve, reject) => {
      this.captchaQuestionService.getAllChoiceCaptchaQuestions().subscribe(
        (result) => {
          for (let question of result) {
            console.log(question)
            let captchaData = {question: question.title, image: null, options: question.answers, correctAnswer: question.correctAnswer}

            let newCaptcha = new Captcha(captchaData, AmericanQuestionCaptchaComponent)
            console.log(newCaptcha)
            this.captchaList.push(newCaptcha)
          }
          resolve()
        },
        (error) => {
          this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
          reject(error)
        }
      )
    })
  }

  // getImageGridCaptchas(){
  //   return new Promise<void>((resolve, reject) => {
  //     this.captchaPictureService.getSomePictures().subscribe(
  //       (result) => {
  //         for (let i = 0; i < result.length - 9 ; i++) {
  //           let captchaData = {question: "סמנו את התמונות בהם מופיעים מפקדי הצבא הציוני", image: null, options: [result[i], result[i+1], result[i+2], result[i+3], result[i+4], result[i+5], result[6], result[i+7], result[i+8]], correctAnswer: null}
  //           this.captchaList.push(new Captcha(captchaData, ImageGridCaptchaComponent))
  //         }
  //         resolve()
  //       },
  //       (error) => {
  //         this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
  //         reject(error)
  //       }
  //     )
  //   })
  // }

  getImageGridCaptchas(){
    // return new Promise<void>((resolve, reject) => {
    //   this.captchaPictureService.getSomePictures().subscribe(
    //     (result) => {
    //       for (let image of result) {
    //         let captchaData = {question: "סמנו את הריבועים בהם מופיעים מפקדי הצבא הציוני", image: image, options: null, correctAnswer: [0]}
    //         this.captchaList.push(new Captcha(captchaData, SingleImageGridCaptchaComponent))
    //       }
    //       resolve()
    //     },
    //     (error) => {
    //       this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
    //       reject(error)
    //     }
    //   )
    // })
    return;
  }
}
