import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {SignalGraph} from "../../modules/openapi/models/signal-graph";

@Component({
  selector: 'app-signal-chart',
  templateUrl: './signal-chart.component.html',
  styleUrl: './signal-chart.component.scss'
})
export class SignalChartComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public graphData: { signalChart: SignalGraph[]; passwordParts: string[] }) {
  }
}
