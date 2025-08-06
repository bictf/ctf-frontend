import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';
import {WordleCharState} from "../../modules/openapi/models/wordle-char-state";

@Component({
  selector: 'app-wordle-answer',
  templateUrl: './wordle-answer.component.html',
  styleUrls: ['./wordle-answer.component.scss'],
})
export class WordleAnswerComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Array<WordleCharState>) {
  }

  protected readonly WordleCharState = WordleCharState;
}
