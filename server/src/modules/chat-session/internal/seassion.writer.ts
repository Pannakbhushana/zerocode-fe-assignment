import { ChatSessionModel } from "../../../models";
import { ChatMessage } from "../../../models/chat-model";

export default class ChatWriter {
  static async createSession(userId: string, title?: string): Promise<ChatMessage> {
    const session = new ChatSessionModel({ userId, title });
    return session.save();
  }

  static async updateSessionTitle(sessionId: string, newTitle: string): Promise<ChatMessage | null> {
    const session = await ChatSessionModel.findById(sessionId);

    if (!session) throw new Error("Session not found");

    if (!session.isTitleUpdated) {
      session.title = newTitle;
      session.isTitleUpdated = true;
      await session.save();
    }

    return session;
  }
}
