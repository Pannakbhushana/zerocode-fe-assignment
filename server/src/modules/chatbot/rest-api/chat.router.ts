import { ApplicationRouter } from '../../Application/ApplicationRouter';
import ChatbotController from './chat.controller';

export default class ChatbotRouter extends ApplicationRouter {
  configure(): void {
    const ctrl = new ChatbotController();

    this.router.post('/ask', ctrl.generate);
  }
}
