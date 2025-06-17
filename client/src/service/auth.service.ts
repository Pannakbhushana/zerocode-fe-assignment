import {
  SignupRequest,
  SignupResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  VerifyOtpErrorResponse,
  LoginRequest,
  LoginSuccessResponse,
  SignupErrorResponse,
  SendResetOtpRequest,
  SendResetOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
  DeleteAccountSuccessResponse,
} from '../type/auth.type';
import APIService from './api.service';

export default class AuthService extends APIService {
  constructor() {
    super();
  }

  async signup(data: SignupRequest): Promise<SignupResponse> {
    try {
      const response = await this.apiClient.post<SignupResponse>(
        '/account/sendotp',
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response?.data || { error: { code: 'UnknownError', message: 'Signup failed. Please try again.' } };
    }
  }

  async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse | VerifyOtpErrorResponse> {
    try {
      const response = await this.apiClient.post<VerifyOtpResponse>(
        '/account/verifyotp',
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response?.data || { error: { code: 'InvalidOTPError', message: 'OTP verification failed. Try again.' } };
    }
  }

  async login(data: LoginRequest): Promise<LoginSuccessResponse | SignupErrorResponse> {
    try {
      const response = await this.apiClient.post<LoginSuccessResponse>(
        '/account/login',
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response?.data || { error: { code: 'UnknownError', message: 'Login failed. Please try again.' } };
    }
  }

  async sendResetOtp(data: SendResetOtpRequest): Promise<SendResetOtpResponse | SignupErrorResponse> {
    try {
      const response = await this.apiClient.post<SendResetOtpResponse>(
        '/account/send-reset-otp',
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response?.data || {
        error: { code: 'UnknownError', message: 'Failed to send reset OTP. Please try again.' },
      };
    }
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse | SignupErrorResponse> {
    try {
      const response = await this.apiClient.post<ResetPasswordResponse>(
        '/account/reset-password',
        data
      );
      return response.data;
    } catch (error: any) {
      return error.response?.data || {
        error: { code: 'UnknownError', message: 'Password reset failed. Please try again.' },
      };
    }
  }

  async deleteAccount(data: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    try {
      const response = await this.apiClient.post<DeleteAccountSuccessResponse>(
        'account/delete-account',
        data
      );
      return response.data;
    } catch (error: any) {
      return (
        error.response?.data || {
          error: {
            code: 'UnknownError',
            message: 'Account deletion failed. Please try again.',
          },
        }
      );
    }
  }
}
