import {Component, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {WordleAnswerComponent} from '../wordle-answer/wordle-answer.component';
import {CookieService} from 'ngx-cookie-service';
import {getUuid} from 'src/app/services/uuidService';
import {TimerComponent} from '../timer/timer.component';
import {LoginService} from "../../modules/openapi/services/login.service";
import {StageNavigatorService} from "../../services/stage-navigator.service";
import {LoginResponseToUser} from "../../modules/openapi/models/login-response-to-user";
import {LoginCtfStage} from "../../modules/openapi/models/login-ctf-stage";
import {CtfStage, SignalGraph, WordleCharState} from "../../modules/openapi/models";
import {SignalChartComponent} from "../signal-chart/signal-chart.component";
import {DuduImagesComponent} from "../dudu-images/dudu-images.component";

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
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private stageNavigator: StageNavigatorService,) {
    this.cookieService.delete('user');
  }

  setCookie(cookie: string) {
    this.cookieService.set('user', cookie);
  }

  login() {
    if (this.password.length == 0) {
      this.snackBar.open("Password cannot be empty!", '', {
        duration: 3000,
        panelClass: 'error-snack-bar',
      })
      return
    }
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
                    cookie,
                    loginType,
                    passwordData,
                    success,
                  }: LoginResponseToUser) {
    if (success) {
      this.setCookie(cookie);
      this.stageNavigator.routeToNextStage(getUuid());
    } else {
      this.userLoginStage(loginType, passwordData);
    }
  }

  //TODO - make this more solid, maybe make a service. Leaving it like this because of time
  userLoginStage(loginType: LoginCtfStage, passwordData: any) {
    switch (loginType) {
      case CtfStage.LoginWordle:
        this.wordleLogin(passwordData.wordleDiff, passwordData.time);
        break;

      case CtfStage.LoginSignalChart:
        this.signalChartLogin(passwordData.signalGraphs, passwordData.passwordParts);
        break;

      case CtfStage.LoginDockerImages:
        this.dockerImagesLogin();
        break;

      default:
        this.snackBar.open("All them zionists tryna cyber me...", '', {
          duration: 3000,
          panelClass: 'error-snack-bar',
        })
    }
  }

  private wordleLogin(passwordDiff: Array<WordleCharState>, time: number) {
    this.snackBar.openFromComponent(WordleAnswerComponent, {
      data: passwordDiff,
      duration: 5000,
    });

    if (!this.timer.timerStarted) {
      this.timer.startTimer(time);
    }
  }

  private signalChartLogin(signalGraphs: SignalGraph[], passwordParts: String[]) {
    this.snackBar.openFromComponent(SignalChartComponent, {
      data: {
        signalChart: signalGraphs,
        passwordParts: passwordParts
      },
      duration: 100000,
    });
  }

  private dockerImagesLogin() {
    this.snackBar.openFromComponent(DuduImagesComponent, {
      data: {
        count: 6
      },
      duration: 5000
    })
  }

  loginWithGoogle() {
    this.snackBar.open(
      'Who the hell is trying to login with Google in an isolated network?!🤦‍♂️',
      '',
      {duration: 3000}
    );
  }

  onKeyUp() {
    (document.getElementById("loginButton")?.children[0] as HTMLElement)?.click()
  }
}
