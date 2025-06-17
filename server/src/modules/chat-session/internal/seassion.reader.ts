import { ChatSessionModel } from '../../../models';

export default class ChatReader {
  static async getSessionsByUser(userId: string) {
    return ChatSessionModel.find({ userId }).sort({ createdAt: -1 }).lean();
  }
}
