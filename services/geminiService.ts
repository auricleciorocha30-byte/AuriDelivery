
import { GoogleGenAI } from "@google/genai";

// Acesso seguro ao process.env para evitar erros em tempo de execução no browser
const getApiKey = () => {
  try {
    return typeof process !== 'undefined' ? process.env.API_KEY || "" : "";
  } catch (e) {
    return "";
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const analyzeDriverProfile = async (bio: string, vehicle: string) => {
  const key = getApiKey();
  if (!key) return "Análise indisponível (Chave de API não configurada).";

  try {
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

export const getLogisticsAdvice = async (query: string) => {
  const key = getApiKey();
  if (!key) return "O assistente Auri-AI está em manutenção.";

  try {
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
