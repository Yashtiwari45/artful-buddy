
import React, { useState } from 'react';
import { Subject, ContentRequest, SubjectInfo, Language } from '@/lib/types';
import { languages } from '@/lib/languages';
import SubjectCard from './SubjectCard';
import { cn } from '@/lib/utils';
import { generateContent } from '@/lib/gemini';

interface ContentGeneratorProps {
  onContentGenerated: (data: any) => void;
  isGenerating: boolean;
  setIsGenerating: (value: boolean) => void;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ 
  onContentGenerated, 
  isGenerating,
  setIsGenerating
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [topic, setTopic] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');
  const [generateVideo, setGenerateVideo] = useState(false);

  const subjects: SubjectInfo[] = [
    {
      id: 'Visual Arts',
      title: 'Visual Arts',
      description: 'Drawing, painting, sculpture, and other visual mediums to express creativity.',
      icon: '🎨',
      bgClass: 'bg-gradient-to-br from-blue-50 to-purple-100 text-blue-800'
    },
    {
      id: 'Performing Arts',
      title: 'Performing Arts',
      description: 'Music, dance, theater, and other performance-based artistic expressions.',
      icon: '🎭',
      bgClass: 'bg-gradient-to-br from-purple-50 to-pink-100 text-purple-800'
    },
    {
      id: 'Coding',
      title: 'Coding',
      description: 'Programming concepts, languages, and computational thinking skills.',
      icon: '💻',
      bgClass: 'bg-gradient-to-br from-blue-50 to-cyan-100 text-cyan-800'
    },
    {
      id: 'Financial Literacy',
      title: 'Financial Literacy',
      description: 'Understanding money, budgeting, investing, and personal finance concepts.',
      icon: '💰',
      bgClass: 'bg-gradient-to-br from-green-50 to-emerald-100 text-emerald-800'
    },
    {
      id: 'Science',
      title: 'Science',
      description: 'Exploring biology, chemistry, physics, and other scientific disciplines.',
      icon: '🔬',
      bgClass: 'bg-gradient-to-br from-amber-50 to-yellow-100 text-amber-800'
    }
  ];

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const handleNext = () => {
    if (step === 1 && !selectedSubject) {
      setError('Please select a subject to continue');
      return;
    }
    
    if (step === 2) {
      if (!topic.trim()) {
        setError('Please enter a topic');
        return;
      }
      if (!ageGroup.trim()) {
        setError('Please specify an age group');
        return;
      }
    }
    
    setError('');
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSubject || !topic || !ageGroup) {
      setError('Please fill all required fields');
      return;
    }
    
    setError('');
    setIsGenerating(true);
    
    try {
      const request: ContentRequest = {
        subject: selectedSubject,
        topic,
        ageGroup,
        additionalInfo: additionalInfo || 'No additional information provided.',
        language: selectedLanguage,
        generateVideo
      };
      
      const response = await generateContent(request);
      onContentGenerated(response);
      
    } catch (error) {
      console.error("Error generating content:", error);
      setError('An error occurred while generating content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="generator" className="py-24 bg-secondary/50">
      <div className="container max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-sm font-medium mb-4">
            AI-Powered
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Generate Educational Content
          </h2>
          <p className="text-muted-foreground">
            Create custom, high-quality educational materials for your students in just a few clicks.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-10">
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      step === stepNumber 
                        ? "bg-primary text-white" 
                        : step > stepNumber 
                          ? "bg-primary/20 text-primary" 
                          : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {step > stepNumber ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      stepNumber
                    )}
                  </div>
                  
                  {stepNumber < 3 && (
                    <div 
                      className={cn(
                        "hidden md:block w-24 h-[2px]",
                        step > stepNumber ? "bg-primary" : "bg-secondary"
                      )}
                    ></div>
                  )}
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className={cn("transition-all duration-500", step === 1 ? "block" : "hidden")}>
                <h3 className="text-xl font-medium mb-6">Select a Subject</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((subject) => (
                    <SubjectCard 
                      key={subject.id}
                      subject={subject}
                      onClick={handleSelectSubject}
                      isSelected={selectedSubject === subject.id}
                    />
                  ))}
                </div>
              </div>
              
              <div className={cn("space-y-6 transition-all duration-500", step === 2 ? "block" : "hidden")}>
                <h3 className="text-xl font-medium mb-6">Topic Information</h3>
                
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium mb-2">
                    Topic <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Introduction to Watercolor Painting"
                    className="subtle-input w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="ageGroup" className="block text-sm font-medium mb-2">
                    Age Group <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ageGroup"
                    type="text"
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    placeholder="e.g., 10-12 years old"
                    className="subtle-input w-full"
                  />
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium mb-2">
                    Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="language"
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                    className="subtle-input w-full"
                  >
                    {languages.map((language) => (
                      <option key={language.code} value={language.code}>
                        {language.name} ({language.nativeName})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    id="generateVideo"
                    type="checkbox"
                    checked={generateVideo}
                    onChange={(e) => setGenerateVideo(e.target.checked)}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <label htmlFor="generateVideo" className="ml-2 block text-sm font-medium">
                    Generate Video Tutorial
                  </label>
                </div>
              </div>
              
              <div className={cn("space-y-6 transition-all duration-500", step === 3 ? "block" : "hidden")}>
                <h3 className="text-xl font-medium mb-6">Additional Information</h3>
                
                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2">
                    Context About Students (Optional)
                  </label>
                  <textarea
                    id="additionalInfo"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="e.g., Most students are beginners with limited prior experience, but they are highly motivated to learn."
                    className="subtle-input w-full min-h-[120px]"
                  />
                </div>
                
                <div className="flex items-center space-x-2 p-4 rounded-lg bg-blue-50 text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <p className="text-sm">
                    Providing more context will help generate more personalized content.
                  </p>
                </div>
              </div>
              
              {error && (
                <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                  {error}
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center space-x-2 px-6 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    <span>Back</span>
                  </button>
                ) : (
                  <div></div>
                )}
                
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="premium-button flex items-center space-x-2"
                  >
                    <span>Continue</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className={cn(
                      "premium-button flex items-center space-x-2",
                      isGenerating && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate Content</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentGenerator;
