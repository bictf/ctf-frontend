import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CaptchaHandlerService } from 'src/app/services/captcha-handler.service';

@Component({
  selector: 'app-captcha-button',
  standalone: true,
  imports: [],
  templateUrl: './captcha-button.component.html',
  styleUrl: './captcha-button.component.scss'
})
export class CaptchaButtonComponent {
  @Output() clickedEvent = new EventEmitter<void>();
  @Input() innerButtonClass: String = "";

  constructor(private captchaHandler: CaptchaHandlerService, private cookieService: CookieService) {
  }

  raiseCaptcha() {
    if (this.cookieService.get("captcha") == "false") {
      this.captchaHandler.openCaptcha(() => {
        this.cookieService.set("captcha", "true")
        this.clickedEvent.emit()
      })
    } else {
      this.clickedEvent.emit()
    }
  }
}
