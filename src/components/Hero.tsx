
import React from 'react';

const Hero = () => {
  const scrollToGenerator = () => {
    const generatorSection = document.getElementById('generator');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),transparent)]"></div>
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 text-center md:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/40 backdrop-blur-sm text-sm font-medium mb-6">
              <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full mr-2">New</span>
              <span>AI-Powered Educational Content Generator</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Create Engaging 
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"> Educational </span>
              Materials with AI
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 md:max-w-lg">
              Generate high-quality, subject-specific educational materials in seconds. Perfect for teachers, tutors, and educational content creators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={scrollToGenerator}
                className="premium-button px-8 py-3 text-base font-medium"
              >
                Get Started
              </button>
              
              <a href="#subjects" className="btn-secondary px-8 py-3 text-base font-medium">
                Learn More
              </a>
            </div>
          </div>
          
          <div className="md:col-span-5 hidden md:block">
            <div className="glass-card shadow-premium overflow-hidden">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="text-xl font-semibold">Artful Learning Buddy</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg">
                    <div className="flex items-start mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-sm">🤖</span>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium mb-1">AI Assistant</p>
                        <p>What subject would you like to create content for today?</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
                    <div className="flex items-start mb-2">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-sm">👩‍🏫</span>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium mb-1">Teacher</p>
                        <p>I need a science lesson on renewable energy for 5th grade students.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/30 backdrop-blur-sm p-4 rounded-lg">
                    <div className="flex items-start mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <span className="text-sm">🤖</span>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium mb-1">AI Assistant</p>
                        <p>Perfect! I'll generate a complete science lesson with key points, activities, and even visual aids...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-background/80 backdrop-blur-md border-t border-border flex justify-between items-center">
                <span className="text-muted-foreground text-xs">Powered by Gemini 1.5 Pro</span>
                <button className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors">
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
