import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CaptchaManagerComponent } from '../captcha-maze/captcha-manager/captcha-manager.component';
import { CaptchaBackendHandlerComponent } from '../captcha-maze/captcha-backend-handler/captcha-backend-handler.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CaptchaPicturesService, CaptchaQuestionsService } from 'src/app/modules/openapi/services';
import { CaptchaHandlerService } from 'src/app/services/captcha-handler.service';
import { CaptchaApiService } from 'src/app/services/captcha-api.service';

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
    this.captchaHandler.openCaptcha(()=>{this.clickedEvent.emit()})
  }
}
