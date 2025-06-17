// src/models/chat-message.model.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

interface ChatMessage extends Document {
  userId: Types.ObjectId;
  title: string;
}

const ChatMessageSchema = new Schema<ChatMessage>({
  userId: { type: Schema.Types.ObjectId, ref: 'ChatSession', required: true },
  title: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

export { ChatMessage, ChatMessageSchema };
