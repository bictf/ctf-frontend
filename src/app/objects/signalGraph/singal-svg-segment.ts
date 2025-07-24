 const EPSILON = 1e-6

export const UP = -1
export const DOWN = -1

export class SignalSvgSegment {
  constructor(
    public fromX: number,
    public fromY: number,
    public toX: number,
    public toY: number
  ) {
  }

  /**
   * True if horizontal segment, false if vertical
   */
  get isHorizontal(): boolean {
    return this.approximatelyEqual(this.fromY, this.toY)
  }

  get length(): number {
    return this.isHorizontal
      ? Math.abs(this.toX - this.fromX)
      : Math.abs(this.toY - this.fromY);
  }

  /**
   * Returns the point at `distanceFromSegmentStart` pixels from start along this segment.
   * Distance must be between 0 and this.length.
   */
  pointAtDistance(distanceFromSegmentStart: number): { x: number; y: number } {
    if (distanceFromSegmentStart < 0 || distanceFromSegmentStart > this.length) {
      throw new Error(`Distance ${distanceFromSegmentStart} out of bounds`);
    }

    if (this.isHorizontal) {
      return {
        x: this.fromX < this.toX ? this.fromX + distanceFromSegmentStart : this.fromX - distanceFromSegmentStart,
        y: this.fromY
      };
    } else {
      return {
        x: this.fromX,
        y: this.fromY < this.toY ? this.fromY + distanceFromSegmentStart : this.fromY - distanceFromSegmentStart
      };
    }
  }

  /**
   * Returns the distance (in pixels) from the given point to the end of the segment.
   * Throws if the point is not on this segment.
   */
  distanceToSegmentEnd(point: { x: number, y: number }): number {
    if (!this.containsPoint(point)) {
      throw new Error("Point is not on this segment");
    }

    return this.isHorizontal
      ? Math.abs(this.toX - point.x)
      : Math.abs(this.toY - point.y);
  }

  /**
   * Returns whether the segment contains a given point
   */
  containsPoint(point: { x: number, y: number }): boolean {
    return this.isHorizontal ?
      (this.approximatelyEqual(point.y, this.toY) && point.x >= Math.min(this.fromX, this.toX) && point.x <= Math.max(this.fromX, this.toX))
      : (this.approximatelyEqual(point.x, this.toX) && point.y >= Math.min(this.fromY, this.toY) && point.y <= Math.max(this.fromY, this.toY));
  }

  approximatelyEqual(a: number, b: number, epsilon: number = EPSILON): boolean {
    return Math.abs(a - b) < epsilon;
  }
}
