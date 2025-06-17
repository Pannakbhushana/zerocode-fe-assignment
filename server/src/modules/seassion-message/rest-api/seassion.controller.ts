// src/modules/chat/chat.controller.ts
import { Request, Response, NextFunction } from 'express';
import MessageService from './seassion.service';


export default class MessageController {

    async getMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const { sessionId } = req.params;
            const messages = await MessageService.getSessionMessages(sessionId);
            res.json(messages);
        } catch (error) {
            next(error);
        }
    }

    async postMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const { sessionId, message, sender } = req.body;
            const saved = await MessageService.addMessage(sessionId, sender, message);
            res.status(201).json(saved);
        } catch (error) {
            next(error);
        }
    }
}
