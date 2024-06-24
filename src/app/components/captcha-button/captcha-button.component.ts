import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  constructor(private captchaHandler: CaptchaHandlerService) {
  }

  raiseCaptcha() {
    this.captchaHandler.openCaptcha(() => { this.clickedEvent.emit() })
  }
}
