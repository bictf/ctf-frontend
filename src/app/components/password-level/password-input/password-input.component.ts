import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss'
})
export class PasswordInputComponent {
  @Input() ruleId?: number
  @Input() rule?: String

  //TODO: update answer and send to password-game
}
