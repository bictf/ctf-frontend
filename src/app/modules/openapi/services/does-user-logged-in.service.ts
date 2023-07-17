/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class DoesUserLoggedInService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation doesUserLoggedIn
   */
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
  doesUserLoggedIn$Response(params: {

    /**
     * the user uuid
     */
    uuid: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, DoesUserLoggedInService.DoesUserLoggedInPath, 'get');
    if (params) {
      rb.query('uuid', params.uuid, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
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
  doesUserLoggedIn(params: {

    /**
     * the user uuid
     */
    uuid: string;
  },
  context?: HttpContext

): Observable<any> {

    return this.doesUserLoggedIn$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
