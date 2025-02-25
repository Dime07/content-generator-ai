import OpenAI from 'openai';

export const aiClient = new OpenAI({
  apiKey: process.env['API_KEY'],
});