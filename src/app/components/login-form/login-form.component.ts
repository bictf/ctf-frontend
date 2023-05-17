import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../modules/openapi/services';
import { LoginResponseFromServer } from 'src/app/apiObjects/LoginResponseFromServer';
import { WordleAnswerComponent } from '../wordle-answer/wordle-answer.component';
import { Router } from '@angular/router';

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
    private snackBar: MatSnackBar,
    private router: Router
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
    if (success) {
      this.router.navigate(['/gooloog']);
    } else {
      this.snackBar.openFromComponent(WordleAnswerComponent, {
        data: passwordDiff,
        duration: 5000
      });
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
