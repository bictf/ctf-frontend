import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  searchText: string = "";
  @Output() searchEvent = new EventEmitter<string>();

  onInputChange(event: any): void {
    this.searchText = event.target.value;
  }

  onSearch(event: any): void {
    this.searchEvent.emit(this.searchText);
  }
}
