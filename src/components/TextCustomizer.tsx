import React from 'react';
import '../fonts.css';

interface TextCustomizerProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  lineSpacing: number;
  setLineSpacing: (spacing: number) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const TextCustomizer: React.FC<TextCustomizerProps> = ({
  fontSize,
  setFontSize,
  lineSpacing,
  setLineSpacing,
  fontFamily,
  setFontFamily,
  textColor,
  setTextColor,
  backgroundColor,
  setBackgroundColor,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">Customize Text</h2>

      {/* Font Size */}
      <div>
        <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">
          Font Size: {fontSize}px
        </label>
        <input
          type="range"
          id="fontSize"
          min="12"
          max="32"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Line Spacing */}
      <div>
        <label htmlFor="lineSpacing" className="block text-sm font-medium text-gray-700">
          Line Spacing: {lineSpacing}
        </label>
        <input
          type="range"
          id="lineSpacing"
          min="1"
          max="3"
          step="0.1"
          value={lineSpacing}
          onChange={(e) => setLineSpacing(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Font Family */}
      <div>
        <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700">
          Font Family
        </label>
        <select
          id="fontFamily"
          value={fontFamily} // Ensure it reflects the selected value
          onChange={(e) => setFontFamily(e.target.value)} // Update state when a new font is selected
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="OpenDyslexic">OpenDyslexic (Recommended)</option>
          <option value="Lexie Readable">Lexie Readable</option>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Courier New">Courier New</option>
          <option value="Dyslexie">Dyslexie</option>
          <option value="Century Gothic">Century Gothic</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
        </select>
      </div>

      {/* Text Color */}
      <div>
        <label htmlFor="textColor" className="block text-sm font-medium text-gray-700">
          Text Color
        </label>
        <input
          type="color"
          id="textColor"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="mt-1 block w-full"
        />
      </div>

      {/* Background Color */}
      <div>
        <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700">
          Background Color
        </label>
        <input
          type="color"
          id="backgroundColor"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          className="mt-1 block w-full"
        />
      </div>
    </div>
  );
};

export default TextCustomizer;
