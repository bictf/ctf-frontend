import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-start-maze-button',
  templateUrl: './start-maze-button.component.html',
  styleUrls: ['./start-maze-button.component.scss'],
})
export class StartMazeButtonComponent {
  @Input() title = '';
  isDialogOpen = false;

  hasAccessToDownload = false;

  constructor(
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    var trueInIncryptedHex =
      'FksGBwQZCwwEFlZbSQgYARIZDAoBT0VTVggYJAkEGhpDUREfHBYJ';
    var cookie = cookieService.get('user') || '';
    this.hasAccessToDownload = cookie.match(trueInIncryptedHex) != null;
  }

  openPopup() {
    if (this.hasAccessToDownload) {
      this.isDialogOpen = true;
    } else {
      this.snackBar.open('only admin users can download files', '', {
        duration: 3000,
      });
    }
  }

  goToMaze() {
    this.router.navigate(['maze-level']);
  }
}
