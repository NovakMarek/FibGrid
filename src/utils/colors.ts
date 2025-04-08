import { CellCoordinates } from "../App";

/**
 * @description Checks if a cell should be highlighted based on its coordinates.
 *
 * @param rowIndex - The row index of the cell.
 * @param colIndex - The column index of the cell.
 * @param yellowHighlight - An array of coordinates for yellow-highlighted cells.
 * @param greenHighlight - An array of coordinates for green-highlighted cells.
 *
 * @return A string representing the highlight color ("yellow", "green", or "white").
 */
export const checkColorHighlight = (
  rowIndex: number,
  colIndex: number,
  yellowHighlight: CellCoordinates[],
  greenHighlight: CellCoordinates[]
): string => {
  const isYellow = yellowHighlight.some(
    (cell) => cell.row === rowIndex && cell.col === colIndex
  );
  const isGreen = greenHighlight.some(
    (cell) => cell.row === rowIndex && cell.col === colIndex
  );

  if (isGreen) {
    return "#a7c957";
  } else if (isYellow) {
    return "#fcbf49";
  }
  return "white";
};
