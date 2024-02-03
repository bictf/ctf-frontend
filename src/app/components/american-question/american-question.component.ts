import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-american-question',
  templateUrl: './american-question.component.html',
  styleUrl: './american-question.component.scss'
})
export class AmericanQuestionComponent {
  @Input() answers = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];
  @Input() correctAnswer: number = 0;

  @Output() onAnswerClicked = new EventEmitter<boolean>;

  handleAnswerClicked(answerIndex: number) {
    if (answerIndex == this.correctAnswer)
    {
      this.onAnswerClicked.emit(true);
    } else {
      this.onAnswerClicked.emit(false);
    }
  }
}
