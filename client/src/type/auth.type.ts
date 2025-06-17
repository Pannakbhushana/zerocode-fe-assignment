

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserDetails {
  name: string;
  email: string;
  password: string;
  otp: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface SignupSuccessResponse {
  message: string;
  user: UserDetails;
}

// Request type for verifying OTP
export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface Token {
  token: string;
  endDate: number;
}

export interface SendResetOtpRequest {
  email: string;
}

export interface SendResetOtpResponse {
  message: string;
  success?: boolean;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
  success?: boolean;
}

// Success response type for OTP verification
export interface VerifyOtpResponse {
  message: string;
  user: LoginUser;
}

export interface SignupErrorResponse {
  error: {
    code: string;
    message: string;
  };
}

// login types

export interface LoginRequest {
  email: string;
  password: string;
}

// export interface doc {
//   _doc:UserDetails
// }

export interface LoginUser {
  token: Token;
  details: UserDetails;
}

export interface LoginSuccessResponse {
  message: string;
  user: LoginUser;
}

export interface UserInfoType {
  userId: string;
  name: string;
  email: string;
}
export interface DeleteAccountRequest {
  email: string;
  password: string;
}

export interface DeleteAccountSuccessResponse {
  message: string;
  email: string;
}

export interface DeleteAccountErrorResponse {
  error: {
    code: string;
    message: string;
  };
}

export type SignupResponse = SignupSuccessResponse | SignupErrorResponse;
export type LoginResponse = LoginSuccessResponse | SignupErrorResponse;
export type VerifyOtpErrorResponse = SignupErrorResponse
export type DeleteAccountResponse = DeleteAccountSuccessResponse | DeleteAccountErrorResponse;