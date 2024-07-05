import { Component, Input} from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card'

@Component({
  selector: 'app-rule-box',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent
  ],
  templateUrl: './rule-box.component.html',
  styleUrl: './rule-box.component.scss'
})
export class RuleBoxComponent {
  @Input() isCorrect: boolean = false
  @Input() index?: number
  @Input() rule?: String
}
