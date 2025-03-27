
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-primary opacity-5 animate-float"></div>
        <div className="absolute top-1/3 right-1/5 w-96 h-96 rounded-full bg-blue-300 opacity-5 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-purple-300 opacity-5 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 md:pr-12">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary-foreground text-sm font-medium mb-4 animate-fade-in">
                Revolutionizing Educational Content
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight md:leading-tight lg:leading-tight animate-fade-in animate-delay-1">
                AI-Powered Educational <span className="text-primary">Content Creation</span>
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground animate-fade-in animate-delay-2">
              Effortlessly generate high-quality, personalized learning materials across Visual Arts, Performing Arts, Coding, Financial Literacy, and Science for your students.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4 animate-fade-in animate-delay-3">
              <a href="#generator" className="premium-button text-center">
                Create Content Now
              </a>
              <a href="#subjects" className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-full hover:bg-primary/5 transition-colors duration-300 font-medium text-center">
                Explore Subjects
              </a>
            </div>
            
            <div className="flex items-center space-x-4 animate-fade-in animate-delay-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-white">
                  <span className="text-xs font-medium">AP</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center border-2 border-white">
                  <span className="text-xs font-medium">JL</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center border-2 border-white">
                  <span className="text-xs font-medium">MK</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">500+</span> educators already using our platform
              </p>
            </div>
          </div>
          
          <div className="relative animate-fade-in animate-delay-2">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-premium bg-white p-2">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-secondary flex items-center justify-center">
                <div className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                      <path d="m9 12 2 2 4-4"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Content Preview</h3>
                  <p className="text-muted-foreground text-sm">
                    Generate your first educational content to see it here.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-3xl rotate-12 bg-primary/10 -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-3xl -rotate-12 bg-accent/40 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
