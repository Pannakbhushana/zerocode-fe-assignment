import { MessageModel } from '../../../models';

export default class MessageReader {
  static async getMessagesBySession(sessionId: string) {
    return MessageModel.find({ sessionId }).sort({ createdAt: 1 }).lean();
  }
}
