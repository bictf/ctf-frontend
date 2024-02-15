import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-single-image-grid-captcha',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatInputModule, CommonModule, MatGridListModule],
  templateUrl: './single-image-grid-captcha.component.html',
  styleUrl: './single-image-grid-captcha.component.scss'
})
export class SingleImageGridCaptchaComponent {
  buttons: {label: string, top: string, left: string, active:boolean}[] = [];
  question: string = ""
  image: string = ""
  correctAnswer: boolean[] = []
  currentAnswer: boolean[] = []
  options: number[]= []

  constructor(private dialogRef: MatDialogRef<SingleImageGridCaptchaComponent>, @Inject(MAT_DIALOG_DATA) public data: {question: string, image: string, options: null, correctAnswer: boolean[]}) {
    let counter = 0
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        this.buttons.push({ label: ``, top: `${i * 16.66}%`, left: `${j * 20}%`, active: false});
        this.options.push(counter++)
      }
    }

    this.question = data.question
    this.image = data.image
    this.correctAnswer = data.correctAnswer
    for (let image of this.options){
      this.currentAnswer.push(false)
    }
  }

  toggleButton(button: any): void {
    button.active = !button.active;
  }

  checkAnswer() {
    //this.dialogRef.close(this.currentAnswer == this.correctAnswer);
    this.dialogRef.close(Math.random() < 0.75);
  }
}
