import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, PauseCircle, PlayCircle } from 'lucide-react';

// Debounce function specifically for functions that take a number argument
const debounce = (func: (newRate: number) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>; 
  return (newRate: number) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(newRate), delay);
  };
};

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false); 
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speechRate, setSpeechRate] = useState(1); 
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentCharIndex = useRef(0); 

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      
      // Manually select 4 male and 4 female voices
      const maleVoices = availableVoices.filter(voice => 
        ["Microsoft David - English (United States)", 
         "Google UK English Male", 
         "Microsoft Mark - English (United States)", 
         "Google UK English Male"].includes(voice.name));

      const femaleVoices = availableVoices.filter(voice => 
        ["Google UK English Female", 
         "Microsoft Zira - English (United States)", 
         "Google US English", 
         "Google UK English Female"].includes(voice.name));

      setVoices([...maleVoices, ...femaleVoices].slice(0, 8)); // Ensure we have 8 voices, 4 male, 4 female
      setSelectedVoice(maleVoices[0] || femaleVoices[0] || null); 
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = fetchVoices;
    }
    fetchVoices();
  }, []);

  const speak = useCallback((startFrom: number = 0) => {
    if ('speechSynthesis' in window && selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(text.slice(startFrom));
      utterance.voice = selectedVoice;
      utterance.rate = speechRate;
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false); 
        currentCharIndex.current = 0; 
      };
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          currentCharIndex.current = event.charIndex; 
        }
      };
      utteranceRef.current = utterance;
      setIsSpeaking(true);
      setIsPaused(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  }, [text, selectedVoice, speechRate]);

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false); 
      currentCharIndex.current = 0; 
    }
  };

  const pause = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handleSpeedChange = debounce((newRate: number) => {
    setSpeechRate(newRate);

    if (isSpeaking) {
      stop();
      speak(currentCharIndex.current);
    }
  }, 300); 

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = voices.find(voice => voice.name === e.target.value);
    setSelectedVoice(selected || null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="voiceSelect" className="block text-sm font-medium text-gray-700">Choose Voice</label>
        <select
          id="voiceSelect"
          value={selectedVoice?.name || ''}
          onChange={handleVoiceChange}
          className="w-full mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 bg-yellow-100 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>{voice.name} ({voice.lang})</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="speechRate" className="block text-sm font-medium text-gray-700">Speech Speed</label>
        <input
          type="range"
          id="speechRate"
          min="0.5"
          max="2"
          step="0.1"
          value={speechRate}
          onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={isSpeaking ? stop : () => speak()}
          className="flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
          <span className="ml-2">{isSpeaking ? 'Stop' : 'Read Aloud'}</span>
        </button>

        {isSpeaking && !isPaused && (
          <button
            onClick={pause}
            className="flex items-center justify-center p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            <PauseCircle size={20} />
            <span className="ml-2">Pause</span>
          </button>
        )}

        {isSpeaking && isPaused && (
          <button
            onClick={resume}
            className="flex items-center justify-center p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            <PlayCircle size={20} />
            <span className="ml-2">Resume</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TextToSpeech;
