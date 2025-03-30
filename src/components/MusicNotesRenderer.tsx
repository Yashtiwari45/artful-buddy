
import React from 'react';

interface MusicNotesRendererProps {
  musicNotes: string;
}

const MusicNotesRenderer: React.FC<MusicNotesRendererProps> = ({ musicNotes }) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium mb-4">Musical Expression</h3>
      <div className="bg-secondary p-6 rounded-lg flex flex-col items-center">
        <div className="mb-4 text-4xl flex items-center gap-4">
          <span>🎵</span>
          <span>🎸</span>
          <span>🎹</span>
        </div>
        <div className="font-mono text-center p-4 border-2 border-dashed border-primary/30 rounded-lg w-full">
          {musicNotes}
        </div>
        <div className="mt-6 w-full">
          <h4 className="text-sm font-medium mb-2">Instrument Suggestions:</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-primary/10 p-2 rounded-lg">Guitar</div>
            <div className="bg-primary/10 p-2 rounded-lg">Piano</div>
            <div className="bg-primary/10 p-2 rounded-lg">Violin</div>
          </div>
        </div>
      </div>
      <div className="mt-4 text-muted-foreground text-sm">
        <p>This musical notation or rhythm pattern represents an artistic expression related to the lesson topic. It can be performed on various instruments.</p>
        <p className="mt-2 text-primary-foreground">Learn more about musical techniques and instrument handling in our comprehensive guides.</p>
      </div>
    </div>
  );
};

export default MusicNotesRenderer;
