import { Component } from '@angular/core';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { DownloadService , PasswordGameService} from 'src/app/modules/openapi/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForOf } from "@angular/common";
import { RuleBoxComponent } from "../rule-box/rule-box.component";
import { PasswordLevelData } from "../PasswordLevelData";

@Component({
  selector: 'app-password-game',
  standalone: true,
  imports: [PasswordInputComponent, NgForOf, RuleBoxComponent],
  templateUrl: './password-game.component.html',
  styleUrl: './password-game.component.scss'
})
export class PasswordGameComponent {
  private readonly SUBMIT_TEXT = "SUBMIT";
  private readonly DOWNLOAD_TEXT = "DOWNLOAD!!!!!!!!!";
  protected readonly Array = Array;

  currentRules: Map<number, PasswordLevelData> = new Map<number, PasswordLevelData>()
  currentRuleId = 0
  buttonText: string = this.SUBMIT_TEXT;
  onSubmitCallback = this.checkAnswer

  constructor(private snackBar: MatSnackBar, private passwordGameApiService: PasswordGameService, private downloadFileService: DownloadService) {
  }

  checkAnswer(answer: string) {
    console.log(answer)
    let levels = this.currentRules.size == 0 ? 1 : Array.from(this.currentRules.values()).filter(it => (it.isCorrect)).length + 1;
    this.passwordGameApiService.solve({password: answer, levels: levels}).subscribe(
      (result) => {
        console.log(result)
        result.forEach((item, index) => {
          this.currentRules.set(index, new PasswordLevelData(item.description, item.isCorrect))
        })
        this.currentRuleId = result.length

        if (Array.from(this.currentRules.values()).every((it: PasswordLevelData) => it.isCorrect)) {
          this.checkIfFinished(answer)
        }
      },
      (error) => {
        this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
      }
    )
    // TODO: make sure this regenerates screen
  }


  private checkIfFinished(answer: string) {
    this.passwordGameApiService.doesSolveAll({password: answer}).subscribe(
      (result) => {
        if (result) {
          this.buttonText = this.DOWNLOAD_TEXT
          this.onSubmitCallback = this.downloadFile;
        } else {
          this.checkAnswer(answer)
        }
      },
      (error) => {
        if (this.snackBar._openedSnackBarRef === undefined) {
          this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
        }
      }
    )
  }

  getSortedRules() {
    return Array.from(this.currentRules.entries()).sort((first, second) => {
      return first[1].isCorrect ? (second[1].isCorrect ? 0 : 1) : -1
    })
  }

  downloadFile(password: string) {
    this.downloadFileService.downloadBinaryFile({password: password, fileName: "Tob Secret File"})
      .subscribe((data) => {
          const blob = new File([data], "TobSecretFile.zib", {type: 'application/zip'});

          // Create a link element
          const link = document.createElement('a');
          const url = window.URL.createObjectURL(blob);
          link.href = url;
          link.download = 'TobSecretFile.zip';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        },
        async error => {
          this.snackBar.open(await (error.error as Blob).text(), '', {duration: 3000, panelClass: 'error-snack-bar'})

          this.buttonText = this.SUBMIT_TEXT
          this.onSubmitCallback = this.checkAnswer
          this.checkAnswer(password)
        })

  }
}
