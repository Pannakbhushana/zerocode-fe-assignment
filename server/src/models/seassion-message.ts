// src/models/chat-message.model.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

interface SeassionMessage extends Document {
  sessionId: Types.ObjectId;
  message: string;
  sender: 'bot' | 'user';
}

const SeassionMessageSchema = new Schema<SeassionMessage>({
  sessionId: { type: Schema.Types.ObjectId, ref: 'ChatSession', required: true },
  message: { type: String, required: true },
  sender: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

export { SeassionMessage, SeassionMessageSchema };
