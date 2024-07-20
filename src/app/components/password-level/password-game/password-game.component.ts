import { Component } from '@angular/core';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { PreviousRulesComponent } from '../previous-rules/previous-rules.component';
import { ApiService } from 'src/app/modules/openapi/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DownloadFilePopupComponent } from '../download-file-popup/download-file-popup.component';

@Component({
  selector: 'app-password-game',
  standalone: true,
  imports: [PasswordInputComponent, PreviousRulesComponent],
  templateUrl: './password-game.component.html',
  styleUrl: './password-game.component.scss'
})
export class PasswordGameComponent {
  currentRules: any[] = []

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private passwordGameApiService: ApiService){
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
          this.openDownloadFilePopup(answer)
        }
      },
      (error) => {
        this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
      }
    )
  }

  openDownloadFilePopup(answer: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {password: answer};

    const dialogRef = this.dialog.open(DownloadFilePopupComponent, dialogConfig);
    dialogRef.disableClose = true;
  }
}
