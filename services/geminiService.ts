import { GoogleGenAI } from "@google/genai";
import { WorkoutLog } from "../types";

export async function getWorkoutAnalysis(history: WorkoutLog[]) {
  if (!history || history.length === 0) {
    return "Absolviere dein erstes Training, damit ich deinen Fortschritt analysieren kann.";
  }

  // Initialisierung gemäß @google/genai Guidelines mit Named Parameter
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analysiere meinen Workout-Verlauf: ${JSON.stringify(history.slice(0, 5))}. Gib mir 3 kurze, prägnante Tipps zur Verbesserung auf Deutsch. Antworte in klaren Bulletpoints.`,
      config: {
        systemInstruction: "Du bist ein Weltklasse-Fitnesscoach. Deine Sprache ist motivierend, professionell und auf den Punkt gebracht. Vermeide unnötiges Gerede."
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Die KI-Analyse ist gerade im Pausenmodus. Überprüfe deine Internetverbindung oder deinen API-Schlüssel.";
  }
}