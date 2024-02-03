import { Component } from '@angular/core';
import { Captcha } from '../captcha';

@Component({
  selector: 'app-captcha-backend-handler',
  standalone: true,
  imports: [],
  templateUrl: './captcha-backend-handler.component.html',
  styleUrl: './captcha-backend-handler.component.scss'
})
export class CaptchaBackendHandlerComponent {
  captchaList: Captcha[] = []

  constructor() {
    //TODO: get captchas from backend
    //TODO: randomize captcha list
  }
}
