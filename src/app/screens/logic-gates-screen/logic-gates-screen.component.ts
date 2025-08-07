import {Component} from '@angular/core';
import {LogicChart} from "../../objects/deletethis/logic-chart-types";

@Component({
    selector: 'app-logic-gates-screen',
    templateUrl: './logic-gates-screen.component.html',
    styleUrl: './logic-gates-screen.component.scss'
})
export class LogicGatesScreenComponent {
    logicChart: LogicChart = {
        sources: [],
        gates: []
    };

    ngOnInit() {
        this.logicChart = {
            sources: [],
            gates: []
        }
    }
}
