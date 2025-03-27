
export type Subject = 
  | 'Visual Arts'
  | 'Performing Arts'
  | 'Coding'
  | 'Financial Literacy'
  | 'Science';

export type Language =
  | 'English'
  | 'Hindi'
  | 'Bengali'
  | 'Telugu'
  | 'Marathi'
  | 'Tamil'
  | 'Urdu'
  | 'Gujarati'
  | 'Kannada'
  | 'Malayalam'
  | 'Spanish'
  | 'French'
  | 'German'
  | 'Chinese'
  | 'Japanese'
  | 'Arabic';

export interface ContentRequest {
  subject: Subject;
  topic: string;
  ageGroup: string;
  additionalInfo: string;
  language: Language;
  generateVideo: boolean;
}

export interface ContentResponse {
  title: string;
  introduction: string;
  keyPoints: string[];
  activities: string[];
  resources: string[];
  videoScript?: string;
  codeSnippet?: string;
  videoUrl?: string;
}

export interface SubjectInfo {
  id: Subject;
  title: Subject;
  description: string;
  icon: string;
  bgClass: string;
}

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}
