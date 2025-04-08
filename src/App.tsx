import { useEffect, useState } from "react";
import { createInitGrid } from "./utils/initGrid";
import { findFibonacciInGrid } from "./utils/fibonacci";
import { checkColorHighlight } from "./utils/colors";

const rows = 50;
const cols = 50;

export type CellCoordinates = {
  row: number;
  col: number;
};

export default function App() {
  const [yellowHighlight, setYellowHighlight] = useState<CellCoordinates[]>([]);
  const [greenHighlight, setGreenHighlight] = useState<CellCoordinates[]>([]);

  const [grid, setGrid] = useState<(number | null)[][]>(
    createInitGrid(rows, cols)
  );

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);

      // Increment the entire row by 1
      for (let i = 0; i < newGrid[rowIndex].length; i++) {
        newGrid[rowIndex][i] = (newGrid[rowIndex][i] ?? 0) + 1;
        setYellowHighlight((prev) => [...prev, { row: rowIndex, col: i }]);
      }

      // Increment the entire column by 1
      for (let i = 0; i < newGrid.length; i++) {
        if (i !== rowIndex) {
          newGrid[i][colIndex] = (newGrid[i][colIndex] ?? 0) + 1;
          setYellowHighlight((prev) => [...prev, { row: i, col: colIndex }]);
        }
      }
      return newGrid;
    });
  };

  useEffect(() => {
    if (yellowHighlight.length > 0) {
      const timer = setTimeout(() => {
        setYellowHighlight([]);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [yellowHighlight]);

  useEffect(() => {
    const fibonacciCells = findFibonacciInGrid(grid);
    if (fibonacciCells.length > 0) {
      setGreenHighlight(fibonacciCells);
      setTimeout(() => {
        setGrid((prevGrid) => {
          const newGrid = prevGrid.map((row) => [...row]);
          fibonacciCells.forEach(({ row, col }) => {
            newGrid[row][col] = null;
          });
          return newGrid;
        });
        setGreenHighlight([]);
      }, 300);
    }
  }, [grid]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 0px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(50, 20px)",
          gap: "8px",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              style={{
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "3px",
                backgroundColor: checkColorHighlight(
                  rowIndex,
                  colIndex,
                  yellowHighlight,
                  greenHighlight
                ),
                cursor: "pointer",
                color: "#242424",
              }}
            >
              {cell !== null ? cell : ""}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
