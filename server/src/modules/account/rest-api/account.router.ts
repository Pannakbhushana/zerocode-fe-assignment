import { ApplicationRouter } from '../../Application/ApplicationRouter';
import AuthController from './account.controller';

export default class AccountRouter extends ApplicationRouter {
  configure(): void {
    const ctrl = new AuthController();
    // Uncomment if middleware is needed
    // this.router.use(authTokenMiddleware);
    this.router.post('/sendotp', ctrl.register);  // Route for sending OTP

    this.router.post('/verifyotp', ctrl.verifyOtp);  // Route for verifying OTP

    this.router.post('/login', ctrl.login)
    this.router.post('/delete-account', ctrl.deleteAccount)
    this.router.post('/send-reset-otp', ctrl.sendResetOtp);
    this.router.post('/reset-password', ctrl.resetPassword);
  }
}
