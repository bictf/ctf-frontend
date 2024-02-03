import { ComponentType } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import {MatDialogConfig, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-captcha-manager',
  standalone: true,
  imports: [],
  templateUrl: './captcha-manager.component.html',
  styleUrl: './captcha-manager.component.scss'
})
export class CaptchaManagerComponent {
  currentCaptcha?: ComponentType<unknown>
  currentData: {question: string, image: any, options: any, correctAnswer: any} = {question: "", image: null, options: null, correctAnswer: null}


  constructor(private dialog: MatDialog) {}

  openCaptcha() {
    if (this.currentCaptcha) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.currentData;

      const dialogRef = this.dialog.open(this.currentCaptcha, dialogConfig);
      dialogRef.afterClosed().subscribe(
          result => this.handleResult(result)
      );    
    }
  }

  handleResult(result: boolean){
    if (result){
      // TODO: open correct anwser dialog
      this.getNextCaptcha()
    } else {
      // TODO: open incorrect answer dialog
    }
    this.openCaptcha()
  }

  getNextCaptcha() {
    // TODO: get random captcha
  }
}
