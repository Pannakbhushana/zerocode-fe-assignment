// src/modules/chat/chat.controller.ts
import { Request, Response, NextFunction } from 'express';
import ChatService from './seassion.service';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    endDate: number;
  };
}


export default class ChatController {
    async createSession(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const { title } = req.body;
            const userId = req.user?.userId;

            if (!userId) {
                 res.status(401).json({ message: 'Unauthorized: No user ID found' });
                 return
            }

            const session = await ChatService.createSession(userId, title);
            res.status(201).json(session);
        } catch (error) {
            next(error);
        }
    }

    async listSessions(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.userId;

            if (!userId) {
                res.status(401).json({ message: 'Unauthorized: No user ID found' });
                return
            }

            const sessions = await ChatService.getUserSessions(userId);
            res.json(sessions);
        } catch (error) {
            next(error);
        }
    }

    async updateSessionTitle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { sessionId, newTitle } = req.body;

      if (!sessionId || !newTitle) {
        res.status(400).json({ message: 'Session ID and new title are required' });
        return;
      }

      const updatedSession = await ChatService.updateSessionTitle(sessionId, newTitle);
      res.json(updatedSession);
    } catch (error) {
      next(error);
    }
  }
}
