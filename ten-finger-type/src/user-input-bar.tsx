import { KeyboardEventHandler, useEffect, useRef } from "react";
import "./user-input-bar.css";
import { useCountDown } from "./count-down-hook";

type UserInputBarProps = {
  onType: (typed: string) => void;
  onWord: (typed: string) => void;
  onReset: () => void;
  onTimeOver: () => void;
};

export function UserInputBar(props: UserInputBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    timeLeft,
    formattedTimeLeft,
    start: startCountDown,
    reset: resetCountDown,
    hasStarted,
  } = useCountDown({});

  useEffect(() => inputRef.current?.focus(), [inputRef.current]);

  useEffect(() => {
    console.log("useEffect called");

    //if (!inputRef.current || hasStarted) return;
    if (!inputRef.current || hasStarted) return;

    inputRef.current.addEventListener("keydown", startCountDown, { once: true });

    const cleanUp = () =>
      inputRef.current?.removeEventListener("keydown", startCountDown);

    return cleanUp;
  }, [inputRef.current, hasStarted]);

  useEffect(() => {
    if (timeLeft < 1) {
      props.onTimeOver();
    }
  }, [timeLeft]);

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key != " ") {
      return;
    }

    event.preventDefault();

    const typedWord = event.currentTarget.value.trim();
    props.onWord(typedWord);
    event.currentTarget.value = "";
  };

  const handleReset = () => {
    resetCountDown();
    props.onReset();
    inputRef.current?.focus()
  };

  return (
    <div className="inputbar">
      <input
        ref={inputRef}
        className="user-word"
        type="text"
        onKeyDown={handleKeydown}
        onInput={(e) => props.onType(e.currentTarget.value.trim())}
      />
      <div className="timer-box button">
        <span id="show-time">{formattedTimeLeft}</span>
      </div>
      <button className="refresh button" onClick={handleReset}>
        <i className="bi bi-arrow-clockwise"></i>
      </button>
    </div>
  );
}
