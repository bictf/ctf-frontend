import { Component } from '@angular/core';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { PreviousRulesComponent } from '../previous-rules/previous-rules.component';
import { PasswordGameService } from 'src/app/modules/openapi/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DownloadFilePopupComponent } from '../download-file-popup/download-file-popup.component';
import { PasswordGameLevel } from 'src/app/modules/openapi/models';

@Component({
  selector: 'app-password-game',
  standalone: true,
  imports: [PasswordInputComponent, PreviousRulesComponent],
  templateUrl: './password-game.component.html',
  styleUrl: './password-game.component.scss'
})
export class PasswordGameComponent {
  currentRules: Array<PasswordGameLevel> = []
  currentRuleId = 0

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private passwordGameApiService: PasswordGameService) {
    this.checkAnswer("")
  }

  checkAnswer(answer: string) {
    this.passwordGameApiService.solve({ password: answer, levels: this.currentRules.length }).subscribe(
      (result) => {
        this.currentRules = result
        this.currentRuleId = result.length
        // TODO: make sure this regenerates screen
      },
      (error) => {
        this.snackBar.open(error.error, '', { duration: 3000, panelClass: 'error-snack-bar' })
      }
    )

    this.passwordGameApiService.doesSolveAll({ password: answer }).subscribe(
      (result) => {
        if (result) {
          this.openDownloadFilePopup(answer)
        }
      },
      (error) => {
        this.snackBar.open(error.error, '', { duration: 3000, panelClass: 'error-snack-bar' })
      }
    )
  }

  openDownloadFilePopup(answer: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = { password: answer };

    const dialogRef = this.dialog.open(DownloadFilePopupComponent, dialogConfig);
    dialogRef.disableClose = true;
  }
}
