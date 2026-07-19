import { GoogleGenAI } from '@google/genai';

// Initialize Gemini AI client using the environment variables
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export async function generateAiHint(task, hintCount) {
  if (!task) return "No task loaded";
  
  // API Request
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      // Task details, that are given to the prompt
      contents: `
        Concepts: "${task.concept}"
        Type: "${task.type}"
        Task: "${task.explanation}"
        Options: ${task.content ? task.content.join(', ') : ''}
        Hint Number ${hintCount + 1}.
      `,
      // Prompt to AI
      config: {
        systemInstruction: `You are an intelligent tutoring system. Always give only one clear hint.
        Never directly reveal the final result or the correct solution (solution is: "${task.solution}"). Adjust the hint based on the difficulty (difficulty is: "${task.difficulty}") 
        and use the hints given in the task object (hints are: "${task.hints}") as a guidline for formulating your hint. Alternate the hints given in ${task.hints} for your own reply. 
        Give hints in english.`,
      }
    });
    return response.text;
  } catch (error) {
    console.error(error);
    return "Error while loading the hint.";
  }
}