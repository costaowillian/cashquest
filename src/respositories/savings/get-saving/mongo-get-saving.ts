import { ObjectId } from "mongodb";
import { IGetSavingRepository } from "../../../controllers/savings/get-saving/protocols";
import { MongoClient } from "../../../database/mongo";
import { ISaving } from "../../../models/savings";
import { MongoSaving } from "../../mongo-protocols";

export class MongGetSavingRepository implements IGetSavingRepository {
    async getSaving(id: string): Promise<ISaving | null> {
        const saving  = await MongoClient.db.collection<MongoSaving>("saving").findOne({ _id: new ObjectId(id) });

        if(!saving) {
            return null;
        }

        const { _id, ...rest } = saving;

        return { id: _id.toHexString(), ...rest };
    }

}