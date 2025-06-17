export interface ChatRequestBody {
  prompt: string;
}

export interface ChatResponse {
  response: string;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
}