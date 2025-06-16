import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default class Database {
  private static mongoUri = process.env.mongoUrl as string;

  public static async connect(): Promise<void> {
    if (!this.mongoUri) {
      throw new Error('MONGO_URI environment variable not set');
    }

    try {
      await mongoose.connect(this.mongoUri);
      console.log('Database Connected');
    } catch (error) {
      console.error('Database Connection Failed', error);
      process.exit(1);
    }
  }
}
