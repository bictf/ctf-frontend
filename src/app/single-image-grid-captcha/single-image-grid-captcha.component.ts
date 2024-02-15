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
  buttons = [
    { label: '', top: '10%', left: '10%', active: false },
    { label: '', top: '10%', left: '50%', active: false },
    { label: '', top: '10%', left: '90%', active: false },
    { label: '', top: '50%', left: '10%', active: false },
    { label: '', top: '50%', left: '50%', active: false },
    { label: '', top: '50%', left: '90%', active: false },
    { label: '', top: '90%', left: '10%', active: false },
    { label: '', top: '90%', left: '50%', active: false },
    { label: '', top: '90%', left: '90%', active: false }
  ];
  question: string = ""
  image: string = ""
  correctAnswer: boolean[] = []
  currentAnswer: boolean[] = []
  options = [1,2,3,4,5,6,7,8,9]

  constructor(private dialogRef: MatDialogRef<SingleImageGridCaptchaComponent>, @Inject(MAT_DIALOG_DATA) public data: {question: string, image: string, options: null, correctAnswer: boolean[]}) {
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
    this.dialogRef.close(true);
  }
}
