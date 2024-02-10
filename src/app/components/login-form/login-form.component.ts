import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ApiService} from '../../modules/openapi/services';
import { LoginResponseFromServer } from 'src/app/objects/api/LoginResponseFromServer';
import { WordleAnswerComponent } from '../wordle-answer/wordle-answer.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { getUuid } from 'src/app/services/uuidService';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';

  @ViewChild('timer') timer!: TimerComponent;

  constructor(
    private cookieService: CookieService,
    private loginService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient
  ) {
    this.cookieService.delete('user');
  }

  setCookie(cookie: string) {
    this.cookieService.set('user', cookie);
  }

  login() {
    this.loginService
      .login({
        uuid: getUuid(),
        username: this.username,
        password: this.password,
      })
      .subscribe(
        (result) => this.handleUserLogin(result),
        (error) =>
          this.snackBar.open(error.error, '', {
            duration: 3000,
            panelClass: 'error-snack-bar',
          })
      );
  }

  handleUserLogin({
    success,
    passwordDiff,
    cookie,
    time,
  }: LoginResponseFromServer) {
    if (success) {
      this.setCookie(cookie);
      this.router.navigate(['/gooloog']);
    } else {
      this.snackBar.openFromComponent(WordleAnswerComponent, {
        data: passwordDiff,
        duration: 5000,
      });

      if (!this.timer.timerStarted) {
        this.timer.startTimer(time);
      }
    }
  }

  loginWithGoogle() {
    this.snackBar.open(
      'Who the hell is trying to login with Google in isolated network?!🤦‍♂️',
      '',
      { duration: 3000 }
    );
  }
}
