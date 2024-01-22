/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { mazeLevel } from '../fn/maze-level/maze-level';
import { mazeLevel_1 } from '../fn/maze-level/maze-level-1';
import { MazeLevel_1$Params } from '../fn/maze-level/maze-level-1';
import { MazeLevel$Params } from '../fn/maze-level/maze-level';

@Injectable({ providedIn: 'root' })
export class MazeLevelService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `mazeLevel()` */
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
  mazeLevel$Response(params: MazeLevel$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return mazeLevel(this.http, this.rootUrl, params, context);
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
  mazeLevel(params: MazeLevel$Params, context?: HttpContext): Observable<any> {
    return this.mazeLevel$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `mazeLevel_1()` */
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
  mazeLevel_1$Response(params: MazeLevel_1$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return mazeLevel_1(this.http, this.rootUrl, params, context);
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
  mazeLevel_1(params: MazeLevel_1$Params, context?: HttpContext): Observable<any> {
    return this.mazeLevel_1$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
