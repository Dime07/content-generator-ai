import { aiClient } from "../utils/openai";

interface GenerateContentByAI {
  duration: string;
  niche: string;
  targetAudience: string;
  tone: string;
}

export const generateContentByAi = async ({
  duration,
  niche,
  targetAudience,
  tone,
}: GenerateContentByAI) => {
  const generated = await aiClient.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      { role: "system", content: `You're a professional content planner. Generate a Content Planner for ${duration} days, focusing on ${niche}. The target audience is ${targetAudience}, and the tone should be ${tone}. give me the response as json only, in array object per day in bahasa indonesia with consistent format, except for field script you can give response like the best 5 of script:
      {
            "contentPlanner": [
                {
                "day": 1,
                "title": "Judul Konten",
                "description": "Deskripsi singkat",
                "topic": "Topik kontent",
                "hashtags: "list hashtag yang bagus",
                "script": ["list point utama", "list point kedua"]
                },
            ]
        }
      `, },
    ],
    response_format: {type: "json_object"}
  });

  const result = JSON.parse(generated?.choices[0]?.message?.content ?? "")


  return result;
};
