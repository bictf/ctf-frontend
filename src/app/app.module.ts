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
import { LoginFormComponent } from './components/login-form/login-form.component';
import { WordleAnswerComponent } from './components/wordle-answer/wordle-answer.component';
import { DataScreenComponent } from './screens/data-screen/data-screen.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { AdminScreenComponent } from './src/app/screens/admin-screen/admin-screen.component';

const appRoutes: Routes = [
  { path: 'gooloog', component: DataScreenComponent },
  { path: 'login', component: LoginScreenComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
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
    AdminScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
