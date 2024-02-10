import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-open-question-captcha',
  standalone: true,
  imports: [],
  templateUrl: './open-question-captcha.component.html',
  styleUrl: './open-question-captcha.component.scss'
})
export class OpenQuestionCaptchaComponent {
  question: string = ""
  image?: string
  options: string[] = []
  correctAnswer: string = ""
  currentAnswer: string = ""

  constructor(private dialogRef: MatDialogRef<OpenQuestionCaptchaComponent>, @Inject(MAT_DIALOG_DATA) public data: {question: string, image: any, options: any, correctAnswer: string}) {
    this.question = data.question
    this.image = data.image
    this.correctAnswer = data.correctAnswer
  }

  updateAnswer(answer: string) {
    this.currentAnswer = answer
  }

  checkAnswer() {
    this.dialogRef.close(this.currentAnswer == this.correctAnswer);
  }
}
