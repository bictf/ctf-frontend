import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from "@angular/material/button";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatButton,
    MatInput
  ],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent {
  @Input() ruleId?: number
  @Input() rule?: string
  @Output() onSubmit: EventEmitter<string> = new EventEmitter<string>()
  currentAnswer: string = ""

  updateAnswer(answer: string) {
    this.currentAnswer = answer
  }

  checkAnswer() {
    this.onSubmit.emit(this.currentAnswer)
  }
}
