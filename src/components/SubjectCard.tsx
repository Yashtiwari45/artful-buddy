
import React from 'react';
import { SubjectInfo } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SubjectCardProps {
  subject: SubjectInfo;
  onClick: (subject: SubjectInfo['id']) => void;
  isSelected: boolean;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick, isSelected }) => {
  return (
    <div 
      className={cn(
        "subject-card cursor-pointer",
        subject.bgClass,
        isSelected ? "ring-4 ring-primary ring-opacity-50 shadow-lg" : "hover:shadow-lg"
      )}
      onClick={() => onClick(subject.id)}
    >
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-sm mb-4">
            <span className="text-2xl" aria-hidden="true">{subject.icon}</span>
          </div>
          <h3 className="text-xl font-medium">{subject.title}</h3>
        </div>
        
        <p className="text-sm opacity-85 mb-4 flex-grow">
          {subject.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium py-1 px-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
            {isSelected ? 'Selected' : 'Select'}
          </div>
          
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={cn(
              "transition-transform duration-300", 
              isSelected ? "translate-x-0 rotate-90" : "translate-x-1"
            )}
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
