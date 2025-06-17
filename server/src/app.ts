import { Server as HTTPServer } from 'http';
import express, { Application } from 'express';
import Database from './database/db';
import cors from 'cors';
import { errorHandler } from './modules/Application/ApplicationErrorHandler';
import { RouteConfig } from './types';
import AccountRouter from './modules/account/rest-api/account.router';
import ChatbotRouter from './modules/chatbot/rest-api/chat.router';
import ChatRouter from './modules/chat-session/rest-api/session.router';
import MessageRouter from './modules/seassion-message/rest-api/session.router';


export default class App {
  private static app: Application;
  private static httpServer: HTTPServer;

  public static async startServer(): Promise<HTTPServer> {
    this.app = express();
    await Database.connect();
    // Set application version header
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(cors());
    this.app.use((_, res, next) => {
      res.set('x-version', process.env.npm_package_version);
      next();
    });

    // Define API routes
    this.app.use('/api', this.createRESTApiServer());

    this.app.use(errorHandler as express.ErrorRequestHandler);

    this.httpServer = new HTTPServer(this.app);

    this.httpServer.listen(8080, () => {
      console.log('Server started on port 8080');
    });

    return Promise.resolve(this.httpServer);
  }

   private static createRESTApiServer(): Application {
    const app: Application = express();
    const routes: RouteConfig[] = [{
      path: '/account',
      router: new AccountRouter().router,
    },
    {
      path: '/chatbot',
      router: new ChatbotRouter().router,
    },
    {
      path: '/chat',
      router: new ChatRouter().router,
    },
    {
      path: '/message',
      router: new MessageRouter().router,
    }
    ];

    routes.forEach(route => {
      app.use(route.path, route.router);
    });
    return app;
  }
}

(async () => {
  try {
    await App.startServer();
  } catch (error) {
    console.error('Error starting server:', error);
  }
})();

