import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dudu-images',
  templateUrl: './dudu-images.component.html',
  styleUrl: './dudu-images.component.scss'
})
export class DuduImagesComponent {
  imageSrc: string = '../assets/duduImage.png';
  count: number = 0;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { count: number }) {
    this.count = data.count;
  }

  get images(): number[] {
    return Array(this.count).fill(0);
  }
}
