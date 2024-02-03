import { Component } from '@angular/core';
import { CaptchaIsBlockedService } from 'src/app/modules/openapi/services';

@Component({
  selector: 'app-baby-commanders-question',
  templateUrl: './baby-commanders-question.component.html',
  styleUrl: './baby-commanders-question.component.scss'
})
export class BabyCommandersQuestionComponent {
  canContinue: boolean = false;

constructor(private isBlockedService: CaptchaIsBlockedService) {
}

//TODO - ask backend for question and answers

  babyImage: any = "";
  answers = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4']
  correctAnswerIndex: number = 1;

  handleAnswerClicked(correct: boolean) {
    this.isBlockedService.captchaIsBlockedGet().subscribe(
      (isBlocked: boolean) => {
        this.canContinue = !isBlocked;
        console.log(this.canContinue)
      }
    )
  }
}
