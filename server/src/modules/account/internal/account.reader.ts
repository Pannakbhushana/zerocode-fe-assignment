import { AccountModel } from '../../../models'
import { Account } from '../../../models/account-model'
export default class AccountReader {
    static async getAccountByEmail(email: string) : Promise<Account | Error | null> {
        try {
            const account = await AccountModel.findOne({email}).lean();
            return account
        } catch (error) {
            return error as Error
        }
    }
}