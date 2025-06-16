import { AccountModel } from "../../../models";
import { Account } from "../../../models/account-model";
import { status } from "../../../types";
import { ApplicationError } from "../../Application/ApplicationError";
import { loginCredentials, userDetails } from "../types";
import bcrypt from 'bcrypt';

export default class AccountWriter {
    static async createAccount(userDetails: userDetails) {
        const existingUser = await AccountModel.findOne({ email: userDetails.email });

        if (existingUser) {
            if (existingUser.status === status.PENDING) {
                existingUser.otp = userDetails.otp;
                await existingUser.save();
                const { otp, ...safeUser } = existingUser.toObject();
                return safeUser;
            } else {
                throw new Error("An account with this email already exists.");
            }
        }
        const createAccount = new AccountModel({
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            otp: userDetails.otp
        });
        const user = await createAccount.save() as Account & { _id: string };
        const { otp, ...safeUser } = user.toObject();
        return safeUser;
    }

    static updateAccount = async (email: string) => {
        await AccountModel.findOneAndUpdate(
            { email },
            { status: status.SUCCESS },
            { new: true }
        ) as Account;
    }

    static deleteAccountByCredentials = async (data: loginCredentials) => {
        const { email, password } = data;

        if (!email || !password) {
            throw new ApplicationError(
                "Credentials not found..",
                'NOT_FOUND',
                404
            );
        }
        const user = await AccountModel.findOne({ email });

        if (!user) {

            throw new ApplicationError(
                "User not found.",
                'NOT_FOUND',
                404
            );
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            throw new ApplicationError(
                "Invalid password.",
                'INVALID_REQUEST',
                500
            );
        }

        await AccountModel.findByIdAndDelete(user._id);

        return { message: "Account successfully deleted.", email };
    }
}