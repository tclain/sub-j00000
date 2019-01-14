import { RangeTupple } from "./types";

/** Let's do some OOP Here for fun */
export class Range {
  /** the inner tupple that stores the actual values */
  private lowerBound: number = 0;
  private upperBound: number = 0;

  /**
   * Checking if something is a range
   * @returns {boolean} true if the thing is a range
   */
  static is(rangeLike: any): rangeLike is RangeTupple {
    return (
      // we are dealing with an array
      rangeLike.map !== undefined &&
      // of length of 2
      rangeLike.length === 2 &&
      // and every member is a number
      (rangeLike as Array<any>).every(element => !isNaN(element))
    );
  }

  /** return a correct, sorted, range */
  static normalize(range: RangeTupple): RangeTupple {
    const [first, last] = range;
    return first < last ? range : [last, first];
  }
  /** initialize  */
  constructor(range: RangeTupple) {
    if (!Range.is(range)) {
      throw new RangeError("Not a range !");
    }
    this.set(Range.normalize(range));
  }

  /** Change the content of the range tupple */
  set = ([lower, upper]: RangeTupple) => {
    this.lowerBound = lower;
    this.upperBound = upper;
  };

  /** serialize the range */
  toString = () => {
    return `[${this.lowerBound}, ${this.lowerBound})`;
  };
}
