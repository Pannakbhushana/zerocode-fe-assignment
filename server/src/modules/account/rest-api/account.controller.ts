import { NextFunction, Request, Response } from 'express';
import AuthService from './account.service';
import { loginCredentials, userDetails } from '../types';
import HttpStatusCodes from '../../../utils/http';

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await AuthService.register(req.body as userDetails);
      res.status(HttpStatusCodes.CREATED).json({ message: 'OTP sent', user });
    } catch (error) {
      next(error)
    }
  }

  verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, otp } = req.body;
      const signup = await AuthService.verifyOtp(email, otp);
      res.status(200).json({ message: 'User verified', user: signup });
    } catch (error) {
      next(error);
    }
  }

  sendResetOtp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const response = await AuthService.sendResetOtp(email);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, otp, newPassword } = req.body;
      const result = await AuthService.resetPassword(email, otp, newPassword);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  login = async (req: Request, res: Response, next: Function): Promise<void> => {
    try {
      const {
        email, password
      } = req.body as loginCredentials
      const type = req.originalUrl.split('/')[2];;
      const login = await AuthService.login(email, password);
      res.status(HttpStatusCodes.OK).send({ message: "login successfully", user: login })
    } catch (error) {
      next(error)
    }
  }

  deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedMenu = await AuthService.deleteAccount(req.body);
      res.status(HttpStatusCodes.OK).send(deletedMenu)
    } catch (error) {
      next(error)
    }
  };
}

export default AuthController;
