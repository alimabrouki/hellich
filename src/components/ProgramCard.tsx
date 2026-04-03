import { memo, useCallback, type CSSProperties } from "react";

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
  expanded: boolean;
  onToggle: () => void;
};

function ProgramCard({
  program,
  index,
  stackIndex,
  stackZ,
  revealDelayMs,
  expanded,
  onToggle,
}: ProgramCardProps) {
  const style = {
    "--stack-index": stackIndex,
    "--stack-z": stackZ,
    "--card-bg": `url(${program.image})`,
    "--reveal-delay": `${revealDelayMs}ms`,
  } as CSSProperties;

  const handleClick = useCallback(() => {
    onToggle();
  }, [onToggle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle();
      }
    },
    [onToggle],
  );

  return (
    <article
      className={`program-card program-card--stack ${expanded ? "program-card--expanded" : ""}`}
      style={style}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
    >
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
        <p className="program-card__full">{program.fullDescription}</p>
      </div>
    </article>
  );
}

export default memo(ProgramCard);
