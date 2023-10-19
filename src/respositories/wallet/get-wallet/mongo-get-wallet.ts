import { ObjectId } from "mongodb";
import { IGetWalletREpository } from "../../../controllers/wallet/get-wallet/protocols";
import { MongoClient } from "../../../database/mongo";
import { IWallet } from "../../../models/wallet";
import { MongoWallet } from "../../mongo-protocols";

export class MongoGetWalletRepository implements IGetWalletREpository {
   async getWallet(userId: string): Promise<IWallet[] | null> {
        const wallet = await MongoClient.db.collection<MongoWallet>("wallet").find({ _id: new ObjectId(userId) }).toArray();

        return wallet.map(({ _id, ...rest }) => ({
            ...rest, 
            id: _id.toHexString()
        }));
    }

}