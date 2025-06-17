// src/services/message.service.ts
import { ChatMessage, CreateMessagePayload } from '../type/message.types';
import APIService from './api.service';

export default class MessageService extends APIService {
  constructor() {
    super();
  }

  async createMessage(payload: CreateMessagePayload): Promise<ChatMessage> {
    try {
      const response = await this.apiClient.post<ChatMessage>('/message/add', payload);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  }

  async getMessagesBySessionId(sessionId: string): Promise<ChatMessage[]> {
    try {
      const response = await this.apiClient.get<ChatMessage[]>(`message/session/${sessionId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch messages');
    }
  }
}
