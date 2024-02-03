import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { LoginScreenComponent } from './screens/login-screen/login-screen.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { WordleAnswerComponent } from './components/wordle-answer/wordle-answer.component';
import { DataScreenComponent } from './screens/data-screen/data-screen.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { AccessDeniedScreenComponent } from './screens/access-denied-screen/access-denied-screen.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { DownloadBinaryFileButtonComponent } from './components/download-binary-file-button/download-binary-file-button.component';
import { MadeByLableComponent } from './components/made-by-lable/made-by-lable.component';
import { TimerComponent } from './components/timer/timer.component';
import { MazeLevelComponent } from './screens/maze-level/maze-level.component';
import { AnswerPasswordDialogComponent } from './components/answer-password-dialog/answer-password-dialog.component';
import { LootScreenComponent } from './screens/loot-screen/loot-screen.component';
import { StartMazeButtonComponent } from './components/start-maze-button/start-maze-button.component';
import { TrashScreenComponent } from './screens/trash-screen/trash-screen.component';
import { GoToMazeDialogComponent } from './components/go-to-maze-dialog/go-to-maze-dialog.component';
import { AmericanQuestionComponent } from './components/american-question/american-question.component';
import { CommanderQuestionComponent } from './components/captcha-maze/commander-question/commander-question.component';
import { MultipleChoiceAnswerComponent } from './components/multiple-choice-answer/multiple-choice-answer.component';
import { BabyCommandersQuestionComponent } from './components/captcha-maze/baby-commanders-question/baby-commanders-question.component';

const appRoutes: Routes = [
  { path: 'gooloog', component: DataScreenComponent },
  { path: 'login', component: LoginScreenComponent },
  { path: 'maze-level', component: MazeLevelComponent },
  {
    path: 'maze-level/biss-matzov-genesis-is-the-best',
    component: LootScreenComponent,
  },
  {
    path: 'maze-level/dead-end',
    component: TrashScreenComponent,
  },
  { path: 'maze-level/:levelId', component: MazeLevelComponent },
  { path: 'access-denied', component: AccessDeniedScreenComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    InputFieldComponent,
    LoginFormComponent,
    WordleAnswerComponent,
    DataScreenComponent,
    SearchFormComponent,
    AccessDeniedScreenComponent,
    AccessDeniedComponent,
    DownloadBinaryFileButtonComponent,
    MadeByLableComponent,
    TimerComponent,
    MazeLevelComponent,
    AnswerPasswordDialogComponent,
    LootScreenComponent,
    StartMazeButtonComponent,
    TrashScreenComponent,
    GoToMazeDialogComponent,
    AmericanQuestionComponent,
    CommanderQuestionComponent,
    MultipleChoiceAnswerComponent,
    BabyCommandersQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTabsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
