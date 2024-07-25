import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card'
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-rule-box',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    NgClass
  ],
  templateUrl: './rule-box.component.html',
  styleUrl: './rule-box.component.scss'
})
export class RuleBoxComponent {
  @Input() isCorrect: boolean = false
  @Input() index?: number
  @Input() rule?: string
}
