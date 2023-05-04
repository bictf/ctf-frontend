import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../modules/openapi/services';
import { LoginResponseFromServer } from 'src/app/apiObjects/LoginResponseFromServer';
import { WordleAnswerComponent } from '../wordle-answer/wordle-answer.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  username: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {}

  login() {
    this.loginService
      .login({ username: this.username, password: this.password })
      .subscribe(
        (result) => this.showWordle(result),
        (error) =>
          this.snackBar.open(error.error, '', {
            duration: 3000,
            panelClass: 'error-snack-bar',
          })
      );
  }

  showWordle({ success, passwordDiff }: LoginResponseFromServer) {
    console.log(success);
    console.log(passwordDiff);

    this.snackBar.openFromComponent(WordleAnswerComponent,
      {data: passwordDiff}
    );
  }

  loginWithGoogle() {
    this.snackBar.open(
      'Who the hell is trying to login with Google in isolated network?!🤦‍♂️',
      '',
      { duration: 3000 }
    );
  }
}
