import { memo } from "react";
import type { animate } from "../types/types";

function HeroTitle({ animate }: animate) {
  return (
    <h1
      dir="rtl"
      className="hero-title text-[clamp(4.4rem,19vw,7.9rem)] max-w-[1440px]  lg:text-[clamp(5.8rem,7.2vw,6.8rem)] max-[479px]:text-[60px] lg:text-center w-full sm:text-[clamp(6.8rem,12.2vw,11.8rem)] text-second-bg font-extrabold text-right tracking-tight"
    >
      <span
        className={`inline-flex origin-bottom items-baseline transform-gpu will-change-transform
          transition-[transform,opacity,filter] duration-[1120ms]
          [transition-timing-function:cubic-bezier(0.2,1.1,0.32,1)]
          ${
            animate
              ? "translate-y-0 opacity-100 blur-0 rotate-0"
              : "translate-y-[118%] opacity-0 blur-[8px] rotate-[1.6deg]"
          }`}
        style={{ transitionDelay: animate ? "260ms" : "0ms" }}
      >
        إبني معي جسمًا أكثر
      </span>{" "}
      <span
        className={`word-slot transform relative inline-flex sm:h-[140px] h-[93px] w-[7.6ch] sm:w-[7.1ch] overflow-hidden align-baseline
          origin-bottom transform-gpu will-change-transform
          transition-[transform,opacity,filter] duration-[1120ms]
          [transition-timing-function:cubic-bezier(0.2,1.1,0.32,1)]
          ${
            animate
              ? "translate-y-0 opacity-100 blur-0 rotate-0"
              : "translate-y-[118%] opacity-0 blur-[8px] -rotate-[1.2deg]"
          }`}
        style={{ transitionDelay: animate ? "290ms" : "0ms" }}
      >
        <span className="word-slider absolute inset-0">
          <span>ضخامة</span>
          <span>قوة</span>
          <span>تناسقًا</span>
          <span>صلابة</span>
          <span>حضورًا</span>
          <span>ضخامة</span>
        </span>
      </span>{" "}
      <span
        className={`block leading-[27px] origin-bottom transform-gpu will-change-transform
          transition-[transform,opacity,filter] duration-[1120ms]
          [transition-timing-function:cubic-bezier(0.2,1.1,0.32,1)]
          ${
            animate
              ? "translate-y-0 opacity-100 blur-0 rotate-0"
              : "translate-y-[118%] opacity-0 blur-[8px] -rotate-[1.6deg]"
          }`}
        style={{ transitionDelay: animate ? "390ms" : "0ms" }}
      >
        <span className="pr-"> اليوم</span>
      </span>
    </h1>
  );
}

export default memo(HeroTitle);
