import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

class ChatbotService {
  static async getResponse(prompt: string) {
    const body = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    const response = await axios.post(GEMINI_API_URL, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return content || 'No response from AI';
  }
}

export default ChatbotService;
