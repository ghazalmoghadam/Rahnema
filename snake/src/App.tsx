import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Score } from "./score";
import { GameOver } from "./game-over";
const ROW_COUNT = 20;
const COL_COUNT = 32;

const rowIndices = Array.from({ length: 20 }, (_, i) => i);
const colIndices = Array.from({ length: 32 }, (_, j) => j);

const arrowKeys = ["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp"] as const;
type ArrowKey = (typeof arrowKeys)[number];

function randomCell() {
  return {
    i: Math.floor(Math.random() * ROW_COUNT),
    j: Math.floor(Math.random() * COL_COUNT),
  };
}

type Cell = { i: number; j: number };

function isSame(b1: Cell, b2: Cell) {
  return b1.i == b2.i && b1.j == b2.j;
}

type State = {
  score: number;
  isGameOver: boolean;
  fps: number;
  frame: number;
  direction: [number, number];
  apple: Cell;
  snake: Cell[];
};

function calculateGridClassName({ snake, apple }: State, cell: Cell) {
  if (isSame(cell, apple)) {
    return "cell-apple";
  }

  for (const snakeCell of snake) {
    if (isSame(cell, snakeCell)) return "cell-snake";
  }

  return "cell-empty";
}

function App() {
  const [state, setState] = useState<State>({
    score: 0,
    isGameOver: false,
    fps: 2,
    frame: 0,
    direction: [0, -1],
    apple: { i: 3, j: 5 },
    snake: [
      { i: 10, j: 10 },
      { i: 10, j: 11 },
      { i: 10, j: 12 },
    ],
  });

  let intervalId = useRef(0);
  const arrowKey = useRef<ArrowKey>("ArrowLeft");

  useEffect(() => {
    intervalId.current = setInterval(actionPerFrame, 1000 / state.fps);
    return () => clearInterval(intervalId.current);
  }, [state.fps]);

  useEffect(() => {
    const handler = (event: globalThis.KeyboardEvent): void => {
      if (!arrowKeys.includes(event.key)) return;
      arrowKey.current = event.key;
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function actionPerFrame() {
    setState((prevState) => {
      const { snake, direction, apple, frame, score } = prevState;
      const isSnake = (cell: Cell) => snake.some((c) => isSame(c, cell));

      let [di, dj] = calcDirection(arrowKey.current);

      if (-di == direction[0] && -dj == direction[1]) {
        [di, dj] = direction;
      }

      const head = snake[0];
      const i = (head.i + di + ROW_COUNT) % ROW_COUNT;
      const j = (head.j + dj + COL_COUNT) % COL_COUNT;
      const newHead = { i, j };

      const isGameOver = isSnake(newHead);

      if (isGameOver) {
        clearInterval(intervalId.current);
        return { ...prevState, isGameOver };
      }

      const newSnake = [newHead, ...snake];
      const isApple = isSame(apple, newHead);
      let newApple = apple;

      if (isApple) {
        do {
          newApple = randomCell();
        } while (isSnake(newApple));
      } else {
        newSnake.pop();
      }

      const newFps = (newSnake.length * 2) / 3;

      return {
        apple: newApple,
        direction: [di, dj],
        snake: newSnake,
        frame: frame + 1,
        fps: newFps,
        score: score + Number(isApple),
        isGameOver: false,
      };
    });
  }

  return (
    <>
      {state.isGameOver && <GameOver />}
      <div className="board">
        {rowIndices.map((i) => (
          <div key={i} className="row">
            {colIndices.map((j) => (
              <div
                key={`${i}-${j}`}
                className={"col " + calculateGridClassName(state, { i, j })}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <Score score={state.score} />
    </>
  );
}

export default App;

function calcDirection(arrowKey: ArrowKey): State["direction"] {
  switch (arrowKey) {
    case "ArrowDown":
      return [1, 0];
    case "ArrowLeft":
      return [0, -1];
    case "ArrowRight":
      return [0, 1];
    case "ArrowUp":
      return [-1, 0];
  }
}
