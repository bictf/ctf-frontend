import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {StageService} from "../modules/openapi/services/stage.service";
import {catchError, Observable, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StageRoutingMap} from "../objects/stage-routing-mapping";
import {CtfStage} from "../modules/openapi/models/ctf-stage";

@Injectable({
  providedIn: 'root'
})
/**
 * Service class used to navigate between the CTF stages.
 */
export class StageNavigatorService {

  constructor(private router: Router, private stageService: StageService, private snackBar: MatSnackBar) {
  }

  /**
   * Routes a user to the next stage for it.
   * @param uuid The user's UUID
   */
  routeToNextStage(uuid: string): void {
    this.getNextStage(uuid).subscribe({
      next: (stage) => {
        const route = StageRoutingMap[stage];
        if (route) {
          console.log(route);
          this.router.navigate([route]);
        } else {
          this.snackBar.open(`Damn Zionists always trying to access invalid pages!`, '', {
            duration: 3000,
            panelClass: 'error-snack-bar',
          });
        }
      },
      error: (err) => {
        console.error('Failed to navigate to next stage:', err);
      },
    });
  }

  /**
   * Gets the next CTF stage for a given user from the backend.
   * @param uuid The user to get the next stage for.
   */
  private getNextStage(uuid: string): Observable<CtfStage> {
    return this.stageService.getNextStage(uuid).pipe(
      map(stage => {
        console.log(stage)
        return stage;
      }),
      catchError(error => {
        this.snackBar.open(error.error, '', {duration: 3000, panelClass: 'error-snack-bar'})
        return throwError(() => error);
      })
    );
  }
}
