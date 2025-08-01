import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AccessDeniedService} from "../../modules/openapi/services/access-denied.service"

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
    this.accessDeniedService.accessDeniedMessageGet().subscribe(
      (result) => {
        this.message = result;
        this.snackBar.open(this.message, '', {
          duration: 3000,
          panelClass: 'error-snack-bar',
        })
      }, (error) => {
        this.message = error.message;
        this.snackBar.open(this.message, '', {
          duration: 3000,
          panelClass: 'error-snack-bar',
        })
      }
    )



  }

}
