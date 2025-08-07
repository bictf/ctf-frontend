import {Component, Input} from '@angular/core';
import {LogicChart} from "../../objects/deletethis/logic-chart-types";
import {LogicSignal} from "../../objects/deletethis/logicSignal";

@Component({
  selector: 'app-logic-chart',
  templateUrl: './logic-chart.component.html',
  styleUrl: './logic-chart.component.scss'
})
export class LogicChartComponent {
  @Input() chart!: LogicChart;


  protected readonly LogicSignal = LogicSignal;
}
