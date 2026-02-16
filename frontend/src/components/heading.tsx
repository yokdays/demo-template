import React, { useEffect, useRef, useState } from "react";

interface HeadingProps {
  text: string;
  color?: string;
}

export default function Heading({ text, color = "#b43900" }: HeadingProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!wrapperRef.current || !textRef.current) return;

    const observer = new ResizeObserver(() => {
      setTextWidth(textRef.current!.offsetWidth);
      setContainerWidth(wrapperRef.current!.offsetWidth);
    });

    observer.observe(wrapperRef.current);
    observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);

  const curveWidth = Math.min(textWidth * 0.25, 60);
  const curveDepth = 32;
  const stroke = 3;

  const remaining = Math.max(
    containerWidth - textWidth - curveWidth,
    0
  );

  const totalWidth = textWidth + curveWidth + remaining;

  useEffect(() => {
    if (pathRef.current && totalWidth > 0) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;

      requestAnimationFrame(() => {
        pathRef.current!.style.transition =
          "stroke-dashoffset 0.8s cubic-bezier(.65,.05,.36,1)";
        pathRef.current!.style.strokeDashoffset = "0";
      });
    }
  }, [totalWidth]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-full"
    >
      <h2
        ref={textRef}
        className="text-xl sm:text-2xl lg:text-3xl font-bold relative z-10 inline-block px-1 whitespace-nowrap pt-2"
      >
        {text}
      </h2>

      <svg
        width={totalWidth}
        height={60}
        className="absolute -top-6 left-0 overflow-visible pointer-events-none"
      >
        <path
          ref={pathRef}
          d={`
            M 0 15
            H ${textWidth}
            C 
              ${textWidth + curveWidth * 0.3} 15,
              ${textWidth + curveWidth * 0.7} ${15 + curveDepth},
              ${textWidth + curveWidth} ${15 + curveDepth}
            H ${totalWidth}
          `}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
