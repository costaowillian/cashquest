import { CreateDepositParams, ICreateDepositRepository } from "../../../controllers/deposit/create-deposit/protocols";
import { MongoClient } from "../../../database/mongo";
import { IDeposit } from "../../../models/deposit";
import { MongoDeposit } from "../../mongo-protocols";

export class MongoCreateDepositRepository implements ICreateDepositRepository {
    async createDeposit(params: CreateDepositParams): Promise<IDeposit | null> {
        const { insertedId } = await MongoClient.db.collection("deposit").insertOne(params);

        const deposit = await MongoClient.db.collection<MongoDeposit>("deposit").findOne({ _id: insertedId });

        if(!deposit) {
           return null
        }

        const { _id, ...rest } = deposit;

        return { id: _id.toHexString(), ...rest };
    }

}