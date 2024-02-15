import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-open-question-captcha',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatInputModule, CommonModule],
  templateUrl: './open-question-captcha.component.html',
  styleUrl: './open-question-captcha.component.scss'
})
export class OpenQuestionCaptchaComponent {
  question: string = ""
  image?: string
  correctAnswer: string = ""
  currentAnswer: string = ""

  constructor(private dialogRef: MatDialogRef<OpenQuestionCaptchaComponent>, @Inject(MAT_DIALOG_DATA) public data: {question: string, image: any, options: any, correctAnswer: string}) {
    this.question = data.question
    this.image = data.image
    this.correctAnswer = data.correctAnswer
  }

  checkAnswer(answer:string) {
    this.dialogRef.close(answer == this.correctAnswer);
  }
}
