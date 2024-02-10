/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { LoginService } from './services/login.service';
import { DoesUserLoggedInService } from './services/does-user-logged-in.service';
import { DownloadService } from './services/download.service';
import { FlipCaptchaService } from './services/flip-captcha.service';
import { CanSkipCaptchaService } from './services/can-skip-captcha.service';
import { CaptchaQuestionsService } from './services/captcha-questions.service';
import { CaptchaPicturesService } from './services/captcha-pictures.service';
import { CaptchaPicturesByNameService } from './services/captcha-pictures-by-name.service';
import { SearchService } from './services/search.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    LoginService,
    DoesUserLoggedInService,
    DownloadService,
    FlipCaptchaService,
    CanSkipCaptchaService,
    CaptchaQuestionsService,
    CaptchaPicturesService,
    CaptchaPicturesByNameService,
    SearchService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor(
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
