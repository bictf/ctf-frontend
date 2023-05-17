import { Component } from '@angular/core';
import { SearchService } from 'src/app/modules/openapi/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-data-screen',
  templateUrl: './data-screen.component.html',
  styleUrls: ['./data-screen.component.scss']
})
export class DataScreenComponent {
  totalResults = 0;
  title = "";
  content = 0;

  showResultPage = false;

  constructor(
    private searchService: SearchService,
    private snackBar: MatSnackBar) {
  }

  onSearchPressed(searchText: string): void {
    this.searchService
      .search({ text: searchText })
      .subscribe(
        (result) => this.showSearchResult(result),
        (error) =>
          this.snackBar.open(error.error, '', {
            duration: 3000,
            panelClass: 'error-snack-bar',
          })
    );
  }

  showSearchResult(resultData: any): void {
    this.showResultPage = true;

    this.totalResults = resultData.totalResults;
    this.title = resultData.title;
    this.content = resultData.content;
  }
}
