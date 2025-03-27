
import { ContentRequest, ContentResponse } from "./types";
import { generateVideo } from "./videoService";

// To be replaced with your actual API key
const API_KEY = "AIzaSyAAcLjiN1r6Um-OLRQC-CnEurpv3osiShs";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";

export async function generateContent(request: ContentRequest): Promise<ContentResponse> {
  try {
    const prompt = constructPrompt(request);
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const parsedContent = parseResponse(data);
    
    // Generate video if requested
    if (request.generateVideo && parsedContent.videoScript) {
      try {
        // Pass topic for YouTube search
        const videoUrl = await generateVideo(parsedContent.videoScript, request.topic, request.language);
        return {
          ...parsedContent,
          videoUrl
        };
      } catch (videoError) {
        console.error("Error generating video link:", videoError);
        // Return content without video if video generation fails
        return parsedContent;
      }
    }
    
    return parsedContent;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

function constructPrompt(request: ContentRequest): string {
  return `
Generate comprehensive educational content for a ${request.subject} lesson about "${request.topic}" 
for students in the ${request.ageGroup} age group in ${request.language} language.

Additional context about the students: ${request.additionalInfo}

Please format your response as JSON with the following structure:
{
  "title": "Catchy and descriptive title for the lesson",
  "introduction": "Brief engaging introduction to the topic",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
  "activities": ["Activity description 1", "Activity description 2"],
  "resources": ["Resource 1", "Resource 2"],
  ${request.subject === 'Coding' ? '"codeSnippet": "Sample code that demonstrates a concept",' : ''}
  "videoScript": "A short 2-minute video script that introduces the topic in an engaging way"
}

Make sure the content is engaging, age-appropriate, and educational. Include practical examples and activities that can be done with minimal resources. The content should be in ${request.language} language.
`;
}

function parseResponse(data: any): ContentResponse {
  try {
    const textResponse = data.candidates[0].content.parts[0].text;
    // Extract JSON from the response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      const parsedResponse = JSON.parse(jsonStr);
      
      return {
        title: parsedResponse.title || "Generated Lesson",
        introduction: parsedResponse.introduction || "",
        keyPoints: parsedResponse.keyPoints || [],
        activities: parsedResponse.activities || [],
        resources: parsedResponse.resources || [],
        videoScript: parsedResponse.videoScript || "",
        codeSnippet: parsedResponse.codeSnippet || "",
      };
    }
    
    throw new Error("Failed to parse JSON from response");
  } catch (error) {
    console.error("Error parsing response:", error);
    throw new Error("Failed to parse the generated content. Please try again.");
  }
}
