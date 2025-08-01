import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AccessDeniedService} from "../../modules/openapi/services/access-denied.service"
import {finalize} from "rxjs";

@Component({
  selector: 'app-access-denied-screen',
  templateUrl: './access-denied-screen.component.html',
  styleUrls: ['./access-denied-screen.component.scss']
})
export class AccessDeniedScreenComponent implements OnInit {

  message: string = ''

  constructor(
    private accessDeniedService: AccessDeniedService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.accessDeniedService.accessDeniedMessageGet().pipe(
      finalize(() => {
        this.openSnackBar(this.message);
      })
    ).subscribe(
      (result) => {
        this.message = result;
      }, (error) => {
        this.message = error.message;
      }
    )
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 3000,
      panelClass: 'error-snack-bar',
    })
  }
}
