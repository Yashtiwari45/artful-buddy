
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ContentRequest, ContentResponse, Subject, Language, ProgrammingLanguage } from '@/lib/types';
import { subjects } from '@/lib/subjects';
import { languages } from '@/lib/languages';
import { generateContent } from '@/lib/gemini';
import { useToast } from '@/components/ui/use-toast';
import SubjectCard from './SubjectCard';

const formSchema = z.object({
  subject: z.string(),
  topic: z.string().min(2, {
    message: "Topic must be at least 2 characters.",
  }),
  ageGroup: z.string().min(2, {
    message: "Please specify an age group.",
  }),
  additionalInfo: z.string(),
  language: z.string(),
  generateVideo: z.boolean().default(false),
  programmingLanguage: z.string().optional(),
  needsVisualArts: z.boolean().default(false),
  generateSong: z.boolean().default(false),
});

interface ContentGeneratorProps {
  onContentGenerated: (content: ContentResponse, subject: Subject, topic: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({ onContentGenerated, isGenerating, setIsGenerating }) => {
  const [activeTab, setActiveTab] = useState("form");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      topic: "",
      ageGroup: "",
      additionalInfo: "",
      language: "English",
      generateVideo: false,
      needsVisualArts: false,
      generateSong: false,
    },
  });

  const handleSubjectCardClick = (subject: Subject) => {
    setSelectedSubject(subject);
    form.setValue("subject", subject);
    setActiveTab("form");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    
    try {
      const request: ContentRequest = {
        subject: values.subject as Subject,
        topic: values.topic,
        ageGroup: values.ageGroup,
        additionalInfo: values.additionalInfo,
        language: values.language as Language,
        generateVideo: values.generateVideo,
        needsVisualArts: values.needsVisualArts,
        generateSong: values.generateSong,
      };
      
      if (values.subject === 'Coding' && values.programmingLanguage) {
        request.programmingLanguage = values.programmingLanguage as ProgrammingLanguage;
      }
      
      const content = await generateContent(request);
      onContentGenerated(content, values.subject as Subject, values.topic);
      
      toast({
        title: "Content Generated!",
        description: "Your educational content has been created successfully.",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate content. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="generator" className="py-24 bg-gradient-to-b from-accent/30 to-accent/10">
      <div className="container max-w-4xl mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-gradient-primary">
          Generate Educational Content
        </h2>
        
        <div className="glass-card p-6 md:p-8 shadow-premium">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full bg-secondary/50 border border-secondary rounded-xl mb-6 p-1">
              <TabsTrigger 
                value="subjects" 
                className="text-base transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                Choose Subject
              </TabsTrigger>
              <TabsTrigger 
                value="form" 
                className="text-base transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                Content Details
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="subjects" className="mt-6 animate-fade-in-up">
              <p className="text-muted-foreground text-center mb-8 italic">
                Select a subject to start generating content
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject) => (
                  <SubjectCard 
                    key={subject.id} 
                    subject={subject} 
                    onClick={() => handleSubjectCardClick(subject.id)}
                    isSelected={selectedSubject === subject.id}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="form" className="mt-6 animate-fade-in">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-border/40 shadow-soft">
                    <h3 className="text-lg font-medium text-foreground mb-4">Subject Information</h3>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Selected Subject</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Subject" 
                                {...field} 
                                disabled 
                                className="subtle-input bg-background/70 border-0 focus:ring-primary/30"
                              />
                            </FormControl>
                            <FormDescription className="text-xs italic">
                              This is the subject you want to generate content for
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Topic</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="What specific topic do you want to teach?" 
                                {...field} 
                                className="subtle-input bg-background/70 border-0 focus:ring-primary/30" 
                              />
                            </FormControl>
                            <FormDescription className="text-xs italic">
                              Be specific about what you want to teach
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-border/40 shadow-soft">
                    <h3 className="text-lg font-medium text-foreground mb-4">Audience Details</h3>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="ageGroup"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Age Group</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., Elementary School (6-10 years)" 
                                {...field} 
                                className="subtle-input bg-background/70 border-0 focus:ring-primary/30" 
                              />
                            </FormControl>
                            <FormDescription className="text-xs italic">
                              The age range for your audience
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="additionalInfo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Additional Information</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any additional information about the students or special requirements?"
                                className="resize-none subtle-input bg-background/70 min-h-[100px] border-0 focus:ring-primary/30"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs italic">
                              Learning style preferences, special needs, cultural considerations, etc.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-border/40 shadow-soft">
                    <h3 className="text-lg font-medium text-foreground mb-4">Content Preferences</h3>
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground/80">Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="subtle-input bg-background/70 border-0 focus:ring-primary/30">
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[300px]">
                                {languages.map((language) => (
                                  <SelectItem key={language.code} value={language.code}>
                                    {language.name} ({language.nativeName})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-xs italic">
                              What language should the content be in?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {form.getValues("subject") === 'Coding' && (
                        <FormField
                          control={form.control}
                          name="programmingLanguage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground/80">Programming Language</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="subtle-input bg-background/70 border-0 focus:ring-primary/30">
                                    <SelectValue placeholder="Select programming language" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="JavaScript">JavaScript</SelectItem>
                                  <SelectItem value="Python">Python</SelectItem>
                                  <SelectItem value="C++">C++</SelectItem>
                                  <SelectItem value="Java">Java</SelectItem>
                                  <SelectItem value="C#">C#</SelectItem>
                                  <SelectItem value="Ruby">Ruby</SelectItem>
                                  <SelectItem value="Go">Go</SelectItem>
                                  <SelectItem value="Rust">Rust</SelectItem>
                                  <SelectItem value="Swift">Swift</SelectItem>
                                  <SelectItem value="PHP">PHP</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription className="text-xs italic">
                                What programming language should the code examples use?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <div className="bg-primary/5 rounded-lg p-4 space-y-4">
                        <h4 className="text-sm font-medium text-foreground/90">Additional Options</h4>
                        <div className="flex flex-col gap-4">
                          <FormField
                            control={form.control}
                            name="generateVideo"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
                                <div>
                                  <FormLabel className="text-foreground/80">Generate Video Script</FormLabel>
                                  <FormDescription className="text-xs italic">
                                    Include a script for creating an educational video
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-primary"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          {form.getValues("subject") === 'Coding' && (
                            <FormField
                              control={form.control}
                              name="needsVisualArts"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
                                  <div>
                                    <FormLabel className="text-foreground/80">Include Visual Elements</FormLabel>
                                    <FormDescription className="text-xs italic">
                                      Add visual explanations to aid learning
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-primary"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          )}

                          {form.getValues("subject") === 'Performing Arts' && (
                            <FormField
                              control={form.control}
                              name="generateSong"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0 rounded-md border p-4">
                                  <div>
                                    <FormLabel className="text-foreground/80">Generate Song</FormLabel>
                                    <FormDescription className="text-xs italic">
                                      Include a song to help teach the concept
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-primary"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-center">
                    <Button 
                      type="submit" 
                      disabled={isGenerating}
                      className="premium-button w-full md:w-auto text-base py-6 px-10"
                    >
                      {isGenerating ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating Content...
                        </span>
                      ) : (
                        "Generate Educational Content"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ContentGenerator;
