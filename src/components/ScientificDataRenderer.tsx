
import React from 'react';
import { ScientificData } from '@/lib/types';

interface ScientificDataRendererProps {
  scientificData: ScientificData;
}

const ScientificDataRenderer: React.FC<ScientificDataRendererProps> = ({ scientificData }) => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium mb-4">
        {scientificData.type === 'formula' && 'Mathematical Formula'}
        {scientificData.type === 'reaction' && 'Chemical Reaction'}
        {scientificData.type === 'law' && 'Scientific Law/Concept'}
      </h3>
      <div className="mb-4 p-4 bg-secondary rounded-lg">
        <pre className="font-mono text-lg overflow-x-auto whitespace-pre-wrap">
          {scientificData.content}
        </pre>
      </div>
      <div className="text-muted-foreground">
        <h4 className="text-foreground font-medium mb-2">Explanation:</h4>
        <p>{scientificData.explanation}</p>
      </div>
    </div>
  );
};

export default ScientificDataRenderer;
