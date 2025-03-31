import { ContentRequest, ContentResponse, Subject } from "./types";
import { generateVideo } from "./videoService";

// To be replaced with your actual API key
const API_KEY = "AIzaSyDd-3k_XdRHhpszC80bXfBqcsrY_DeQqkQ";
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
    const parsedContent = parseResponse(data, request.subject);
    
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
  // Base prompt
  let prompt = `
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
  "videoScript": "A short 2-minute video script that introduces the topic in an engaging way",
  "detailedContent": "A very in-depth exploration of the topic covering all aspects in detail, at least 1000 words"
`;

  // Add subject-specific prompt additions
  if (request.subject === 'Visual Arts') {
    prompt += `,
  "chartData": {
    "type": "pie", // or "bar" or "line", whichever is most appropriate
    "data": {
      "labels": ["Label 1", "Label 2", "Label 3"],
      "datasets": [
        {
          "label": "Chart title",
          "data": [30, 40, 30],
          "backgroundColor": ["#ff6384", "#36a2eb", "#ffce56"]
        }
      ]
    }
  },
  "visualArtsImages": [
    {
      "title": "Example artwork title 1",
      "description": "Description of this visual artwork piece and its significance",
      "type": "drawing", // or "painting", "sculpture", "digital", "photography"
      "url": "Image URL would be here, but for now just describe what the image would show"
    },
    {
      "title": "Example artwork title 2",
      "description": "Description of this visual artwork piece and its significance",
      "type": "sculpture", // or "painting", "drawing", "digital", "photography"
      "url": "Image URL would be here, but for now just describe what the image would show"
    }
  ]`;
  } else if (request.subject === 'Performing Arts') {
    prompt += `,
  "musicNotes": "A detailed musical notation, rhythm pattern, or tune description related to the topic. If the topic is about learning an instrument like guitar, include specific techniques, chord progressions, or exercises for that instrument."`;
    
    // Add specific song generation fields if requested
    if (request.generateSong) {
      prompt += `,
  "songLyrics": "Original song lyrics about ${request.topic}, with multiple verses and a chorus that's educational, engaging and age-appropriate",
  "songChords": "Simple chord progression suggestion for the song, with notations for guitar, piano, or other common instruments"`;
    }
  } else if (request.subject === 'Coding') {
    prompt += `,
  "codeSnippet": "Sample code in ${request.programmingLanguage || 'JavaScript'} that demonstrates a concept"`;
  } else if (request.subject === 'Financial Literacy') {
    prompt += `,
  "financialData": {
    "estimatedCosts": [
      {"category": "Category 1", "amount": 1000},
      {"category": "Category 2", "amount": 2000}
    ],
    "totalEstimate": 3000,
    "timeframe": "Estimated timeframe for financial planning",
    "notes": "Additional financial notes or considerations"
  }`;
  } else if (request.subject === 'Science') {
    prompt += `,
  "scientificData": {
    "type": "formula", // or "reaction" or "law", whichever is most appropriate
    "content": "The actual formula, reaction, or law (can use LaTeX notation)",
    "explanation": "Explanation of the scientific concept"
  }`;
  }

  // Handle case when both Visual Arts and Coding are needed
  if (request.needsVisualArts && request.subject === 'Coding') {
    prompt += `,
  "chartData": {
    "type": "pie", // or "bar" or "line", whichever is most appropriate
    "data": {
      "labels": ["Label 1", "Label 2", "Label 3"],
      "datasets": [
        {
          "label": "Chart title",
          "data": [30, 40, 30],
          "backgroundColor": ["#ff6384", "#36a2eb", "#ffce56"]
        }
      ]
    }
  },
  "visualArtsImages": [
    {
      "title": "Visual representation of the coding concept",
      "description": "A visual representation showing how this coding concept works or is applied",
      "type": "digital",
      "url": "Image URL would be here, but for now just describe what the image would show"
    }
  ]`;
  }

  prompt += `
}

Make sure the content is engaging, age-appropriate, and educational. Include practical examples and activities that can be done with minimal resources. The content should be in ${request.language} language.
`;

  return prompt;
}

function parseResponse(data: any, subject: string): ContentResponse {
  try {
    const textResponse = data.candidates[0].content.parts[0].text;
    // Extract JSON from the response
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      const parsedResponse = JSON.parse(jsonStr);
      
      const response: ContentResponse = {
        title: parsedResponse.title || "Generated Lesson",
        introduction: parsedResponse.introduction || "",
        keyPoints: parsedResponse.keyPoints || [],
        activities: parsedResponse.activities || [],
        resources: parsedResponse.resources || [],
        videoScript: parsedResponse.videoScript || "",
        detailedContent: parsedResponse.detailedContent || "",
      };

      // Add subject-specific data
      if (subject === 'Coding' || parsedResponse.codeSnippet) {
        response.codeSnippet = parsedResponse.codeSnippet || "";
      }

      if ((subject === 'Visual Arts' || parsedResponse.chartData) && parsedResponse.chartData) {
        response.chartData = parsedResponse.chartData;
      }

      if ((subject === 'Visual Arts' || parsedResponse.visualArtsImages) && parsedResponse.visualArtsImages) {
        response.visualArtsImages = parsedResponse.visualArtsImages;
      }

      if (subject === 'Performing Arts' && parsedResponse.musicNotes) {
        response.musicNotes = parsedResponse.musicNotes;
      }

      // Add song lyrics and chords if present
      if (subject === 'Performing Arts') {
        if (parsedResponse.songLyrics) {
          response.songLyrics = parsedResponse.songLyrics;
        }
        if (parsedResponse.songChords) {
          response.songChords = parsedResponse.songChords;
        }
      }

      if (subject === 'Financial Literacy' && parsedResponse.financialData) {
        response.financialData = parsedResponse.financialData;
      }

      if (subject === 'Science' && parsedResponse.scientificData) {
        response.scientificData = parsedResponse.scientificData;
      }
      
      return response;
    }
    
    throw new Error("Failed to parse JSON from response");
  } catch (error) {
    console.error("Error parsing response:", error);
    throw new Error("Failed to parse the generated content. Please try again.");
  }
}

export async function generateRelatedContent(
  userQuery: string, 
  subject: Subject, 
  topic: string, 
  originalContent: ContentResponse
): Promise<string> {
  try {
    const prompt = `
You are an educational AI assistant specializing in ${subject}.
The user is asking about a lesson on "${topic}" with this title: "${originalContent.title}".

Here's a summary of the lesson content that was previously generated:
- Introduction: ${originalContent.introduction.substring(0, 200)}...
- Key points: ${originalContent.keyPoints.join(', ')}

The user's query is: "${userQuery}"

Please provide a helpful, educational response that addresses the user's question about this topic.
Keep your answer concise but informative, in a conversational style.
If the query is outside the scope of the topic, politely redirect the conversation back to the ${subject} lesson on "${topic}".
`;

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
          maxOutputTokens: 1024, // Shorter response for the chat
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating related content:", error);
    throw error;
  }
}
