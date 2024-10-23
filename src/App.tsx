import React, { useState } from 'react';
import { Book, Settings } from 'lucide-react'; // Remove Volume2 since it's not used
import TextCustomizer from './components/TextCustomizer';
import ReadingRuler from './components/ReadingRuler';
import TextToSpeech from './components/TextToSpeech';

const sampleText = `The Adventure of Leo the Little Squirrel
In the heart of a bustling oak forest lived a young squirrel named Leo...`;

function App() {
  const [fontSize, setFontSize] = useState(16);
  const [lineSpacing, setLineSpacing] = useState(1.5);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <Book className="mr-2" /> DyslexiaReader
          </h1>
          <nav>
            <button className="p-2 hover:bg-blue-700 rounded">
              <Settings />
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 flex flex-col md:flex-row gap-4">
        <section className="md:w-1/4 bg-white p-4 rounded shadow">
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
        </section>

        <section className="md:w-3/4 bg-white p-4 rounded shadow">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Reading Area</h2>
            <TextToSpeech text={sampleText} />
          </div>
          <div
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineSpacing,
              fontFamily,
              color: textColor,
              backgroundColor: backgroundColor, // Ensure styles are passed correctly
            }}
            className="p-4 rounded"
          >
            <ReadingRuler>
              {sampleText}
            </ReadingRuler>
          </div>
        </section>
      </main>

      <footer className="bg-gray-200 text-center p-4">
        <p>&copy; 2024 DyslexiaReader. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
