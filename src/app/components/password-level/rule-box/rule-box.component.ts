import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-rule-box',
  standalone: true,
  imports: [],
  templateUrl: './rule-box.component.html',
  styleUrl: './rule-box.component.scss'
})
export class RuleBoxComponent {
  @Input() isCorrect: boolean = false
  @Input() index?: number
  @Input() rule?: String
}
