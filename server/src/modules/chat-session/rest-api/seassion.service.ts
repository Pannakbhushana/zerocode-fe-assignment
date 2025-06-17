import ChatReader from "../internal/seassion.reader";
import ChatWriter from "../internal/seassion.writer";

export default class ChatService {
  static async createSession(userId: string, title?: string) {
    return ChatWriter.createSession(userId, title);
  }

  static async getUserSessions(userId: string) {
    return ChatReader.getSessionsByUser(userId);
  }
}
