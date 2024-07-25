import {Component} from '@angular/core';
import {PasswordInputComponent} from '../password-input/password-input.component';
import {PasswordGameService} from 'src/app/modules/openapi/services';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {NgForOf} from "@angular/common";
import {RuleBoxComponent} from "../rule-box/rule-box.component";
import {PasswordLevelData} from "../PasswordLevelData";

@Component({
  selector: 'app-password-game',
  standalone: true,
  imports: [PasswordInputComponent, NgForOf, RuleBoxComponent],
  templateUrl: './password-game.component.html',
  styleUrl: './password-game.component.scss'
})
export class PasswordGameComponent {
  // TODO Sort this by failed first
  currentRules: Array<PasswordLevelData> = []
  currentRuleId = 0
  buttonText: string = "SUBMIT";

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private passwordGameApiService: PasswordGameService) {
    this.checkAnswer("")
  }

  checkAnswer(answer: string) {
    console.log(answer)
    let levels = this.currentRules.length == 0 ? 1 : this.currentRules.filter((it) => (it.isCorrect)).length + 1;
    this.passwordGameApiService.solve({password: answer, levels: levels}).subscribe(
      (result) => {
        console.log(result)
        this.currentRules = result.map((item) => {
          return new PasswordLevelData(item.description, item.isCorrect)
        }) as PasswordLevelData[]
        this.currentRuleId = result.length

        if (this.currentRules.every((it) => {
          return it.isCorrect
        })) {
          this.checkIfFinished(answer)
        }
      },
      (error) => {
        this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
      }
    )
    // TODO: make sure this regenerates screen
  }

  getIdentity(index: number) {
    return index
  }

  private checkIfFinished(answer: string) {
    this.passwordGameApiService.doesSolveAll({password: answer}).subscribe(
      (result) => {
        if (result) {
          this.buttonText = "DOWNLOAD!!!!!!!!!"
        } else {
          this.checkAnswer(answer)
        }
      },
      (error) => {
        this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
      }
    )
  }
}
