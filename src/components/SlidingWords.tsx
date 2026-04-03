import { memo, type CSSProperties } from "react";
import "../styles/SlidingWords.css";

const words = [
  "BURPEES",
  "BENCH PRESS",
  "SQUATS",
  "PULL-UPS",
  "BURPEES",
  "PLANK",
  "LUNGES",
  "SQUATS",
  "DEADLIFT",
  "PUSH-UPS",
];

type SlidingWordsProps = {
  className?: string;
  style?: CSSProperties;
};

function SlidingWords({ className = "", style }: SlidingWordsProps) {
  return (
    <div
      className={`sliding-words${className ? ` ${className}` : ""}`}
      style={style}
      dir="ltr"
      aria-hidden="true"
    >
      <div className="sliding-words__track">
        {[0, 1].map((group) => (
          <div className="sliding-words__group" key={`group-${group}`}>
            {words.map((word, index) => (
              <span className="sliding-word" key={`${word}-${index}`}>
                <span className="sliding-word__text">{word}</span>
                <span className="sliding-word__dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(SlidingWords);
