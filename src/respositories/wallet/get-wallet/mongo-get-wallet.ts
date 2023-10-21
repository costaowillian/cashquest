import { ObjectId } from "mongodb";
import { IGetWalletREpository } from "../../../controllers/wallet/get-wallet/protocols";
import { MongoClient } from "../../../database/mongo";
import { IWallet } from "../../../models/wallet";
import { MongoWallet } from "../../mongo-protocols";

export class MongoGetWalletRepository implements IGetWalletREpository {
   async getWallet(userId: string): Promise<IWallet | null> {
        const wallet = await MongoClient.db.collection<MongoWallet>("wallet").findOne({ _userId: new ObjectId(userId) });

        if (!wallet) {
            return null;
        }
        
        const { _id, ...rest } = wallet;
        return { id: _id.toHexString(), ...rest };
    }
}