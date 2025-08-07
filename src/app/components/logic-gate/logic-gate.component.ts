import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { LogicSignal } from '../../objects/deletethis/logicSignal';
import {LookUpTable} from "../../objects/deletethis/logic-chart-types";

@Component({
  selector: 'app-logic-gate',
  templateUrl: './logic-gate.component.html',
  styleUrls: ['./logic-gate.component.scss']
})
export class LogicGateComponent {
  @Input() inputSignals: LogicSignal[] = [];
  @Input() lookUpTable: LookUpTable = new Map();
  @Input() displayText: string = '';

  @Output() inputsChanged = new EventEmitter<LogicSignal>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputSignals']) {
      this.inputsChanged.emit(this.lookUpTable.get(this.inputSignals));
    }
  }

  getKnobPosition(index: number, total: number): number {
    return ((index + 1) / (total + 1)) * 100;
  }
}
