
import React from 'react';

interface SongDisplayProps {
  lyrics?: string;
  chords?: string;
}

const SongDisplay: React.FC<SongDisplayProps> = ({ lyrics, chords }) => {
  if (!lyrics && !chords) return null;
  
  return (
    <div className="song-display mb-8">
      <h3 className="text-lg font-medium mb-3">Generated Song</h3>
      
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
        {lyrics && (
          <div className="mb-6">
            <h4 className="text-base font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <circle cx="5.5" cy="17.5" r="2.5"/>
                <circle cx="18.5" cy="17.5" r="2.5"/>
                <path d="M5.5 17.5V6.5a2 2 0 0 1 2-2h12.01a1.97 1.97 0 0 1 1.99 1.98v10.02a2 2 0 0 1-2 2h-12"/>
                <path d="M8 15V8h10"/>
              </svg>
              Lyrics
            </h4>
            <div className="bg-white/80 p-4 rounded-md whitespace-pre-line text-gray-800 font-serif italic">
              {lyrics}
            </div>
          </div>
        )}
        
        {chords && (
          <div>
            <h4 className="text-base font-medium mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M2 2v20"/>
                <rect x="6" y="8" width="4" height="12" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
                <rect x="22" y="12" width="0.01" height="0.01"/>
              </svg>
              Chord Progression
            </h4>
            <div className="bg-white/80 p-4 rounded-md font-mono text-gray-800">
              {chords}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongDisplay;
