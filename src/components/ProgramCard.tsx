import { type CSSProperties } from "react";

export type Program = {
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  image: string;
};

type ProgramCardProps = {
  program: Program;
  index: number;
  stackIndex: number;
  stackZ: number;
  revealDelayMs: number;
};

export default function ProgramCard({
  program,
  index,
  stackIndex,
  stackZ,
  revealDelayMs,
}: ProgramCardProps) {
  const style = {
    "--stack-index": stackIndex,
    "--stack-z": stackZ,
    "--card-bg": `url(${program.image})`,
    "--reveal-delay": `${revealDelayMs}ms`,
  } as CSSProperties;

  return (
    <details className="program-card program-card--stack" style={style}>
      <summary className="program-card__summary">
        <div className="program-card__content">
          <div className="program-card__header">
            <span className="program-card__index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="program-card__title">{program.title}</h3>
          </div>
          <div className="program-card__details">
            <p className="program-card__desc">{program.description}</p>
            <div className="program-card__tags">
              {program.tags.map((tag) => (
                <span className="program-tag" key={`${program.title}-${tag}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </summary>
      <p className="program-card__full">{program.fullDescription}</p>
    </details>
  );
}
