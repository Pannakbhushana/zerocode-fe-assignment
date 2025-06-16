import mongoose, { Model } from 'mongoose';
import { Account, userSchema } from './account-model';


// Interface Models
interface IUserModel extends Model<Account> {};


// model Initialization
const AccountModel: IUserModel = mongoose.model<Account, IUserModel>('Account', userSchema);



export { AccountModel };
