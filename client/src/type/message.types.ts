// src/types/message.type.ts
export interface ChatMessage {
  _id: string;
  sessionId: string;
  message: string;
  sender: 'user' | 'bot';
  createdAt: string;
  __v: number;
}

export interface CreateMessagePayload {
  sessionId: string;
  message: string;
  sender: 'user' | 'bot';
}