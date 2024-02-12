import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-image-grid-captcha',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatInputModule, CommonModule, MatGridListModule],
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
    //this.dialogRef.close(this.currentAnswer == this.correctAnswer);
    this.dialogRef.close(true);
  }
}

