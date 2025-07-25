import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchResponseFromServer } from 'src/app/objects/api/SearchResponseFromServer';
import { Router } from '@angular/router';
import { getUuid } from 'src/app/services/uuidService';
import { SearchService } from "../../modules/openapi/services/search.service";
import { LoginService } from "../../modules/openapi/services/login.service";

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
    private router: Router,
    private snackBar: MatSnackBar,
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
    this.searchService.search({ text: searchText }).subscribe(
      (result) => this.showSearchResult(<SearchResponseFromServer>result),
      (error) =>
        this.snackBar.open(error.error, '', {
          duration: 3000,
          panelClass: 'error-snack-bar',
        })
    );
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

  /**
  * If the user is an admin - navigates to password game.
  * Otherwise - navigates to access denied page.
  */
  navigateToPasswordGame() {
    this.loginService.isAdminUser().subscribe(
          (result) => (result ? this.router.navigateByUrl("admin-password-recovery") : this.router.navigateByUrl("access-denied")),
          (_) => {
            this.router.navigate(['/access-denied'])
            this.snackBar.open("Only admin users can download secret files!", '', {
              duration: 3000,
              panelClass: 'error-snack-bar',
            })
          }
        )

  }
}
