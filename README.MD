# J submission from tclain

Hi there and welcome to my solution of this very fun problem given by J !

# TLDR - How to run it.

This project is written in typescript to take advantage of the super-heroic IDE integrations and earlyon errors catch. The jest test runner is used to provide a safe an isolated execution environment.

```bash
npm install # install the testing architecture along with typescript transpiling
npm test # run the test cases
npm build # get an es6 version of the code in dist
```

## Analysis

The summary of the task is:

```
Task: Implement a 'Range Collection' class.
A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
A range collection is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)
```

A range is a pair of integers {N1, N2} that represent all the numbers between `N1 and N2 -1` [inclusive]. We can represent this in memory as a tuple,
or in ecmasript as an array of two element and use destructuration to simulate the tuple access.

```ts
// type guarantee
export type Range = [number, number];

const range: Range = [1, 5];

// name access to the tuple
const [lowerBound, upperBound] = range;
```

A naive approach the range collection data is an array of ranges:

```ts
export type RangeCollectionData = Range[];
```

For performance reason we will certainly need to challenge this assumption.

We're asked to implement to basic operation in the range collection: add, remove and print.

### Vocabulary.

A range contains an **lower bound** (the first and smaller element), and a **upper bound** (the second and greater element of the pair)

### Print

The easier will certainly be the print operation. We can define a `toString` method on the `RangeCollection` class that will output a string representation of the ranges and let the `print` function to log it on the console.

Each range is displayed in the format: `[upperbound, lowerbound)`.
The range collection is displayed as ranges separated by spaces.

### Add and Remove

Let's look at theses test cases

```ts
rc.add([1, 5]);
rc.print();
// Should display: [1, 5)
```

(1) This one is pretty standard, we are adding the range to collection.

```ts
rc.add([10, 20]);
rc.print();
// Should display: [1, 5) [10, 20)
```

(2) Same here, I'm adding a range with **no overlapping** with bounds, so it will stack up after the first one.

```ts
rc.add([20, 20]);
rc.print();
// Should display: [1, 5) [10, 20)
```

(3) First edge case, if a range contains the same lower and upper bound, nothing happens

```ts
rc.add([20, 21]);
rc.print();
// Should display: [1, 5) [10, 21)
```

(4) Now we talk ! if we are adding a range, that extends the global range, we need to update the upper global bound to be upper bound of the provided range.

```ts
rc.add([2, 4]);
rc.print();
// Should display: [1, 5) [10, 21)
```

(5) if we are adding a range that is comprised inside one of the range of the collection, nothing changes

```ts
rc.add([3, 8]);
rc.print();
// Should display: [1, 8) [10, 21)
```

(6) And of course, if we adding a range that overlap inner bounds or inner ranges (not at the edges of the global range), we need to update the **overlapped** range with the new bound.

```ts
rc.remove([10, 10]);
rc.print();
// Should display: [1, 8) [10, 21)
```

(7) Now let's talk about removal of ranges. In this case the upper and lower bound are the same so the range is not significant.

```ts
rc.remove([10, 11]);
rc.print();
// Should display: [1, 8) [11, 21)
```

(7) If a range is totally included in any present ranges, update the overlapped range accordingly.

```ts
rc.remove([15, 17]);
rc.print();
// Should display: [1, 8) [11, 15) [17, 21)
```

(8) If the range to remove is **totally included in a range**

```ts
rc.remove([3, 19]);
rc.print();
// Should display: [1, 3) [19, 21)
```

# Implementation

I could have gone fully functionnal, but the canvas was set in a class, so I opted to an OOP approach.

## Assumptions

the provided range is not in order, but is expected to be a pair of number.

```ts
// [1, 8) [10, 21)
rc.remove([8, 11]);
rc.print();
// Should display: [1, 21)
```
