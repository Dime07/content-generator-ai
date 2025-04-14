import { ContentPlannerResponse, GenerateContentInput } from "../types/openai.type";
import { aiClient } from "../utils/openai";

export const generateContentByAi = async ({
  duration,
  niche,
  targetAudience,
  tone,
}: GenerateContentInput): Promise<ContentPlannerResponse> => {

  try {
    const generated = await aiClient.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: `You're a professional content planner. Generate a Content Planner for ${duration} days, focusing on ${niche}. The target audience is ${targetAudience}, and the tone should be ${tone}. 
          
          Provide the response as JSON only, in an array of objects per day in Bahasa Indonesia with consistent format.
          For the script field, provide 5 well-structured key points.
          
          Response format must be:
          {
            "contentPlanner": [
              {
                "day": 1,
                "title": "Judul Konten",
                "description": "Deskripsi singkat",
                "topic": "Topik konten",
                "hashtags": "list hashtag yang bagus",
                "script": ["point utama", "point kedua", "point ketiga", "point keempat", "point kelima"]
              }
            ]
          }`
        },
      ],
      stream:false,
    });


    if (!generated?.choices[0]?.message?.content) {
      throw new Error("Failed to generate content: Empty response from API");
    }

    // Parse the response
    const result = JSON.parse(generated.choices[0].message.content) as ContentPlannerResponse;
    
    return result;
  } catch (error: any) {
    // Simplified error handling
    if (error.response) {
      throw new Error(`API error: ${error.response.status} - ${error.response.data?.error?.message || 'Unknown API error'}`);
    }
    
    throw new Error(`Content generation failed: ${error.message || 'Unknown error'}`);
  }
};
