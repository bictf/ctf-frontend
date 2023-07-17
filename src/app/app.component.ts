import { Component } from '@angular/core';
import { initUuid } from './services/uuidService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'biss-ctf';

  ngOnInit() {
    initUuid();
  }
}
