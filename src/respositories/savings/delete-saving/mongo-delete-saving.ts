import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { ISaving } from "../../../models/savings";
import { MongoSaving } from "../../mongo-protocols";
import { IDeleteSavingRepository } from "../../../controllers/savings/delete-saving/protocols";

export class MongoDeleteSavingRepository implements IDeleteSavingRepository {
    async deleteSaving(id: string): Promise<ISaving> {
      const deposit = await MongoClient.db
        .collection<MongoSaving>("Saving")
        .findOne({ _id: new ObjectId(id) });
  
      if (!deposit) {
        throw new Error("Saving not found");
      }
      const { deletedCount } = await MongoClient.db
        .collection<MongoSaving>("deposit")
        .deleteOne({ _id: new ObjectId(id) });
  
      if (!deletedCount) {
        throw new Error("Saving not deleted");
      }
  
      const { _id, ...rest } = deposit;
  
      return { id: _id.toHexString(), ...rest };
    }
  }