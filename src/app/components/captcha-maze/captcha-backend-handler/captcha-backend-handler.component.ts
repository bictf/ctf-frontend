import { Component } from '@angular/core';
import { Captcha } from '../captcha';
import { ChoiceQuestionData } from "../../../modules/openapi/models/choice-question-data";
import {CaptchaQuestionsService} from "../../../modules/openapi/services/captcha-questions.service";

@Component({
  selector: 'app-captcha-backend-handler',
  templateUrl: './captcha-backend-handler.component.html',
  standalone: true
})
export class CaptchaBackendHandlerComponent {
  captchaList: Captcha[] = []

  constructor(captchaQuestionsService: CaptchaQuestionsService) {
    let questionDataList: ChoiceQuestionData[] = [];
    captchaQuestionsService.getAllChoiceCaptchaQuestions().subscribe((receivedData: Array<any>) => {
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
