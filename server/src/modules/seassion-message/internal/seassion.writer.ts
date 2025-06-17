import { MessageModel } from "../../../models";
import { SeassionMessage } from "../../../models/seassion-message";

export default class MessageWriter {

  static async addMessage(sessionId: string, sender: 'user' | 'bot', message: string): Promise<SeassionMessage> {
    const chatMsg = new MessageModel({ sessionId, sender, message });
    return chatMsg.save();
  }
}
