import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SignalGraph} from "../../../modules/openapi/models/signal-graph";
import {SignalSvgSegment} from '../../../objects/signalGraph/singal-svg-segment';

type PointPath = Array<[{ x: number; y: number }, { x: number; y: number }]>;

@Component({
  selector: 'app-signal-graph',
  templateUrl: './signal-graph.component.html',
  styleUrl: './signal-graph.component.scss'
})
export class SignalGraphComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() graphData: SignalGraph = [];
  @Input() animationSpeed: number = 2; // How many pixels the animation moves per frame
  @Input() animationPhase: number = 0; // How many segments into the graph the animation starts
  @Input() animationTailLengthMultiplier: number = 1.5;

  private signalWidth: number = 0;
  private signalCount: number = 16;
  private animationTailLength: number = 0;

  private currentFirstViewablePoint: { x: number, y: number } = {x: 0, y: 0};

  private signalSegments: SignalSvgSegment[] = [];

  private animationFrameId: number | null = null;

  svgPathD = '';

  readonly graphWidth = 1000;
  readonly graphHeight = 100;

  private readonly highSignalY = this.graphHeight * 0.8;
  private readonly lowSignalY = this.graphHeight * 0.2;

  ngOnInit() {
    if (this.graphData) {
      this.signalCount = this.graphData.length
      this.signalWidth = this.graphWidth / this.signalCount;

      this.animationTailLength = this.animationTailLengthMultiplier * this.signalWidth;

      this.buildSignalSvgSegments();

      const startIndex = this.animationPhase % this.signalSegments.length;
      const startSegment = this.signalSegments[startIndex];

      this.currentFirstViewablePoint = {
        x: startSegment.fromX,
        y: startSegment.fromY
      };
    }
  }

  ngAfterViewInit(): void {
    this.startAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  /**
   * Starts the signal animation loop.
   *
   * - Continuously generates a new visible path segment based on the current viewable point and the tail length.
   * - Advances the viewable point based on the animation speed.
   * - Uses `requestAnimationFrame` to ensure smooth animation at the browser's refresh rate.
   *
   * Internally:
   * - Calls `buildPointPath` to get the current segment of the signal.
   * - Calls `buildSvgPath` to convert that segment into an SVG path string.
   * - Updates `svgPathD`, which is bound to the `<path>` element in the template.
   * - Advances the signal forward by modifying `currentFirstViewablePoint`.
   *
   * Yes this was documentation was totally written by ChatGPT (surprisingly the code was not)
   */
  private startAnimation(): void {
    const animate = () => {
      const path = this.buildPointPath(this.currentFirstViewablePoint, this.animationTailLength);
      this.svgPathD = this.buildSvgPath(path);

      this.currentFirstViewablePoint = this.advancePoint(this.currentFirstViewablePoint, this.animationSpeed);

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }


  /**
   * Constructs all signal segments (horizontal and vertical) from the `graphData` array.
   *
   * - `graphData` is a boolean array representing high (`true`) and low (`false`) signals.
   * - For each signal:
   *    - Adds a horizontal segment representing the duration of the signal.
   *    - If the signal changes (high-to-low or low-to-high), adds a vertical segment representing the transition.
   *
   * The resulting segments are stored in `signalSegments`, which can be used later for precise animation or SVG rendering.
   *
   * Yes this was documentation was totally written by ChatGPT (surprisingly the code was not)
   */
  buildSignalSvgSegments(): void {
    let currentPoint = {
      x: 0,
      y: this.graphData[0] ? this.highSignalY : this.lowSignalY
    };
    let previousSignal = this.graphData[0];

    this.graphData.forEach((signal, signalIndex) => {
      const horizontalSegment = new SignalSvgSegment(currentPoint.x, currentPoint.y, currentPoint.x + this.signalWidth, currentPoint.y);
      this.signalSegments.push(horizontalSegment);

      currentPoint.x = horizontalSegment.toX;

      if (signalIndex >= this.signalCount - 1) return;

      if (signal !== previousSignal) {
        const verticalSegment = new SignalSvgSegment(
          currentPoint.x,
          currentPoint.y,
          currentPoint.x,
          signal ? this.highSignalY : this.lowSignalY
        );

        this.signalSegments.push(verticalSegment);
        currentPoint.y = verticalSegment.toY;
      }

      previousSignal = signal;
    });

  }

  /** Find the segment that contains a given point, or undefined if none */
  private findSegmentContainingPoint(point: { x: number, y: number }): SignalSvgSegment | undefined {
    return this.signalSegments.find(segment => segment.containsPoint(point));
  }

  /**
   * Advance a point along the signal segments by pointsToAdvance.
   * Wraps around to the start of the segments if end is reached.
   */
  private advancePoint(point: { x: number, y: number }, pointsToAdvance: number): { x: number; y: number } {
    let advancedPoint = {...point};

    let currentSegment = this.findSegmentContainingPoint(point);
    if (!currentSegment) {
      console.log(this.signalSegments)
      throw new Error(`Cannot find segment containing point ${JSON.stringify(point)}`);
    }

    while (pointsToAdvance > 0) {
      const distanceToSegmentEnd = currentSegment.distanceToSegmentEnd(advancedPoint);

      if (pointsToAdvance <= distanceToSegmentEnd) {
        if (currentSegment.isHorizontal) {
          advancedPoint.x += pointsToAdvance;
        } else if (currentSegment.fromY < currentSegment.toY) {
          advancedPoint.y += pointsToAdvance;
        } else {
          advancedPoint.y -= pointsToAdvance;
        }
        pointsToAdvance = 0;
      } else {
        if (currentSegment.isHorizontal) advancedPoint.x = currentSegment.toX;
        else advancedPoint.y = currentSegment.toY;

        pointsToAdvance -= distanceToSegmentEnd;

        const nextSegmentIndex: number = (this.signalSegments.indexOf(currentSegment) + 1) % this.signalSegments.length;
        currentSegment = this.signalSegments[nextSegmentIndex];

        advancedPoint.x = currentSegment.fromX;
        advancedPoint.y = currentSegment.fromY;
      }
    }

    return advancedPoint;
  }

  /**
   * Builds a list of line segments (PointPath) representing the path
   * from initialPoint advanced by pathLength along the signal.
   */
  private buildPointPath(initialPoint: { x: number, y: number }, pathLength: number): PointPath {
    let pointPath: PointPath = [];

    const lastPoint = this.advancePoint(initialPoint, pathLength);
    if (!this.findSegmentContainingPoint(lastPoint)) {

      console.log(this.findSegmentContainingPoint({x: lastPoint.x - 1, y: lastPoint.y}));
      throw new Error(`Cannot find segment containing point ${JSON.stringify(lastPoint)} for initial point ${JSON.stringify(initialPoint)}`);
    }

    let currentLineStartPoint = {x: initialPoint.x, y: initialPoint.y};
    let currentSegment = this.findSegmentContainingPoint(initialPoint)
    if (!currentSegment) return pointPath;

    while (!currentSegment.containsPoint(lastPoint)) {

      pointPath.push(
        [currentLineStartPoint, {x: currentSegment.toX, y: currentSegment.toY}]
      );

      const nextSegmentIndex: number = (this.signalSegments.indexOf(currentSegment) + 1) % this.signalSegments.length;
      currentSegment = this.signalSegments[nextSegmentIndex];

      currentLineStartPoint = {x: currentSegment.fromX, y: currentSegment.fromY};
    }
    pointPath.push([currentLineStartPoint, lastPoint]);

    return pointPath;
  }

  /**
   * Converts a list of point segments (`PointPath`) into an SVG path string (`d` attribute).
   *
   * The function starts by moving to the starting point of the first segment,
   * and then draws straight lines (`L`) to the end points of each segment in sequence.
   *
   * @param pointPath - An array of point pairs, each representing a segment from one point to another.
   * @returns A string suitable for use as the `d` attribute in an SVG `<path>` element.
   *
   * @example
   * const path: PointPath = [
   *   [{ x: 0, y: 0 }, { x: 10, y: 0 }],
   *   [{ x: 10, y: 0 }, { x: 10, y: 10 }]
   * ];
   * const d = buildSvgPath(path);
   * // Returns: "M 0 0 L 10 0 L 10 10"
   */
  buildSvgPath(pointPath: PointPath): string {
    if (pointPath.length === 0) return '';

    const pathDCommands: string[] = [];
    let lastEnd: { x: number; y: number } | null = null;

    for (const [start, end] of pointPath) {
      // If this segment start doesn't match the previous segment end, start a new subpath
      if (!lastEnd || start.x !== lastEnd.x || start.y !== lastEnd.y) {
        pathDCommands.push(`M ${start.x} ${start.y}`);
      }
      pathDCommands.push(`L ${end.x} ${end.y}`);
      lastEnd = end;
    }

    return pathDCommands.join(' ');
  }

}
