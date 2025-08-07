import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-logic-signal-connection-line',
  templateUrl: './logic-signal-connection-line.component.html',
  styleUrl: './logic-signal-connection-line.component.scss'
})
export class LogicSignalConnectionLineComponent implements OnChanges {
  @Input() start: Point = {x: 0, y: 0};
  @Input() end: Point = {x: 0, y: 0};

  pathD: string = '';

  svgLeft: number = 0;
  svgTop: number = 0;
  svgWidth: number = 0;
  svgHeight: number = 0;
  private padding: number = 20;

  ngOnChanges(changes: SimpleChanges) {
    this.updateSvgPosition();
    this.updatePath();
  }

  updateSvgPosition() {
    const minX = Math.min(this.start.x, this.end.x);
    const minY = Math.min(this.start.y, this.end.y);
    const maxX = Math.max(this.start.x, this.end.x);
    const maxY = Math.max(this.start.y, this.end.y);

    this.svgLeft = minX - this.padding;
    this.svgTop = minY - this.padding;
    this.svgWidth = (maxX - minX) + this.padding * 2;
    this.svgHeight = (maxY - minY) + this.padding * 2;
  }

  updatePath() {
    const startXRelative = this.start.x - this.svgLeft;
    const startYRelative = this.start.y - this.svgTop;
    const endXRelative = this.end.x - this.svgLeft;
    const endYRelative = this.end.y - this.svgTop;

    const controlOffset = Math.abs(endXRelative - startXRelative) / 2;

    this.pathD = `M ${startXRelative} ${startYRelative} ` +
      `C ${startXRelative + controlOffset} ${startYRelative} ` +
      `${endXRelative - controlOffset} ${endYRelative} ` +
      `${endXRelative} ${endYRelative}`;
  }
}
