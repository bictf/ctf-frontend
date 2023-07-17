import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-download-binary-file-button',
  templateUrl: './download-binary-file-button.component.html',
  styleUrls: ['./download-binary-file-button.component.scss'],
})
export class DownloadBinaryFileButtonComponent {
  @Input() title = '';
  isDialogOpen = false;

  hasAccessToDownload = false;

  constructor() {}

  download() {
    const newTab = window.open(
      'http://localhost:7000/download?fileName=Top Secret File',
      '_blank'
    );

    setTimeout(() => newTab?.close(), 10);
  }
}
