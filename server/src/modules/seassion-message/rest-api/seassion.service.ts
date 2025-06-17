import MessageReader from "../internal/seassion.reader";
import ChatReader from "../internal/seassion.reader";
import MessageWriter from "../internal/seassion.writer";
import ChatWriter from "../internal/seassion.writer";

export default class MessageService {

  static async getSessionMessages(sessionId: string) {
    return MessageReader.getMessagesBySession(sessionId);
  }

  static async addMessage(sessionId: string, sender: 'user' | 'bot', message: string) {
    return MessageWriter.addMessage(sessionId, sender, message);
  }
}
