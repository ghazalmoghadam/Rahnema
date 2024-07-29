import "./score.css";

export type ScoreProps = {
  score: number;
};

export function Score({ score }: ScoreProps) {
  return (
    <div className="score">
      <h1>Your Score : </h1> <h2>{score}</h2>
    </div>
  );
}
