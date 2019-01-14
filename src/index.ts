import { RangeCollectionData, RangeTupple, Range } from "./range";

/**
 * RangeCollection class
 */
export class RangeCollection {
  private ranges: Range[] = [];
  private byUpperBounds = {};
  private byLowerBounds = {};

  /**
   * Adds a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range: RangeTupple) {
    // TODO: implement this
    const lastIndex = this.ranges.length - 1;
    this.ranges.push(new Range(range));
    console.log(this.ranges.map(r => r.toString()));
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range: RangeTupple) {
    // TODO: implement this
  }

  /** serialize the range collection to a string */
  toString() {
    // TODO: memoize it
    return this.ranges.map(range => range.toString()).join(" ");
  }
  /**
   * Prints out the list of ranges in the range collection
   */
  print() {
    // TODO: implement this
    console.log(this.toString());
  }
}

// Example run
const rc = new RangeCollection();

rc.add([1, 5]);
rc.print();
// Should display: [1, 5)

rc.add([10, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 20]);
rc.print();
// Should display: [1, 5) [10, 20)

rc.add([20, 21]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([2, 4]);
rc.print();
// Should display: [1, 5) [10, 21)

rc.add([3, 8]);
rc.print();
// Should display: [1, 8) [10, 21)

rc.remove([10, 10]);
rc.print();
// Should display: [1, 8) [10, 21)

rc.remove([10, 11]);
rc.print();
// Should display: [1, 8) [11, 21)

rc.remove([15, 17]);
rc.print();
// Should display: [1, 8) [11, 15) [17, 21)

rc.remove([3, 19]);
rc.print();
// Should display: [1, 3) [19, 21)
