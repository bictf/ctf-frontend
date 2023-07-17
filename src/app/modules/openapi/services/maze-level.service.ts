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
export class MazeLevelService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation mazeLevel
   */
  static readonly MazeLevelPath = '/maze/level';

  /**
   * maze level api.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mazeLevel()` instead.
   *
   * This method doesn't expect any request body.
   */
  mazeLevel$Response(params: {

    /**
     * the level id
     */
    id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, MazeLevelService.MazeLevelPath, 'get');
    if (params) {
      rb.query('id', params.id, {});
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
   * maze level api.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mazeLevel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mazeLevel(params: {

    /**
     * the level id
     */
    id: string;
  },
  context?: HttpContext

): Observable<any> {

    return this.mazeLevel$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation mazeLevel_1
   */
  static readonly MazeLevel_1Path = '/maze/level';

  /**
   * maze level api.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mazeLevel_1()` instead.
   *
   * This method doesn't expect any request body.
   */
  mazeLevel_1$Response(params: {

    /**
     * the user uuid
     */
    uuid: string;

    /**
     * the level id
     */
    id: string;

    /**
     * the level password
     */
    password: string;

    /**
     * the level answer
     */
    answer: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, MazeLevelService.MazeLevel_1Path, 'post');
    if (params) {
      rb.query('uuid', params.uuid, {});
      rb.query('id', params.id, {});
      rb.query('password', params.password, {});
      rb.query('answer', params.answer, {});
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
   * maze level api.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mazeLevel_1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mazeLevel_1(params: {

    /**
     * the user uuid
     */
    uuid: string;

    /**
     * the level id
     */
    id: string;

    /**
     * the level password
     */
    password: string;

    /**
     * the level answer
     */
    answer: string;
  },
  context?: HttpContext

): Observable<any> {

    return this.mazeLevel_1$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
