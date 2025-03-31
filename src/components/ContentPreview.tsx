import React, { useState } from 'react';
import { ContentResponse } from '@/lib/types';
import { cn } from '@/lib/utils';
import { generatePDF } from '@/lib/pdf';
import ChartRenderer from './ChartRenderer';
import FinancialDataRenderer from './FinancialDataRenderer';
import ScientificDataRenderer from './ScientificDataRenderer';
import MusicNotesRenderer from './MusicNotesRenderer';
import VisualArtsGallery from './VisualArtsGallery';
import SongDisplay from './SongDisplay';
import ChatDialog from './ChatDialog';
import { Button } from './ui/button';

interface ContentPreviewProps {
  content: ContentResponse | null;
  isGenerating: boolean;
  subject?: string;
  topic?: string;
}

const renderBoldText = (text: string) => {
  return text.split('**').map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part
  );
};

const ContentPreview: React.FC<ContentPreviewProps> = ({
  content,
  isGenerating,
  subject,
  topic
}) => {
  const [showDetailedContent, setShowDetailedContent] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const handleSavePDF = () => {
    if (content && subject && topic) {
      generatePDF(content, subject, topic);
    }
  };

  if (isGenerating) {
    return <div className="glass-card p-8 animate-pulse-soft">
      <div className="h-8 w-3/4 bg-gray-200 rounded-md mb-6"></div>
      <div className="h-20 w-full bg-gray-200 rounded-md mb-6"></div>
      <div className="space-y-4 mb-6">
        <div className="h-6 w-full bg-gray-200 rounded-md"></div>
        <div className="h-6 w-5/6 bg-gray-200 rounded-md"></div>
        <div className="h-6 w-4/6 bg-gray-200 rounded-md"></div>
      </div>
      <div className="space-y-4 mb-6">
        <div className="h-6 w-full bg-gray-200 rounded-md"></div>
        <div className="h-6 w-5/6 bg-gray-200 rounded-md"></div>
      </div>
      <div className="h-40 w-full bg-gray-200 rounded-md"></div>
    </div>;
  }

  if (!content) {
    return <div className="glass-card p-12 text-center">
      <div className="w-16 h-16 rounded-full bg-secondary mx-auto flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
          <path d="M9 8h7"></path>
          <path d="M8 12h8"></path>
          <path d="M11 16h5"></path>
        </svg>
      </div>
      <h3 className="text-xl font-medium mb-2">Content Preview</h3>
      <p className="text-muted-foreground text-sm">
        Generate educational content to see a preview here.
      </p>
    </div>
  }

  const scrollToGenerator = () => {
    const generatorSection = document.getElementById('generator');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-8 border-b border-border">
        <h2 className="text-2xl font-medium mb-2 animate-fade-in">{content.title}</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md animate-fade-in animate-delay-1">
            AI Generated
          </span>
          <span className="px-2 py-1 bg-secondary text-muted-foreground text-xs rounded-md animate-fade-in animate-delay-2">
            Educational Content
          </span>
        </div>
      </div>

      <div className="p-8">
        {content.videoUrl && <div className="mb-8 animate-fade-in">
          <h3 className="text-lg font-medium mb-3">Related YouTube Videos</h3>
          <div className="relative aspect-video bg-black/5 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">Click the link below to find related videos</p>
                <a href={content.videoUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium mt-4 inline-block px-4 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                  Search YouTube Videos
                </a>
              </div>
            </div>
          </div>
        </div>}

        <div className="prose max-w-none animate-fade-in">
          <h3 className="text-lg font-medium mb-3">Introduction</h3>
          <p className="text-muted-foreground mb-6">{content.introduction}</p>

          {(content.songLyrics || content.songChords) && (
            <SongDisplay lyrics={content.songLyrics} chords={content.songChords} />
          )}

          {content.visualArtsImages && content.visualArtsImages.length > 0 && <div className="mb-6">
            <VisualArtsGallery images={content.visualArtsImages} />
          </div>}

          {content.chartData && <div className="mb-6">
            <ChartRenderer chartData={content.chartData} />
          </div>}

          {content.musicNotes && <div className="mb-6">
            <MusicNotesRenderer musicNotes={content.musicNotes} />
          </div>}

          {content.financialData && <div className="mb-6">
            <FinancialDataRenderer financialData={content.financialData} />
          </div>}

          {content.scientificData && <div className="mb-6">
            <ScientificDataRenderer scientificData={content.scientificData} />
          </div>}

          <h3 className="text-lg font-medium mb-3">Key Points</h3>
          <ul className="space-y-2 mb-6">
            {content.keyPoints.map((point, index) => <li key={index} className={cn("flex items-start animate-fade-in", `animate-delay-${index + 1}`)}>
              <span className="mr-2 mt-1 text-primary">•</span>
              <span>{point}</span>
            </li>)}
          </ul>

          <h3 className="text-lg font-medium mb-3">Activities</h3>
          <ul className="space-y-4 mb-6">
            {content.activities.map((activity, index) => (
              <li
                key={index}
                className={cn("animate-fade-in", `animate-delay-${index + 1}`)}
              >
                <div className="flex items-center mb-1">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                    {index + 1}
                  </span>
                  <span className="font-medium">Activity {index + 1}</span>
                </div>
                <p className="text-muted-foreground pl-8">{renderBoldText(activity)}</p>
              </li>
            ))}
          </ul>


          <h3 className="text-lg font-medium mb-3">Resources</h3>
          <ul className="space-y-2 mb-6">
            {content.resources.map((resource, index) => <li key={index} className={cn("flex items-start animate-fade-in", `animate-delay-${index + 1}`)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-1 text-primary">
                <path d="m9 10 2 2 4-4"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
              <span>{resource}</span>
            </li>)}
          </ul>

          {content.codeSnippet && <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Code Snippet</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre>
                <code>{content.codeSnippet}</code>
              </pre>
            </div>
          </div>}

          {content.videoScript && <div>
            <h3 className="text-lg font-medium mb-3">Video Script</h3>
            <div className="bg-secondary p-4 rounded-lg">
              <p className="text-muted-foreground italic">
                {renderBoldText(content.videoScript)}
              </p>
            </div>
          </div>}

          {content.detailedContent && <div className="mt-8">
            <Button
              onClick={() => setShowDetailedContent(!showDetailedContent)}
              variant="outline"
              className="w-full py-6 flex items-center justify-center gap-2 text-lg font-medium premium-button text-gray-950"
            >
              {showDetailedContent ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  Hide Depth Search
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                  Depth Search
                </>
              )}
            </Button>

            {showDetailedContent && <div className="mt-6 p-6 bg-secondary/20 rounded-lg border border-secondary animate-fade-in">
              <h3 className="text-xl font-medium mb-4">In-Depth Content</h3>
              <div className="prose max-w-none text-muted-foreground">
                {content.detailedContent.split('\n\n').map((paragraph, i) => <p key={i} className="mb-4">{renderBoldText(paragraph)}</p>)}
              </div>
            </div>}
          </div>}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-4">
          <button
            onClick={handleSavePDF}
            className="flex items-center justify-center space-x-2 px-6 py-2 border border-primary rounded-full text-primary hover:bg-primary/5 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            <span>Save as PDF</span>
          </button>

          <button
            onClick={() => setChatOpen(true)}
            className="flex items-center justify-center space-x-2 px-6 py-2 border border-blue-500 rounded-full text-blue-500 hover:bg-blue-500/5 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Continue Chat</span>
          </button>

          <button onClick={scrollToGenerator} className="premium-button flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <span>Create New Content</span>
          </button>
        </div>

        {subject && topic && content && (
          <ChatDialog
            open={chatOpen}
            onOpenChange={setChatOpen}
            content={content}
            subject={subject as any}
            topic={topic}
          />
        )}
      </div>
    </div>
  );
};

export default ContentPreview;
