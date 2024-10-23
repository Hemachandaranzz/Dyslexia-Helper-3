import React, { useState } from 'react';
import TextCustomizer from './TextCustomizer';
import ReadingRuler from './ReadingRuler';

const ReadingArea: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineSpacing, setLineSpacing] = useState<number>(1.5);
  const [fontFamily, setFontFamily] = useState<string>('OpenDyslexic');
  const [textColor, setTextColor] = useState<string>('#333333');
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');

  return (
    <div>
      <TextCustomizer
        fontSize={fontSize}
        setFontSize={setFontSize}
        lineSpacing={lineSpacing}
        setLineSpacing={setLineSpacing}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        textColor={textColor}
        setTextColor={setTextColor}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />

      <ReadingRuler
        fontSize={fontSize}
        lineSpacing={lineSpacing}
        fontFamily={fontFamily} 
        textColor={textColor}
        backgroundColor={backgroundColor}
      >
        <p>This is an example of customizable text with dyslexia-friendly options.</p>
        <p>Adjust font, size, spacing, and colors for better readability.</p>
      </ReadingRuler>
    </div>
  );
};

export default ReadingArea;
