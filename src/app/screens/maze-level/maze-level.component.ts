import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MazeLevelService } from 'src/app/modules/openapi/services';
import { getUuid } from 'src/app/services/uuidService';

@Component({
  selector: 'app-maze-level',
  templateUrl: './maze-level.component.html',
  styleUrls: ['./maze-level.component.scss'],
})
export class MazeLevelComponent {
  question = '';
  answers = [];
  passwordPlace = '';

  answer = '';
  isDialogOpen = false;

  constructor(
    private route: ActivatedRoute,
    private mazeLevelService: MazeLevelService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.fetchData();
    route.params.subscribe((val) => {
      this.fetchData();
    });
  }

  fetchData() {
    this.mazeLevelService
      .mazeLevel({ id: this.route.snapshot.params['levelId'] })
      .subscribe(
        ({ question, answers, passwordPlace }) => {
          this.question = question;
          this.answers = answers;
          this.passwordPlace = passwordPlace;
        },
        (error) =>
          this.snackBar.open(error.error, '', {
            duration: 3000,
            panelClass: 'error-snack-bar',
          })
      );
  }

  clickAnswer(answer: string) {
    this.answer = answer;
    this.isDialogOpen = true;
  }

  submitLevel(password: string) {
    this.mazeLevelService
      .mazeLevel_1({
        uuid: getUuid(),
        id: this.route.snapshot.params['levelId'] || '',
        password,
        answer: this.answer,
      })
      .subscribe(
        ({ nextLevelId }) => {
          this.router.navigate(['maze-level', nextLevelId]);
        },
        (error) =>
          this.snackBar.open(error.error, '', {
            duration: 3000,
            panelClass: 'error-snack-bar',
          })
      );
    this.isDialogOpen = false;
    this.answer = '';
  }
}
