import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-multiple-choice-answer',
  templateUrl: './multiple-choice-answer.component.html',
  styleUrl: './multiple-choice-answer.component.scss'
})
export class MultipleChoiceAnswerComponent {
  @Input() answerText: String = "";
  @Input() answerIndex: number = 0;
  @Output() answerClicked = new EventEmitter<number>();

  onAnswerClick() {
    this.answerClicked.emit(this.answerIndex);
  }
}
