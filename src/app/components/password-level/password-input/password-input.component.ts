import { Component, Input } from '@angular/core';
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

  //TODO: update answer and send to password-game
  checkAnswer() {
    console.log("pretend this works")
  }
}
