import { Range } from "../src/range";

describe("Range/is", () => {
  it("should check if something is a range", () => {
    expect(Range.is([1, 2])).toBe(true);
  });
  it("should return false if the range is malformed", () => {
    expect(Range.is([1])).toBe(false);
    expect(Range.is([1, "bla"])).toBe(false);
    expect(Range.is("something else")).toBe(false);
  });
});

describe("Range/normalize", () => {
  it("should return a sorted range", () => {
    expect(Range.normalize([2, 1])).toEqual([1, 2]);
    expect(Range.normalize([-3, 2])).toEqual([-3, 2]);
    expect(Range.normalize([1, 3])).toEqual([1, 3]);
  });
});

describe("Range/constructor", () => {
  it("should throw an exception is the range is not well formed", () => {
    expect(() => {
      // @ts-ignore
      const notGoodRange = new Range([]);
    }).toThrowError();
  });
  it("should normalize the given range", () => {
    const goodRange = new Range([2, 1]);
    expect(goodRange.lowerBound).toBe(1);
    expect(goodRange.upperBound).toBe(2);
  });
});

describe("Range/toString", () => {
  it("should serialize the range correctly ", () => {
    const goodRange = new Range([2, 1]);
    expect(goodRange.toString()).toBe("[1, 2)");
  });
});

describe("Range/isSignificant", () => {
  it("should return true if the lower and upper ranges are different", () => {
    const notSignificant = new Range([1, 1]);
    expect(notSignificant.isSignificant()).toBeFalsy();

    const significant = new Range([1, 2]);
    expect(significant.isSignificant()).toBeTruthy();
  });
});
