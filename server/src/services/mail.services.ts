import nodemailer from 'nodemailer';
import { sendEmailOtpServiceDetails, WarningMail } from '../modules/account/types';

export class MailService {
  static async sendOtp(sendOtpParams: sendEmailOtpServiceDetails): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const message = {
      from: `"ChatBot Support" <${process.env.SMTP_USER}>`,
      to: sendOtpParams.email,
      subject: 'Your ChatBot OTP Code',
      html: `<p>Hi <strong>${sendOtpParams.name}</strong>,</p>
         <p>Welcome to <strong>ChatBot</strong> — your smart AI assistant.</p>
         <p>To verify your account, please use the OTP (One-Time Password) below:</p>
         <p>Your OTP code is: <strong>${sendOtpParams.otp}</strong></p>
         <p>Please do not share this code with anyone.</p>
         <p>If you did not request this, you can safely ignore this email.</p>
         <br/>
         <p>Best regards,<br/>ChatBot Team</p>`,
    };

    try {
      await transporter.sendMail(message);
      console.log(`OTP sent successfully to ${sendOtpParams.email}`);
    } catch (error) {
      console.error(`Failed to send OTP to ${sendOtpParams.email}:`, error);
      throw error;
    }
  }
}
