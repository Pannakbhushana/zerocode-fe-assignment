import { z } from 'zod';
import { ApplicationError } from '../Application/ApplicationError';
import HttpStatusCodes from '../../utils/http';


export type userDetails = {
name: string;
email: string;
password: string;
otp?: string;
} 

export type sendEmailOtpServiceDetails = {
    email: string;
    name: string;
    otp: string;
}

export type WarningMail = {
  email: string;
  name: string;
}

export type loginCredentials = {
  email: string;
  password: string;
}


// User details schema (excluding otp)
export const userDetailsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Send Email OTP Service Details Schema
export const sendEmailOtpServiceDetailsSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1, "Name is required"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export enum UserAccountErrorCode {
  NOT_FOUND = 'UserAccount_ERR_01',
  BAD_REQUEST = 'UserAccount_ERR_02',
}

export class UserAccountBadRequestError extends ApplicationError{
  constructor(message: string) {
    super(message, UserAccountErrorCode.BAD_REQUEST, HttpStatusCodes.BAD_REQUEST);
  }
}

export class UserAccountNotFoundError extends ApplicationError{
  constructor(message: string) {
    super(message, UserAccountErrorCode.NOT_FOUND, HttpStatusCodes.NOT_FOUND);
  }
}

export interface AuthTokenPayload {
  userId: string;
  endDate: number;
}

export interface GenerateAuthTokenParams {
  userId: string;
  endDate?: Date;
  jwtExpiryTime?: string;
}

export interface VerifyAuthTokenParams {
  token: string;
}

export class AccessTokenInvalidError extends ApplicationError {
  constructor(message: string) {
    super(message,'AccessTokenInvalidError', HttpStatusCodes.SERVER_ERROR);
  }
}

export class InvalidCredentialsError extends ApplicationError {
  constructor(message: string) {
    super(message ,'InvalidCredentialsError' ,HttpStatusCodes.UNAUTHORIZED );
  }
}
export class AccountAlreadyExistedError extends ApplicationError {
  constructor(message: string) {
    super(message ,'AccountAlreadyExistedError' ,HttpStatusCodes.CONFLICT );
  }
}

export class InvalidOTPError extends ApplicationError {
  constructor(message: string) {
    super(message ,'InvalidOTPError' ,HttpStatusCodes.UNAUTHORIZED );
  }
}

export class AccessTokenExpiredError extends ApplicationError {
  constructor() {
    super('Access token has expired' ,'AccessTokenExpiredError' ,HttpStatusCodes.UNAUTHORIZED );
  }
}

export type generateToken = {
  token: string;
  endDate: number
}