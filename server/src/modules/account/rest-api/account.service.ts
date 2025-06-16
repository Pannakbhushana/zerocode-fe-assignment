import bcrypt from 'bcrypt';
import AccountWriter from '../internal/account.writer';
import dotenv from 'dotenv';
import { AccountAlreadyExistedError,
         GenerateAuthTokenParams,
         InvalidCredentialsError,
         InvalidOTPError,
         loginCredentials,
         loginSchema,
         sendEmailOtpServiceDetails,
         UserAccountBadRequestError,
         UserAccountNotFoundError,
         userDetails,
         userDetailsSchema 
} from '../types';
import { MailService } from '../../../services/mail.services';
import AccountReader from '../internal/account.reader';
import { status } from '../../../types';
import { Account } from '../../../models/account-model';
import AuthTokenUtil from '../auth';
import { AccountModel } from '../../../models';
dotenv.config();

class AuthService {
  static async register(userData: userDetails) {
    const res = userDetailsSchema.safeParse(userData);
    if (res.success === false) {
      const errMessage = res.error.issues.map((obj) => (`{ Key: ${obj.path.join('.')},  Error code: ${obj.code}, Error message: ${obj.message} }`)).join('; ');
      throw new UserAccountBadRequestError(`Invalid request : ${errMessage}`);
    }
    const existed = await AccountReader.getAccountByEmail(userData.email) as Account;
    if (existed && existed.status === status.SUCCESS) {
      throw new AccountAlreadyExistedError('Account already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 5);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const mailsServiceDetails: sendEmailOtpServiceDetails = {
      email: userData.email,
      name: userData.name,
      otp,
    }
    await MailService.sendOtp(mailsServiceDetails)
    const user = await AccountWriter.createAccount({
      ...userData,
      password: hashedPassword,
      otp,
    });

    // console.log(`OTP for ${userData.email}: ${otp}`);
    console.log(`OTP for user sent to ${userData.email}`);

    return user;
  }

  static async verifyOtp(email: string, otp: string) {
    const user = await AccountReader.getAccountByEmail(email) as Account;
    if (!user || user.otp !== otp) throw new InvalidOTPError('Invalid OTP');

    await AccountWriter.updateAccount(email);
    const params: GenerateAuthTokenParams = {
      userId: user._id as string,
    }
    const token = await AuthTokenUtil.generateAuthToken(params);

    return { token, details: user };
  }


  static async sendResetOtp(email: string) {
    const user = await AccountReader.getAccountByEmail(email) as Account;
    if (!user) throw new UserAccountNotFoundError('User not found');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await AccountModel.findOneAndUpdate({ email }, { otp });

    const mailDetails: sendEmailOtpServiceDetails = {
      email,
      name: user.name,
      otp,
    };

    await MailService.sendOtp(mailDetails);
    return { message: 'OTP sent to email' };
  }

  static async resetPassword(email: string, otp: string, newPassword: string) {
    const user = await AccountReader.getAccountByEmail(email) as Account;
    if (!user || user.otp !== otp) throw new InvalidOTPError('Invalid OTP');

    const hashedPassword = await bcrypt.hash(newPassword, 5);
    await AccountModel.findOneAndUpdate(
      { email },
      { password: hashedPassword, otp: null }, // Clear OTP after successful reset
      { new: true }
    );

    return { message: 'Password updated successfully' };
  }


  static async login(email: string, password: string) {
    const res = loginSchema.safeParse({
      email, password
    })
    if (res.success === false) {
      const errMessage = res.error.issues.map((obj) => (`{ Key: ${obj.path.join('.')},  Error code: ${obj.code}, Error message: ${obj.message} }`)).join('; ');
      throw new UserAccountBadRequestError(`Invalid request : ${errMessage}`);
    }

    const login = await AccountReader.getAccountByEmail(email) as Account;
      if (login.status === status.PENDING) {
        throw new UserAccountBadRequestError('Your account is currently pending. Sign up and verify your account to access our services.');
      }
    if (!login) {
      throw new UserAccountNotFoundError('User Account Not Found');
    }

    const match = await bcrypt.compare(password, login.password);
    if (match) {
      const params: GenerateAuthTokenParams = {
        userId: login._id as string,
      }
      const token = await AuthTokenUtil.generateAuthToken(params);
      const { password, ...userDetails } = login;
      console.log(userDetails);
      return { token, details: userDetails }
    } else {
      throw new InvalidCredentialsError('Invalid Credentials')
    }
  }

   static async deleteAccount(data:loginCredentials) {
     const deletedAccount = await AccountWriter.deleteAccountByCredentials(data);
     return deletedAccount;
   }
}

export default AuthService;
