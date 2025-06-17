import { basicAuthMiddleware } from '../../account/authMiddleWare';
import { ApplicationRouter } from '../../Application/ApplicationRouter';
import MessageController from './seassion.controller';

export default class MessageRouter extends ApplicationRouter {
  configure(): void {
    const ctrl = new MessageController();

    this.router.get('/session/:sessionId', basicAuthMiddleware, ctrl.getMessages);
    this.router.post('/add', basicAuthMiddleware, ctrl.postMessage);
  }
}
