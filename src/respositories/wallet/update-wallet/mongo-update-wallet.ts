import { ObjectId } from "mongodb";
import { IUpdateWalletRepository, UptadeWalletParamas } from "../../../controllers/wallet/update-wallet/protocols";
import { MongoClient } from "../../../database/mongo";
import { IWallet } from "../../../models/wallet";
import { MongoWallet } from "../../mongo-protocols";

export class MongoUpdateWalletRepository implements IUpdateWalletRepository {
    async UpdateWallet(id: string, params: UptadeWalletParamas): Promise<IWallet> {
        await MongoClient.db.collection<MongoWallet>("wallet").updateOne(
            { _id: new ObjectId(id) },
            { 
                $set:{
                    ...params
                } 
            }
        );

        const wallet = await MongoClient.db.collection<MongoWallet>("wallet").findOne({ _id: new ObjectId(id) });

        if(!wallet) {
            throw new Error("Wallet not updated");
        }

        const { _id, ...rest } = wallet;

        return { id: _id.toHexString(), ...rest };
    }

}