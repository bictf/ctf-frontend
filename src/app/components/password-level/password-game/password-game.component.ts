import { Component } from '@angular/core';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { PreviousRulesComponent } from '../previous-rules/previous-rules.component';
import { ApiService } from 'src/app/modules/openapi/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-game',
  standalone: true,
  imports: [PasswordInputComponent, PreviousRulesComponent],
  templateUrl: './password-game.component.html',
  styleUrl: './password-game.component.scss'
})
export class PasswordGameComponent {
  currentRules: any[] = []

  constructor(private snackBar: MatSnackBar, private passwordGameApiService: ApiService){
    this.checkAnswer("")
  }

  checkAnswer(answer: string){
    this.passwordGameApiService.passwordGameSolveGet({ password: answer, levels: this.currentRules.length }).subscribe(
      (result) => {
        this.currentRules = result
        // TODO: make sure this regenerates screen
      },
      (error) => {
        this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
      }
    )

    this.passwordGameApiService.passwordGameDoesSolveAllGet({ password: answer }).subscribe(
      (result) => {
        if (result) {
          // TODO: redirect to download page with password?
        }
      },
      (error) => {
        this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
      }
    )
  }
}
