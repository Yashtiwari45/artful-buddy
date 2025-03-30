
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const scrollToGenerator = () => {
    const generatorSection = document.getElementById('generator');
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10",
        scrolled ? "bg-white bg-opacity-80 backdrop-blur-md shadow-soft" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-white font-semibold text-lg">A</span>
          </div>
          <h1 className="text-xl font-semibold">Artful Learning Buddy</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
          <a href="#subjects" className="text-sm font-medium hover:text-primary transition-colors">Subjects</a>
          <a href="#generator" className="text-sm font-medium hover:text-primary transition-colors">Create Content</a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
        </nav>
        
        <button onClick={scrollToGenerator} className="premium-button text-sm hidden md:block">
          Get Started
        </button>
        
        <button className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
