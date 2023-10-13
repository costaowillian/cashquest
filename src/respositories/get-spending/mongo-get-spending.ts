import { ObjectId } from "mongodb";
import { IGetSpedingRepository } from "../../controllers/get-spending/protocols";
import { MongoClient } from "../../database/mongo";
import { ISpending } from "../../models/spending";
import { MongoSpending } from "../mongo-protocols";

export class MongoGetSpendingRepository implements IGetSpedingRepository {
  async getSpending(id: string): Promise<ISpending> {
    const spending = await MongoClient.db
      .collection<MongoSpending>("spendings")
      .findOne({ _id: new ObjectId(id) });

    if(!spending) {
        throw new Error("not found");
    }

    const { _id, ...rest } = spending;

    return { id: _id.toHexString(), ...rest }
  }
}
