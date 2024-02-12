import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-captchas-button',
  standalone: true,
  imports: [],
  templateUrl: './start-captchas-button.component.html',
  styleUrl: './start-captchas-button.component.scss'
})
export class StartCaptchasButtonComponent {
  isDialogOpen = false;
  
  hasAccessToDownload = false;

  constructor(
    private router: Router
  ) {}

  openPopup() {
    this.isDialogOpen = true;
  }

  goToCaptchas() {
    this.router.navigate(['captcha-level']);
  }
}
