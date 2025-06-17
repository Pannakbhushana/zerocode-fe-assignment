import { Request, Response, NextFunction } from 'express';
import ChatbotService from './chat.service';

class ChatbotController {
  public generate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { prompt } = req.body;

      if (!prompt) {
        res.status(400).json({ message: 'Prompt is required' });
        return;
      }

      const result = await ChatbotService.getResponse(prompt);
      res.status(200).json({ response: result });
    } catch (error) {
      next(error);
    }
  };
}

export default ChatbotController