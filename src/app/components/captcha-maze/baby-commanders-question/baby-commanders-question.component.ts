import { Component, Inject } from '@angular/core';
import { CaptchaIsBlockedService } from 'src/app/modules/openapi/services';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-baby-commanders-question',
  templateUrl: './baby-commanders-question.component.html',
  styleUrl: './baby-commanders-question.component.scss'
})
export class BabyCommandersQuestionComponent {
  canContinue: boolean = false;

  constructor(private dialogRef: MatDialogRef<OpenQuestionCaptchaComponent>, @Inject(MAT_DIALOG_DATA) public data: {image: any, options: any, correctAnswer: string}) {
    this.babyImage = data.image
    this.correctAnswer = data.correctAnswer
    this.options = data.options
    
    this.correctAnswerIndex = this.options.indexOf(this.correctAnswer);
  }

//TODO - ask backend for question and answers

  babyImage: string = "";
  options: string[] = [];
  correctAnswer: string = "";
  currentAnswer: string = "";

  correctAnswerIndex: number = -1; //TODO - change to const

  handleAnswerClicked(correct: boolean) {
    this.isBlockedService.captchaIsBlockedGet().subscribe(
      (isBlocked: boolean) => {
        this.canContinue = !isBlocked;
        console.log(this.canContinue)
      }
    )
  }
}


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
