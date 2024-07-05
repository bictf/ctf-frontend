import { Component, Input } from '@angular/core';
import { Rule } from '../rule';
import { RuleBoxComponent } from '../rule-box/rule-box.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-previous-rules',
  standalone: true,
  imports: [RuleBoxComponent, NgFor],
  templateUrl: './previous-rules.component.html',
  styleUrl: './previous-rules.component.scss'
})
export class PreviousRulesComponent {
  @Input() allRules?: Rule[]
}
