/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { doesUserLoggedIn } from '../fn/does-user-logged-in/does-user-logged-in';
import { DoesUserLoggedIn$Params } from '../fn/does-user-logged-in/does-user-logged-in';

@Injectable({ providedIn: 'root' })
export class DoesUserLoggedInService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `doesUserLoggedIn()` */
  static readonly DoesUserLoggedInPath = '/login/doesUserLoggedIn';

  /**
   * does user logged login api.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `doesUserLoggedIn()` instead.
   *
   * This method doesn't expect any request body.
   */
  doesUserLoggedIn$Response(params: DoesUserLoggedIn$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return doesUserLoggedIn(this.http, this.rootUrl, params, context);
  }

  /**
   * does user logged login api.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `doesUserLoggedIn$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  doesUserLoggedIn(params: DoesUserLoggedIn$Params, context?: HttpContext): Observable<any> {
    return this.doesUserLoggedIn$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
