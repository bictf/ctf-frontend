import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { ImageGridCaptchaComponent } from '../image-grid-captcha/image-grid-captcha.component';
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
  question: string = ""
  image: string = ""
  correctAnswer: boolean[] = []
  currentAnswer: boolean[] = []
  options = [1,2,3,4,5,6,7,8,9]

  constructor(private dialogRef: MatDialogRef<ImageGridCaptchaComponent>, @Inject(MAT_DIALOG_DATA) public data: {question: string, image: string, options: null, correctAnswer: boolean[]}) {
    this.question = data.question
    this.image = data.image
    this.correctAnswer = data.correctAnswer
    for (let image of this.options){
      this.currentAnswer.push(false)
    }
  }

  clickedImage(imageIndex: any) {
    this.currentAnswer[imageIndex] = !this.currentAnswer[imageIndex]
  }

  checkAnswer() {
    //this.dialogRef.close(this.currentAnswer == this.correctAnswer);
    this.dialogRef.close(true);
  }
}
