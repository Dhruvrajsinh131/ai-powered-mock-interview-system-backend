import OpenAI from "openai";
import { config } from "dotenv";

config();

class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_APIKEY,
    });
  }

  async generateLeetCodeQuestion(jobDescription: string) {
    const systemMessage = `
      You are an AI assistant that generates LeetCode-style coding questions based on job descriptions.
      - Return the response in the following JSON format:
        {
          "question": "string",
          "boilerplatecode": "string",
          "testcases": [
              {
                  "input": "string",
                  "output": "string"
              }
          ]
        }
    `;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemMessage },
          {
            role: "user",
            content: `
                - The question should be either Easy or Medium difficulty, depending on the job requirements.
                - Provide all details necessary for a coding challenge.
                -Proide all details about the question in question string will parse it on frontend. like if you return given then also give the demo data also for understang.
                -Keep quesion leetcode type
                Job Description: ${jobDescription}`,
          },
        ],
        temperature: 0.7,
      });

      const result = response.choices[0]?.message?.content;
      if (result) {
        const cleanedResult = result.replace(/```json|```/g, "").trim();
        return JSON.parse(cleanedResult);
      }
      return null;
    } catch (error) {
      console.error("Error generating LeetCode question:", error);
      throw new Error("Failed to generate coding question");
    }
  }
}

export default new OpenAIService();
