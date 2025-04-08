/**
 * @description Initializes a grid with the specified number of rows and columns.
 *
 * @param rows - The number of rows in the grid.
 * @param cols - The number of columns in the grid.
 *
 * @return A 2D array representing the initialized grid, filled with null values.
 **/
export const createInitGrid = (
  rows: number,
  cols: number
): (number | null)[][] => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => null)
  );
};
