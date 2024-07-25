import {
  CSSProperties,
  Fragment,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./words-box.css";

function calculateLineStartIndices(words: string[], lineCharLength: number) {
  if (lineCharLength == 0) return [words.length];

  const lineStartIndices = [];

  let currentLineLength = 0;
  words.forEach((word, idx) => {
    if (currentLineLength + word.length > lineCharLength) {
      lineStartIndices.push(idx);
      currentLineLength = -1;
    }

    currentLineLength += word.length + 1; //space
  });

  lineStartIndices.push(words.length);

  return lineStartIndices;
}

type WordsBoxProps = {
  words: string[];
  typedWords: string[];
};

function calculateLineCharLength(
  wordsBoxRef: RefObject<HTMLDivElement>,
  hiddenTextRef: RefObject<HTMLDivElement>
) {
  if (!wordsBoxRef.current || !hiddenTextRef.current) return 0;

  const wordBoxWidth = Number.parseFloat(
    window.getComputedStyle(wordsBoxRef.current).width
  );

  const charWidth = Number.parseFloat(
    window.getComputedStyle(hiddenTextRef.current).width
  );

  return Math.floor(wordBoxWidth / charWidth);
}

export function WordsBox(props: WordsBoxProps) {
  const { words, typedWords } = props;

  const hiddenTextRef = useRef<HTMLDivElement>(null);
  const wordsBoxRef = useRef<HTMLDivElement>(null);
  const [lineCharLength, setLineCharLength] = useState(() => calculateLineCharLength(wordsBoxRef, hiddenTextRef));

  useEffect(() => {
    const handler = () =>
      setLineCharLength(calculateLineCharLength(wordsBoxRef, hiddenTextRef));

    window.addEventListener("resize", handler);

    return () => window.removeEventListener("resize", handler);
  }, [hiddenTextRef.current, wordsBoxRef.current]);

  const lineStartIndices = useMemo(
    () => calculateLineStartIndices(words, lineCharLength),
    [words, lineCharLength]
  );

  const wordsBoxStyle = useMemo<CSSProperties>(() => {
    const currentWordIdx = typedWords.length - 1;
    const currentLineIdx = lineStartIndices.findIndex(
      (idx) => currentWordIdx < idx
    );
    return { top: `-${currentLineIdx}lh` };
  }, [lineStartIndices, typedWords.length]);

  return (
    <div className="words-container">
      <div ref={hiddenTextRef} className="hidden-text">
        0
      </div>
      <div ref={wordsBoxRef} className="words" style={wordsBoxStyle}>
        {words.map((word, idx) => {
          const typed = typedWords[idx];
          const isCurrent = idx == typedWords.length - 1;
          const className = isCurrent
            ? word.startsWith(typed)
              ? "current"
              : "typo"
            : typed === undefined
            ? ""
            : word === typed
            ? "correct"
            : "wrong";
          const key = `${word}-${idx}`;
          return (
            <Fragment key={key}>
              <span className={className}>{word}</span>{" "}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
