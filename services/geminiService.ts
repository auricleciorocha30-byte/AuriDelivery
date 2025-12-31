
import { GoogleGenAI } from "@google/genai";

/**
 * Analyzes a driver's profile bio and vehicle type using Gemini AI.
 */
export const analyzeDriverProfile = async (bio: string, vehicle: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise o perfil deste entregador para a AuriDelivery. Bio: "${bio}". Veículo: "${vehicle}". Forneça um breve resumo profissional e uma sugestão de treinamento ou área de atuação ideal. Responda em Português do Brasil.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Não foi possível analisar o perfil no momento.";
  }
};

/**
 * Gets logistics advice from Auri-AI based on a manager's query.
 */
export const getLogisticsAdvice = async (query: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Você é o Auri-AI, o assistente logístico da AuriDelivery. Ajude o gestor com a seguinte dúvida: "${query}". Forneça insights baseados em eficiência e satisfação do cliente.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Desculpe, tive um problema ao processar sua consulta logística.";
  }
};
