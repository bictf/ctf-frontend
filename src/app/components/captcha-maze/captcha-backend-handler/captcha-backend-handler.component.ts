import { Component } from '@angular/core';
import { Captcha } from '../captcha';
import { ApiService, CaptchaPicturesByNameService } from 'src/app/modules/openapi/services';
import { OpenQuestionCaptchaComponent } from '../captchas/open-question-captcha/open-question-captcha.component';
import { CaptchaPicturesService } from 'src/app/modules/openapi/services/captcha-pictures.service';
import { GetAllChoiceCaptchaQuestions$Params } from 'src/app/modules/openapi/fn/captcha-questions/get-all-choice-captcha-questions';
import { CaptchaQuestionsService } from 'src/app/modules/openapi/services/captcha-questions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AmericanQuestionCaptchaComponent } from '../captchas/american-question-captcha/american-question-captcha.component';
import { ImageGridCaptchaComponent } from '../captchas/image-grid-captcha/image-grid-captcha.component';

@Component({
  selector: 'app-captcha-backend-handler',
  standalone: true,
  imports: [],
  templateUrl: './captcha-backend-handler.component.html',
  styleUrl: './captcha-backend-handler.component.scss'
})
export class CaptchaBackendHandlerComponent {
  captchaList: Captcha[] = []

  constructor(private snackBar: MatSnackBar, private captchaPictureService: CaptchaPicturesService, private captchaQuestionService: CaptchaQuestionsService, private captchaPicturesByNameService: CaptchaPicturesByNameService) {
    this.getImageGridCaptchas()
    this.getMultipleAnswerQuestionCaptchas()
    this.getOpenQuestionCaptchas()
  }

  shuffleCaptchaList(captchaList: Captcha[]) {
    const listLength = captchaList.length
    for (let i=0; i < listLength; i++) {
      let index = Math.floor(Math.random() * (listLength - 1))
      let temp = captchaList[index]
      captchaList[index] = captchaList[i]
      captchaList[i] = temp 
    }
    return captchaList
  }

  getOpenQuestionCaptchas(){
    this.captchaQuestionService.getAllOpenCaptchaQuestions().subscribe(
      (result) => {
        for (let question of result){
          let captchaData = {question: "הזינו את המילה המופיעה בתמונה על מנת להוכיח שאינכם ציוניים", image: question.title, options: null, correctAnswer: question.answer}
          this.captchaList.push(new Captcha(captchaData, OpenQuestionCaptchaComponent))
        }
      },
      (error) => this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
    )
  }

  getMultipleAnswerQuestionCaptchas(){
    this.captchaQuestionService.getAllOpenCaptchaQuestions().subscribe(
      (result) => {
        for (let question of result){
          let captchaData = {question: question.title, image: null, options: question.answers, correctAnswer: question.correctAnswer}
          this.captchaList.push(new Captcha(captchaData, AmericanQuestionCaptchaComponent))
        }
      },
      (error) => this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
    )
  }

  getImageGridCaptchas(){
    this.captchaPictureService.getSomePictures().subscribe(
      (result) => {
        for (let i = 0; i < result.length - 9 ; i++) {
          let captchaData = {question: "סמנו את התמונות בהם מופיעים מפקדי הצבא הציוני", image: null, options: [result[i], result[i+1], result[i+2], result[i+3], result[i+4], result[i+5], result[6], result[i+7], result[i+8]], correctAnswer: null}
          this.captchaList.push(new Captcha(captchaData, ImageGridCaptchaComponent))
        }
      }
    )
    // TODO: get image grid captchas
  }
}
