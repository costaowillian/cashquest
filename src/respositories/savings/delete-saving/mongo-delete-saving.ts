import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { ISaving } from "../../../models/savings";
import { MongoSaving } from "../../mongo-protocols";
import { IDeleteSavingRepository } from "../../../controllers/savings/delete-saving/protocols";

export class MongoDeleteSavingRepository implements IDeleteSavingRepository {
  async deleteSaving(id: string): Promise<ISaving | null> {
    const saving = await MongoClient.db
      .collection<MongoSaving>("saving")
      .findOne({ _id: new ObjectId(id) });

    if (!saving) {
      return null;
    }

    const { deletedCount } = await MongoClient.db
      .collection<MongoSaving>("saving")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      return null;
    }

    const { _id, ...rest } = saving;

    return { id: _id.toHexString(), ...rest };
  }
}
