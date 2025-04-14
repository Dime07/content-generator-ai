// Define proper types for the input and output
export interface GenerateContentInput {
  duration: string;
  niche: string;
  targetAudience: string;
  tone: string;
}

export interface ContentPlannerItem {
  day: number;
  title: string;
  description: string;
  topic: string;
  hashtags: string;
  script: string[];
}

export interface ContentPlannerResponse {
  contentPlanner: ContentPlannerItem[];
}