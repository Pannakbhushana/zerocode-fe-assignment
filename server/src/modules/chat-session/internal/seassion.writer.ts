import { ChatSessionModel } from "../../../models";
import { ChatMessage } from "../../../models/chat-model";

export default class ChatWriter {
  static async createSession(userId: string, title?: string): Promise<ChatMessage> {
    const session = new ChatSessionModel({ userId, title });
    return session.save();
  }
}
