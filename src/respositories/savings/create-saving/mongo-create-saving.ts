import { CreateSavingParams, ICreateSavingRepository } from "../../../controllers/savings/create-savings/protocols";
import { MongoClient } from "../../../database/mongo";
import { ISaving } from "../../../models/savings";
import { MongoSaving } from "../../mongo-protocols";

export class MongoCreateSavingRepository implements ICreateSavingRepository {
    async createSaving(params: CreateSavingParams): Promise<ISaving | null> {
        const { insertedId } = await MongoClient.db.collection("saving").insertOne(params);
        
        const saving = await MongoClient.db.collection<MongoSaving>("saving").findOne({ _id: insertedId });

        if(!saving){
            return null;
        }

        const {_id, ...rest } =saving;

        return {id: _id.toHexString(), ...rest }
    }

}