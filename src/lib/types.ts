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

export type ProgrammingLanguage = 
  | 'JavaScript'
  | 'Python'
  | 'C++'
  | 'Java'
  | 'C#'
  | 'Ruby'
  | 'Go'
  | 'Rust'
  | 'Swift'
  | 'PHP';

export interface ContentRequest {
  subject: Subject;
  topic: string;
  ageGroup: string;
  additionalInfo: string;
  language: Language;
  generateVideo: boolean;
  programmingLanguage?: ProgrammingLanguage;
  needsVisualArts?: boolean;
  generateSong?: boolean;
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
  chartData?: ChartData;
  financialData?: FinancialData;
  scientificData?: ScientificData;
  musicNotes?: string;
  visualArtsImages?: VisualArtsImage[];
  detailedContent?: string;
  songLyrics?: string;
  songChords?: string;
}

export interface VisualArtsImage {
  title: string;
  description: string;
  type: 'drawing' | 'painting' | 'sculpture' | 'digital' | 'photography';
  url: string;
}

export interface ChartData {
  type: 'pie' | 'bar' | 'line';
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string[];
      borderColor?: string;
    }[];
  };
}

export interface FinancialData {
  estimatedCosts: {
    category: string;
    amount: number;
  }[];
  totalEstimate: number;
  timeframe: string;
  notes: string;
}

export interface ScientificData {
  type: 'formula' | 'reaction' | 'law';
  content: string;
  explanation: string;
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
