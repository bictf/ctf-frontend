/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { search } from '../fn/search/search';
import { Search$Params } from '../fn/search/search';

@Injectable({ providedIn: 'root' })
export class SearchService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `search()` */
  static readonly SearchPath = '/search';

  /**
   * search api.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search()` instead.
   *
   * This method doesn't expect any request body.
   */
  search$Response(params: Search$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return search(this.http, this.rootUrl, params, context);
  }

  /**
   * search api.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `search$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search(params: Search$Params, context?: HttpContext): Observable<any> {
    return this.search$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
