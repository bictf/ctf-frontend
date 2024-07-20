import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-download-file-popup',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, DownloadFilePopupComponent],
  templateUrl: './download-file-popup.component.html',
  styleUrl: './download-file-popup.component.scss'
})
export class DownloadFilePopupComponent {
  password = ""

  constructor(@Inject(MAT_DIALOG_DATA) public data: {password: string}) {
    this.password = data.password
  }
}
