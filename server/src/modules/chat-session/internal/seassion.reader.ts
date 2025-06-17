import { ChatSessionModel } from '../../../models';

export default class ChatReader {
  static async getSessionsByUser(userId: string) {
    return ChatSessionModel.find({ userId }).sort({ updatedAt: -1 }).lean();
  }
}
