import { CellCoordinates } from "../App";

/**
 * @description Generates a Fibonacci sequence up to a given number.
 *
 * @param n - The upper limit for the Fibonacci sequence.
 *
 * @return An array of Fibonacci numbers up to the given number.
 */
export const generateFibonnaciSequence = (n: number): number[] => {
  const fibonnaci: number[] = [0, 1];

  const storedFibonnaci = localStorage.getItem("fibonnaci");
  if (storedFibonnaci) {
    const parsedFibonnaci = JSON.parse(storedFibonnaci);
    if (parsedFibonnaci[parsedFibonnaci.length - 1] >= n) {
      return parsedFibonnaci;
    }
  }

  while (fibonnaci[fibonnaci.length - 1] < n) {
    const nextValue =
      fibonnaci[fibonnaci.length - 1] + fibonnaci[fibonnaci.length - 2];
    fibonnaci.push(nextValue);
  }

  localStorage.setItem("fibonnaci", JSON.stringify(fibonnaci));

  return fibonnaci;
};

/**
 * @description Checks if five numbers are consecutive Fibonacci numbers.
 *
 * @param a - The first number.
 * @param b - The second number.
 * @param c - The third number.
 * @param d - The fourth number.
 * @param e - The fifth number.
 * @param fibonnaciArray - An array of Fibonacci numbers.
 *
 * @return A boolean indicating whether the five numbers are consecutive Fibonacci numbers.
 */
export const isConsecutiveFibonacci = (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  fibonnaciArray: number[]
): boolean => {
  for (let i = 0; i < fibonnaciArray.length - 4; i++) {
    if (
      fibonnaciArray[i] === a &&
      fibonnaciArray[i + 1] === b &&
      fibonnaciArray[i + 2] === c &&
      fibonnaciArray[i + 3] === d &&
      fibonnaciArray[i + 4] === e
    ) {
      return true;
    }
  }

  return false;
};

/**
 * @description Checks if five numbers are Fibonacci numbers.
 *
 * @param a - The first number.
 * @param b - The second number.
 * @param c - The third number.
 * @param d - The fourth number.
 * @param e - The fifth number.
 *
 * @return A boolean indicating whether the five numbers are Fibonacci numbers.
 */
export const isFibonacci = (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number
): boolean => {
  const fibonnaciArray = generateFibonnaciSequence(e);
  return isConsecutiveFibonacci(a, b, c, d, e, fibonnaciArray);
};

/**
 * @description Finds all cells in a grid that are part of a Fibonacci sequence.
 *
 * @param grid - A 2D array representing the grid.
 *
 * @return An array of coordinates of cells that are part of a Fibonacci sequence.
 */
export const findFibonacciInGrid = (
  grid: (number | null)[][]
): CellCoordinates[] => {
  const fibonacciCells: CellCoordinates[] = []; // Array to store the coordinates of cells that are part of a Fibonacci sequence.

  const numRows = grid.length; // Get the number of rows, which means the length of outer array.
  const numCols = grid[0].length; // Get the number of columns, which means the length of the first inner array. Assumes that all rows have the same number of columns.

  // Check each row for five consecutive Fibonacci numbers.
  for (let row = 0; row < numRows; row++) {
    let col = 0;
    while (col < numCols - 4) {
      const a = grid[row][col];
      const b = grid[row][col + 1];
      const c = grid[row][col + 2];
      const d = grid[row][col + 3];
      const e = grid[row][col + 4];

      if (
        a !== null &&
        b !== null &&
        c !== null &&
        d !== null &&
        e !== null &&
        isFibonacci(a, b, c, d, e)
      ) {
        fibonacciCells.push({ row, col });
        fibonacciCells.push({ row, col: col + 1 });
        fibonacciCells.push({ row, col: col + 2 });
        fibonacciCells.push({ row, col: col + 3 });
        fibonacciCells.push({ row, col: col + 4 });

        col += 5; // Skip the next columns to avoid duplicates
      } else {
        col++;
      }
    }
  }

  // Check each column for five consecutive Fibonacci numbers.
  for (let col = 0; col < numCols; col++) {
    let row = 0;
    while (row < numRows - 4) {
      const a = grid[row][col];
      const b = grid[row + 1]?.[col];
      const c = grid[row + 2]?.[col];
      const d = grid[row + 3]?.[col];
      const e = grid[row + 4]?.[col];

      if (
        a !== null &&
        b !== null &&
        c !== null &&
        d !== null &&
        e !== null &&
        isFibonacci(a, b, c, d, e)
      ) {
        fibonacciCells.push({ row, col });
        fibonacciCells.push({ row: row + 1, col });
        fibonacciCells.push({ row: row + 2, col });
        fibonacciCells.push({ row: row + 3, col });
        fibonacciCells.push({ row: row + 4, col });

        row += 5; // Skip the next rows to avoid duplicates
      } else {
        row++;
      }
    }
  }

  return fibonacciCells;
};
