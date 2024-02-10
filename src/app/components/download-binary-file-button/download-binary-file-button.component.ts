import { Component , Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DownloadService } from "../../modules/openapi/services/download.service";

@Component({
  selector: 'app-download-binary-file-button',
  templateUrl: './download-binary-file-button.component.html',
  styleUrls: ['./download-binary-file-button.component.scss'],
})
export class DownloadBinaryFileButtonComponent {
  @Input() title = '';
  isDialogOpen = false;

  constructor(private snackBar: MatSnackBar, private downloadService: DownloadService) {
  }

  download() {
    this.downloadService
      .downloadBinaryFile({fileName: "Tob Secret File"})
      .subscribe(
        (result) => {
        },
        (error) => {
          let errorMessage = ""
          if (error.status == 401) {
            errorMessage = "only admin users can download files"
          } else {
            errorMessage = error.error
          }
          this.snackBar.open(errorMessage, '', {
            duration: 3000,
            panelClass: 'error-snack-bar',
          })
        }
      );
    const newTab = window.open(
      'http://biss-ctf-back:7000/download?fileName=Tob Secret File',
      '_blank'
    );

    setTimeout(() => newTab?.close(), 10);
  }
}
