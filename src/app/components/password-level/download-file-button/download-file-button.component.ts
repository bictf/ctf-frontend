import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { DownloadService } from "../../../modules/openapi/services/download.service";

@Component({
  selector: 'app-download-file-button',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatInputModule, CommonModule],
  templateUrl: './download-file-button.component.html',
  styleUrl: './download-file-button.component.scss'
})
export class DownloadFileButtonComponent {
  @Input() password = ""
  @Input() buttonText!: string;

  constructor(private downloadFileService: DownloadService) {
  }

  downloadFile() {
    this.downloadFileService.downloadBinaryFile({password: this.password, fileName: "Tob Secret File"})
      .subscribe((data) => {
        const blob = new File([data], "TobSecretFile.zib", {type: 'application/zip'});

        // Create a link element
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = 'TobSecretFile.zip'; // Set the desired file name here
        document.body.appendChild(link); // Append the link to the document
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Remove the link from the document
        window.URL.revokeObjectURL(url); // Clean up the URL object
      })

  }
}
