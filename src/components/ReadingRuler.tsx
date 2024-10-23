import React, { useState, useRef, useEffect } from 'react';

interface ReadingRulerProps {
  fontSize: number;
  lineSpacing: number;
  textColor: string;
  backgroundColor: string;
  children: React.ReactNode;
}

const ReadingRuler: React.FC<ReadingRulerProps> = ({
  fontSize,
  lineSpacing,
  textColor,
  backgroundColor,
  children,
}) => {
  const [rulerPosition, setRulerPosition] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (contentRef.current) {
        const rect = contentRef.current.getBoundingClientRect();
        const relativeY = e.clientY - rect.top;
        setRulerPosition(relativeY);
      }
    };

    const currentRef = contentRef.current;
    currentRef?.addEventListener('mousemove', handleMouseMove);

    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="relative"
      ref={contentRef}
      style={{
        fontFamily: 'OpenDyslexic, Arial, sans-serif',
        fontSize: `${fontSize}px`,
        color: textColor,
        backgroundColor: backgroundColor,
        lineHeight: lineSpacing,
        padding: '16px',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        className="absolute w-full h-12 bg-yellow-300 opacity-50 pointer-events-none transition-all duration-75 ease-linear"
        style={{ top: `${rulerPosition - 24}px` }} // Centered ruler
      ></div>

      {children}
    </div>
  );
};

export default ReadingRuler;
