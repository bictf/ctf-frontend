import {Component, ViewChild} from '@angular/core'
import {PasswordInputComponent} from '../password-input/password-input.component'
import {DownloadService, PasswordGameService} from 'src/app/modules/openapi/services'
import {MatSnackBar} from '@angular/material/snack-bar'
import {NgForOf} from "@angular/common"
import {RuleBoxComponent} from "../rule-box/rule-box.component"
import {PasswordLevelData} from "../PasswordLevelData"

@Component({
  selector: 'app-password-game',
  standalone: true,
  imports: [PasswordInputComponent, NgForOf, RuleBoxComponent],
  templateUrl: './password-game.component.html',
  styleUrl: './password-game.component.scss'
})
export class PasswordGameComponent {
  private readonly SUBMIT_TEXT = "SUBMIT"
  private readonly DOWNLOAD_TEXT = "DOWNLOAD!!!!!!!!!"
  protected readonly Array = Array
  private readonly LEVELS_BEFORE_FIRE_INDEXES = [9, 17] // Must be in order!!!

  currentRules: Map<number, PasswordLevelData> = new Map<number, PasswordLevelData>()
  currentRuleId = 0
  buttonText: string = this.SUBMIT_TEXT
  onSubmitCallback = this.checkAnswer

  @ViewChild(PasswordInputComponent) passwordInputComponent!: PasswordInputComponent;
  firesStarted: number = 0

  constructor(private snackBar: MatSnackBar, private passwordGameApiService: PasswordGameService, private downloadFileService: DownloadService) {
  }

  /**
   * Checks the provided answer against the game's rules.
   * @param answer The user's input to be checked.
   */
  checkAnswer(answer: string) {
    console.log(answer)
    let levels = this.currentRules.size === 0 ? 1 : Array.from(this.currentRules.values()).filter(it => it.isCorrect).length + 1
    this.passwordGameApiService.solve({password: answer, levels: levels}).subscribe(
      (result) => {
        console.log(result)
        result.forEach((item, index) => {
          this.currentRules.set(index, new PasswordLevelData(item.description, item.isCorrect))

          // Start fire on predefined levels
          if (index === this.LEVELS_BEFORE_FIRE_INDEXES[this.firesStarted]) {
            this.passwordInputComponent.burnPasswordAndIndicate()

            this.firesStarted++;
          }
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

  /**
   * Checks if the game is finished by verifying all rules.
   * If finished, changes the button text to download and sets the callback to downloadFile.
   * Otherwise, re-checks the answer.
   * @param answer The user's input to be checked.
   */
  private checkIfFinished(answer: string) {
    this.passwordGameApiService.doesSolveAll({password: answer}).subscribe(
      (result) => {
        if (result) {
          this.buttonText = this.DOWNLOAD_TEXT
          this.onSubmitCallback = this.downloadFile
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

  /**
   * Returns the rules sorted by their correctness status.
   * Correct rules are placed after incorrect rules.
   */
  getSortedRules() {
    return Array.from(this.currentRules.entries()).sort((first, second) => {
      return first[1].isCorrect ? (second[1].isCorrect ? 0 : 1) : -1
    })
  }

  /**
   * Downloads a file after solving all levels of the password game.
   * The file is named "TobSecretFile.zip".
   * If the download fails, reverts the button text and callback and re-checks the answer.
   * @param password The password used to download the file.
   */
  downloadFile(password: string) {
    this.downloadFileService.downloadBinaryFile({password: password, fileName: "Tob Secret File"})
      .subscribe((data) => {
          const blob = new File([data], "TobSecretFile.zib", {type: 'application/zip'})

          // Create a link element
          const link = document.createElement('a')
          const url = window.URL.createObjectURL(blob)
          link.href = url
          link.download = 'TobSecretFile.zip'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        },
        async error => {
          this.snackBar.open(await (error.error as Blob).text(), '', {duration: 3000, panelClass: 'error-snack-bar'})

          this.buttonText = this.SUBMIT_TEXT
          this.onSubmitCallback = this.checkAnswer
          this.checkAnswer(password)
        })

  }
}
