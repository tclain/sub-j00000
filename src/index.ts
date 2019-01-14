import { RangeCollectionData } from "./types";

/**
 * RangeCollection class
 */
export class RangeCollection {
  private ranges: RangeCollectionData;
  constructor() {
    // with @babel/plugin-proposal-class-properties (https://git.io/vb4SL) to the 'plugins' , we can use a more straightforward way
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }
  /**
   * Adds a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    // TODO: implement this
    this.range.push(range);
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    // TODO: implement this
  }

  toString() {
    // TODO: memoize it
    return this.ranges.map(range => `[${range[0]}, ${range[1]})`).join(" ");
  }
  /**
   * Prints out the list of ranges in the range collection
   */
  print() {
    // TODO: implement this
    this.toString();
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
