import { Component } from '@angular/core';
import { CaptchaIsBlockedService } from 'src/app/modules/openapi/services';

@Component({
  selector: 'app-commander-question',
  templateUrl: './commander-question.component.html',
  styleUrl: './commander-question.component.scss'
})
export class CommanderQuestionComponent {
  canContinue: boolean = false;

constructor(private isBlockedService: CaptchaIsBlockedService) {
}

//TODO - ask backend for question and answers

  question: String = 'Commander Question';
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
