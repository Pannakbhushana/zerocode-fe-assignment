import { ChatRequestBody, ChatResponse } from '../type/chat.type';
import APIService from './api.service';

export default class ChatBotService extends APIService {
  constructor() {
    super();
  }

  async sendMessageToBot(data: ChatRequestBody): Promise<ChatResponse> {
    try {
      const response = await this.apiClient.post<ChatResponse>(
        '/chatbot/ask',
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response?.data || { error: { code: 'UnknownError', message: 'Chat with bot failed. Please try again.' } };
    }
  }
}
