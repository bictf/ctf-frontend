import { Component } from '@angular/core';
import { Captcha } from '../captcha';
import { QuestionData } from "src/app/modules/openapi/models";
import { CaptchaQuestionsService } from 'src/app/modules/openapi/services';

@Component({
  selector: 'app-captcha-backend-handler',
  templateUrl: './captcha-backend-handler.component.html',
})
export class CaptchaBackendHandlerComponent {
  captchaList: Captcha[] = []

  constructor(captchaQuestionsService: CaptchaQuestionsService) {
    let questionDataList: QuestionData[] = [];
    captchaQuestionsService.getAllCaptchaQuestions().subscribe((receivedData: Array<any>) => {
      questionDataList = receivedData;
    });

    questionDataList.forEach((questionData, index) => {
      this.captchaList[index] = new Captcha(undefined, questionData, undefined, undefined);
    })
    
    this.captchaList = this.shuffleCaptchaList(this.captchaList);
  }

  shuffleCaptchaList(captchaList: Captcha[]) {
    const listLength = captchaList.length
    for (let i=0; i < listLength; i++) {
      let index = Math.floor(Math.random() * (listLength - 1))
      let temp = captchaList[index]
      captchaList[index] = captchaList[i]
      captchaList[i] = temp 
    }

    return captchaList;
  }
}
