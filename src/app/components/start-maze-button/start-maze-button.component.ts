import { Component, Input } from '@angular/core';
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
    private router: Router
  ) {}

  openPopup() {
    this.isDialogOpen = true;
  }

  goToMaze() {
    this.router.navigate(['maze-level']);
  }
}
