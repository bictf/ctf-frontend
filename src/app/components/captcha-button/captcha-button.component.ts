import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CaptchaHandlerService } from 'src/app/services/captcha-handler.service';
import { Environment } from 'src/environments/environment';

@Component({
  selector: 'app-captcha-button',
  standalone: true,
  imports: [],
  templateUrl: './captcha-button.component.html',
  styleUrl: './captcha-button.component.scss'
})
export class CaptchaButtonComponent {
  @Output() clickedEvent = new EventEmitter<void>();
  @Input() innerButtonClass: string = "";
  @Input()
  pageName!: string;

  constructor(private captchaHandler: CaptchaHandlerService, private cookieService: CookieService) {
  }

  ngOnInit() {
    if (!this.cookieService.check(this.pageName)) {
      this.cookieService.set(this.pageName, "false")
    }
  }

  raiseCaptcha() {
    if ((Environment.captchaPopUp) && (this.cookieService.get(this.pageName) == "false")) {
      this.captchaHandler.openCaptcha(() => {
        this.cookieService.set(this.pageName, "true")
        this.clickedEvent.emit()
      })
    } else {
      this.clickedEvent.emit()
    }
  }
}
