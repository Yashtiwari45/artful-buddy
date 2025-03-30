import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ContentGenerator from '@/components/ContentGenerator';
import ContentPreview from '@/components/ContentPreview';
import Footer from '@/components/Footer';
import { ContentResponse, Subject } from '@/lib/types';

const Index = () => {
  const [generatedContent, setGeneratedContent] = useState<ContentResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<Subject | undefined>(undefined);
  const [currentTopic, setCurrentTopic] = useState<string | undefined>(undefined);

  const handleContentGenerated = (content: ContentResponse, subject: Subject, topic: string) => {
    setGeneratedContent(content);
    setCurrentSubject(subject);
    setCurrentTopic(topic);
    // Scroll to the preview section
    const previewSection = document.getElementById('preview');
    if (previewSection) {
      previewSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToGenerator = () => {
    const generatorSection = document.getElementById('generator');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Hero />
        
        {/* Subjects Section */}
        <section id="subjects" className="py-24">
          <div className="container max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-sm font-medium mb-4">
                Educational Categories
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Explore Learning Subjects
              </h2>
              <p className="text-muted-foreground">
                Generate educational content across various domains to enhance your students' learning experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Visual Arts */}
              <div className="glass-card overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <span className="text-6xl">🎨</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">Visual Arts</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore drawing, painting, sculpture, and design principles through engaging creative exercises.
                  </p>
                  <button 
                    onClick={scrollToGenerator} 
                    className="inline-flex items-center font-medium text-primary hover:underline"
                  >
                    Create Content
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Performing Arts */}
              <div className="glass-card overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                  <span className="text-6xl">🎭</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">Performing Arts</h3>
                  <p className="text-muted-foreground mb-4">
                    Discover music, dance, theater, and expression through performance-based educational material.
                  </p>
                  <button 
                    onClick={scrollToGenerator}
                    className="inline-flex items-center font-medium text-primary hover:underline"
                  >
                    Create Content
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Coding */}
              <div className="glass-card overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center">
                  <span className="text-6xl">💻</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">Coding</h3>
                  <p className="text-muted-foreground mb-4">
                    Learn programming concepts, computational thinking, and creative problem-solving through code.
                  </p>
                  <button 
                    onClick={scrollToGenerator}
                    className="inline-flex items-center font-medium text-primary hover:underline"
                  >
                    Create Content
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Financial Literacy */}
              <div className="glass-card overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                  <span className="text-6xl">💰</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">Financial Literacy</h3>
                  <p className="text-muted-foreground mb-4">
                    Build understanding of money management, budgeting, investing, and personal finance skills.
                  </p>
                  <button 
                    onClick={scrollToGenerator}
                    className="inline-flex items-center font-medium text-primary hover:underline"
                  >
                    Create Content
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Science */}
              <div className="glass-card overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center">
                  <span className="text-6xl">🔬</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">Science</h3>
                  <p className="text-muted-foreground mb-4">
                    Explore biology, chemistry, physics, and other scientific disciplines through engaging experiments.
                  </p>
                  <button 
                    onClick={scrollToGenerator}
                    className="inline-flex items-center font-medium text-primary hover:underline"
                  >
                    Create Content
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Features */}
              <div className="glass-card overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-medium mb-4">Key Features</h3>
                  <ul className="space-y-4 flex-grow">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>AI-Generated Educational Content</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Multiple Subject Areas</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Age-Appropriate Materials</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Customizable Content</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2 mt-0.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Video Script Generation</span>
                    </li>
                  </ul>
                  <button 
                    onClick={scrollToGenerator}
                    className="inline-flex items-center font-medium text-primary hover:underline mt-4"
                  >
                    Explore All Features
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Content Generator Section */}
        <ContentGenerator 
          onContentGenerated={handleContentGenerated}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
        
        {/* Content Preview Section */}
        <section id="preview" className="py-24">
          <div className="container max-w-7xl mx-auto px-6 md:px-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-sm font-medium mb-4">
                Preview
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Your Generated Content
              </h2>
              <p className="text-muted-foreground">
                Review and utilize your AI-generated educational materials.
              </p>
            </div>
            
            <ContentPreview 
              content={generatedContent} 
              isGenerating={isGenerating}
              subject={currentSubject}
              topic={currentTopic}
            />
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-24 bg-secondary/30">
          <div className="container max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="glass-card p-1 shadow-premium">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center">
                    <div className="text-8xl">💡</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-sm font-medium">
                  About The Project
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold">
                  Empowering Education with AI
                </h2>
                <p className="text-muted-foreground">
                  The Artful Learning Buddy was created to address the challenges faced by educators in creating high-quality, engaging educational content at scale. By leveraging AI technology, we automate the generation of customized learning materials across multiple subjects.
                </p>
                <p className="text-muted-foreground">
                  Our platform serves as a valuable resource for educators and institutions looking to provide personalized learning experiences for students in Visual Arts, Performing Arts, Coding, Financial Literacy, and Science.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={scrollToGenerator}
                    className="premium-button inline-flex items-center space-x-2"
                  >
                    <span>Try It Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
