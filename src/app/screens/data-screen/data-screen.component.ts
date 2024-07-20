import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchResponseFromServer } from 'src/app/objects/api/SearchResponseFromServer';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { getUuid } from 'src/app/services/uuidService';
import { SearchService } from "../../modules/openapi/services/search.service";
import { LoginService } from "../../modules/openapi/services/login.service";
import { CaptchaHandlerService } from 'src/app/services/captcha-handler.service';

@Component({
  selector: 'app-data-screen',
  templateUrl: './data-screen.component.html',
  styleUrls: ['./data-screen.component.scss'],
})
export class DataScreenComponent {
  searchText = '';
  totalResults = 0;
  title = '';
  content = '';
  isBinaryFile = false;

  showResultPage = false;

  constructor(
    private searchService: SearchService,
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar,
    private captchaHandler: CaptchaHandlerService
  ) {
    loginService.doesUserLoggedIn({ uuid: getUuid() }).subscribe(
      (result) => (result ? null : this.router.navigate(['/access-denied'])),
      (error) =>
        this.snackBar.open(error.error, '', {
          duration: 3000,
          panelClass: 'error-snack-bar',
        })
    );
  }

  onSearchPressed(searchText: string): void {
    this.searchText = searchText;
    this.captchaHandler.openCaptcha(() => {
      this.searchService.search({ text: searchText }).subscribe(
        (result) => this.showSearchResult(<SearchResponseFromServer>result),
        (error) =>
          this.snackBar.open(error.error, '', {
            duration: 3000,
            panelClass: 'error-snack-bar',
          })
      );
    })
  }

  showSearchResult({
    totalResults,
    title,
    content,
    isBinaryFile,
  }: SearchResponseFromServer): void {
    this.showResultPage = true;

    this.totalResults = totalResults;
    this.title = title;
    this.content = content;
    this.isBinaryFile = isBinaryFile;
  }

  validateAdminUserAccess() {
    this.loginService.isAdminUser().subscribe(
      (result) => (result ? null : this.router.navigate(['/access-denied'])),
      (error) => {
        this.router.navigate(['/access-denied'])
        this.snackBar.open("Only admin users can download secret files!", '', {
          duration: 3000,
          panelClass: 'error-snack-bar',
        })
      }
    )
  }

  navigateToPasswordGame() {
    this.validateAdminUserAccess()
    this.router.navigateByUrl("password-level")
  }
}
