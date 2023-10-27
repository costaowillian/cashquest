import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { ISaving } from "../../../models/savings";
import { MongoSaving } from "../../mongo-protocols";
import { IGetSavingsRepository } from "./../../../controllers/savings/get-all-savings/protocols";

export class MongoGetSavingRepository implements IGetSavingsRepository {
  async getSavings(userId: string): Promise<ISaving[]> {
    const saving = await MongoClient.db
      .collection<MongoSaving>("saving")
      .find({ _userId: new ObjectId(userId) })
      .toArray();

    return saving.map(({ _id, ...rest }) => ({
      id: _id.toHexString(),
      ...rest
    }));
  }
}
