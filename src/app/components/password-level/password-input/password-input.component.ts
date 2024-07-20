import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent {
  @Input() ruleId?: number
  @Input() rule?: String
  @Output() onSubmit: EventEmitter<String> = new EventEmitter<String>()
  currentAnswer: String = ""

  updateAnswer(answer: String) {
    this.currentAnswer = answer
  }

  checkAnswer() {
    this.onSubmit.emit(this.currentAnswer)
  }
}
