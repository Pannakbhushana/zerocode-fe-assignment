// src/modules/chat/chat.routes.ts
// import { authenticate } from '../../../middleware/auth-middleware';
import { basicAuthMiddleware } from '../../account/authMiddleWare';
import { ApplicationRouter } from '../../Application/ApplicationRouter';
import ChatController from './seassion.controller';

export default class ChatRouter extends ApplicationRouter {
  configure(): void {
    const ctrl = new ChatController();

    this.router.post('/new-session', basicAuthMiddleware, ctrl.createSession);
    this.router.get('/sessions', basicAuthMiddleware, ctrl.listSessions);
    this.router.patch('/session/update', basicAuthMiddleware, ctrl.updateSessionTitle);
  }
}
