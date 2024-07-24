import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { WordleAnswerComponent } from './components/wordle-answer/wordle-answer.component';
import { DataScreenComponent } from './screens/data-screen/data-screen.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { AccessDeniedScreenComponent } from './screens/access-denied-screen/access-denied-screen.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { DownloadBinaryFileButtonComponent } from './components/download-binary-file-button/download-binary-file-button.component';
import { MadeByLabelComponent } from './components/made-by-label/made-by-lable.component';
import { TimerComponent } from './components/timer/timer.component';
import { AnswerPasswordDialogComponent } from './components/answer-password-dialog/answer-password-dialog.component';
import { LootScreenComponent } from './screens/loot-screen/loot-screen.component';
import { CaptchaManagerComponent } from './components/captcha-maze/captcha-manager/captcha-manager.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CaptchaBackendHandlerComponent } from './components/captcha-maze/captcha-backend-handler/captcha-backend-handler.component';
import { StartCaptchasButtonComponent } from './components/captcha-maze/start-captchas-button/start-captchas-button.component';
import { StartCaptchasDialogComponent } from './components/captcha-maze/start-captchas-dialog/start-captchas-dialog.component';
import { CaptchaButtonComponent } from './components/captcha-button/captcha-button.component';
import { CaptchaHandlerService } from './services/captcha-handler.service';
import { PasswordGameScreenComponent } from './screens/password-game-screen/password-game-screen.component';

const appRoutes: Routes = [
  { path: 'gooloog', component: DataScreenComponent },
  { path: 'login', component: LoginScreenComponent },
  {
    path: 'admin-password-recovery',
    component: PasswordGameScreenComponent
  },
  { path: 'access-denied', component: AccessDeniedScreenComponent },
  { path: 'download-top-secret-file-which-they-cant-guess-the-uri-for-because-we-are-the-best', component: LootScreenComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
    declarations: [
        AppComponent,
        LoginScreenComponent,
        InputFieldComponent,
        WordleAnswerComponent,
        SearchFormComponent,
        AccessDeniedScreenComponent,
        AccessDeniedComponent,
        DownloadBinaryFileButtonComponent,
        MadeByLabelComponent,
        TimerComponent,
        AnswerPasswordDialogComponent,
        LootScreenComponent,
        LoginFormComponent,
        DataScreenComponent,
        CaptchaManagerComponent,
        CaptchaBackendHandlerComponent,
        StartCaptchasButtonComponent,
        StartCaptchasDialogComponent,
    ],
    providers: [
      CaptchaHandlerService,
      MatSnackBar,
      MatDialog
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSnackBarModule,
        MatTabsModule,
        RouterModule.forRoot(appRoutes),
        MatDialogModule,
        CaptchaButtonComponent
    ]
})
export class AppModule {}
