import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { OpenQuestionCaptchaComponent } from '../open-question-captcha/open-question-captcha.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-american-question-captcha',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatInputModule, CommonModule, MatCheckboxModule],
  templateUrl: './american-question-captcha.component.html',
  styleUrl: './american-question-captcha.component.scss'
})
export class AmericanQuestionCaptchaComponent {
  question: string = ""
  image?: string
  options: string[] = []
  correctAnswer: number = 0
  currentAnswer: number = -1

  constructor(private dialogRef: MatDialogRef<OpenQuestionCaptchaComponent>, @Inject(MAT_DIALOG_DATA) public data: {question: string, image: any, options: string[], correctAnswer: number}) {
    this.question = data.question
    this.image = data.image
    this.options = data.options
    this.correctAnswer = data.correctAnswer
  }

  updateAnswer(answer: number) {
    this.currentAnswer = answer
  }

  checkAnswer() {
    this.dialogRef.close(this.currentAnswer == this.correctAnswer);
  }
}
