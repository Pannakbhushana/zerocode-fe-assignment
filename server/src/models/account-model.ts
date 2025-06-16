import mongoose, { Document, Schema, Model } from 'mongoose';
import { status } from '../types';

interface Account extends Document {
  name: string;
  email: string;
  password: string;
  otp?: string;
  status: status;
}

const userSchema: Schema<Account> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: Object.values(status), default: status.PENDING },
    otp: { type: String },
  },
  { timestamps: true }
);

export { Account, userSchema };
