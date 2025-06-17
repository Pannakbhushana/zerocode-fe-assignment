import { ChatSessionModel, MessageModel } from "../../../models";
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

  static async deleteAllSessionsByUser(userId: string): Promise<void> {
    const sessions = await ChatSessionModel.find({ userId });
    const sessionIds = sessions.map(session => session._id);

    if (sessionIds.length === 0) return;

    await MessageModel.deleteMany({ sessionId: { $in: sessionIds } });
    await ChatSessionModel.deleteMany({ userId });
  }
}
