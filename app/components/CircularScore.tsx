"use client";

import { useEffect, useState, memo } from "react";

interface CircularScoreProps {
  value: number;
}

const CircularScore = ({ value }: CircularScoreProps) => {
  const [percent, setPercent] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let animFrame: number;
    let cancelled = false;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (cancelled) return;
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Animate progress up to target value over 1000ms
      const duration = 1000;
      if (elapsed <= duration) {
        const factor = elapsed / duration;
        // Ease-out cubic formula
        const easeOut = 1 - Math.pow(1 - factor, 3);
        const currentVal = Math.round(easeOut * value);
        
        setPercent(easeOut * value);
        setScore(currentVal);
        
        animFrame = window.requestAnimationFrame(animate);
      } else {
        setPercent(value);
        setScore(value);
      }
    };

    animFrame = window.requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      if (animFrame) {
        window.cancelAnimationFrame(animFrame);
      }
    };
  }, [value]);

  return (
    <div
      className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full p-[3px] sm:p-[4px] md:p-[5px] select-none transition-all duration-300"
      style={{
        background: `conic-gradient(#F98A1A 0%, #F98A1A ${percent}%, #d1d9e6 ${percent}%, #d1d9e6 100%)`,
        zIndex: 2,
      }}
    >
      <div className="h-full w-full rounded-full bg-[#e6e7ee] shadow-[inset_2px_2px_4px_#b8c4d2,_inset_-2px_-2px_4px_#ffffff] flex flex-col items-center justify-center leading-none">
        <span className="text-[11px] sm:text-xs md:text-sm font-black text-[#313842]">
          {score}
        </span>
        <span className="text-[6px] sm:text-[7px] md:text-[8px] font-bold text-gray-500 uppercase tracking-tight">
          Pts
        </span>
      </div>
    </div>
  );
};

export default memo(CircularScore);
