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
  title: string = ""
  images: string[] = []
  correctAnswer: boolean[] = []
  currentAnswer: boolean[] = []

  constructor(private dialogRef: MatDialogRef<ImageGridCaptchaComponent>, @Inject(MAT_DIALOG_DATA) public data: {title: string, images: string[], correctAnswer: boolean[]}) {
    this.title = data.title
    this.images = data.images
    this.correctAnswer = data.correctAnswer
    for (let image of this.images){
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

