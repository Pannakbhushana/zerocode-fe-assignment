import mongoose, { Model } from 'mongoose';
import { Account, userSchema } from './account-model';
import { ChatMessage, ChatMessageSchema } from './chat-model';
import { SeassionMessage, SeassionMessageSchema } from './seassion-message';


// Interface Models
interface IUserModel extends Model<Account> {};
interface IChatModel extends Model<ChatMessage> {};
interface IMessageModel extends Model<SeassionMessage> {};


// model Initialization
const AccountModel: IUserModel = mongoose.model<Account, IUserModel>('Account', userSchema);
const ChatSessionModel: IChatModel = mongoose.model<Account, IChatModel>('ChatMessage', ChatMessageSchema);
const MessageModel: IMessageModel = mongoose.model<Account, IMessageModel>('SeassionMessage', SeassionMessageSchema);



export { AccountModel, ChatSessionModel, MessageModel };
