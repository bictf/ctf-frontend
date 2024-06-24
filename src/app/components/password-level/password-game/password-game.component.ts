import { Component } from '@angular/core';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { PreviousRulesComponent } from '../previous-rules/previous-rules.component';

@Component({
  selector: 'app-password-game',
  standalone: true,
  imports: [PasswordInputComponent, PreviousRulesComponent],
  templateUrl: './password-game.component.html',
  styleUrl: './password-game.component.scss'
})
export class PasswordGameComponent {
  // TODO: get all rules and generate components, redo on every password input
}
