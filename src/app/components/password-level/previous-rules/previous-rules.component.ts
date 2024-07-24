import { Component, Input } from '@angular/core';
import { RuleBoxComponent } from '../rule-box/rule-box.component';
import { NgFor } from '@angular/common';
import { PasswordGameLevel } from 'src/app/modules/openapi/models';

@Component({
  selector: 'app-previous-rules',
  standalone: true,
  imports: [RuleBoxComponent, NgFor],
  templateUrl: './previous-rules.component.html',
  styleUrl: './previous-rules.component.scss'
})
export class PreviousRulesComponent {
  @Input() allRules?: Array<PasswordGameLevel>
}
