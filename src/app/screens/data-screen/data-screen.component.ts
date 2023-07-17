import { Component } from '@angular/core';
import {
  DoesUserLoggedInService,
  SearchService,
} from 'src/app/modules/openapi/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchResponseFromServer } from 'src/app/objects/api/SearchResponseFromServer';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { getUuid } from 'src/app/services/uuidService';

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
    private doesUserLoggedInService: DoesUserLoggedInService,
    private cookieService: CookieService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    doesUserLoggedInService.doesUserLoggedIn({ uuid: getUuid() }).subscribe(
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
      (result) => this.showSearchResult(result),
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
    binaryFile,
  }: SearchResponseFromServer): void {
    this.showResultPage = true;

    this.totalResults = totalResults;
    this.title = title;
    this.content = content;
    this.isBinaryFile = binaryFile;
  }
}
