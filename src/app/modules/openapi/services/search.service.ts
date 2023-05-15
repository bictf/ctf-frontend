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
export class SearchService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation search
   */
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
  search$Response(params: {

    /**
     * The search regex
     */
    text: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, SearchService.SearchPath, 'get');
    if (params) {
      rb.query('text', params.text, {});
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
   * search api.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `search$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search(params: {

    /**
     * The search regex
     */
    text: string;
  },
  context?: HttpContext

): Observable<any> {

    return this.search$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
