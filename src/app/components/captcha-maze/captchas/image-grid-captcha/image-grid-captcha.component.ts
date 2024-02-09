import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-image-grid-captcha',
  standalone: true,
  imports: [],
  templateUrl: './image-grid-captcha.component.html',
  styleUrl: './image-grid-captcha.component.scss'
})
export class ImageGridCaptchaComponent {
  question: string = ""
  options: string[] = []
  correctAnswer: boolean[] = []
  currentAnswer: boolean[] = []

  constructor(private dialogRef: MatDialogRef<ImageGridCaptchaComponent>, @Inject(MAT_DIALOG_DATA) public data: {question: string, image: any, options: string[], correctAnswer: boolean[]}) {
    this.question = data.question
    this.options = data.options
    this.correctAnswer = data.correctAnswer
    for (let image of this.options){
      this.currentAnswer.push(false)
    }
  }

  clickedImage(imageIndex: any) {
    this.currentAnswer[imageIndex] = !this.currentAnswer[imageIndex]
  }

  checkAnswer() {
    this.dialogRef.close(this.currentAnswer == this.correctAnswer);
  }
}

