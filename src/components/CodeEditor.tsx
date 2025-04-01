import React, { useEffect, useRef } from 'react';

interface CodeEditorProps {
  code: string;
  language: string;
  height?: string;
}

const getOneCompilerLanguage = (language: string): string => {
  const languageMap: { [key: string]: string } = {
    'JavaScript': 'javascript',
    'Python': 'python',
    'C++': 'cpp',
    'Java': 'java',
    'C#': 'csharp',
    'Ruby': 'ruby',
    'Go': 'go',
    'Rust': 'rust',
    'Swift': 'swift',
    'PHP': 'php'
  };
  return languageMap[language] || 'javascript';
};

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, height = '600px' }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const oneCompilerLanguage = getOneCompilerLanguage(language);

  useEffect(() => {
    // Wait for iframe to load before sending code
    const handleIframeLoad = () => {
      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage({
          eventType: 'populateCode',
          language: oneCompilerLanguage,
          files: [
            {
              name: `main.${oneCompilerLanguage}`,
              content: code
            }
          ]
        }, '*');
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      return () => iframe.removeEventListener('load', handleIframeLoad);
    }
  }, [code, oneCompilerLanguage]);

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-medium mb-4">Interactive Code Editor</h3>
      <div className="w-full overflow-hidden rounded-lg border border-border">
        <iframe
          ref={iframeRef}
          frameBorder="0"
          height={height}
          src={`https://onecompiler.com/embed/${oneCompilerLanguage}?theme=dark&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&disableCopyPaste=true&disableAutoComplete=true&hideStdin=true&hideTitle=true&codeChangeEvent=true`}
          width="100%"
        />
      </div>
    </div>
  );
};

export default CodeEditor; 