import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { ISpending } from "../../../models/spending";
import { MongoSpending } from "../../mongo-protocols";
import { IGetSpendingRepository } from "../../../controllers/spendings/get-spending/protocols";

export class MongoGetSpendingRepository implements IGetSpendingRepository {
  async getSpending(id: string): Promise<ISpending | null> {
    const spending = await MongoClient.db
      .collection<MongoSpending>("spending")
      .findOne({ _id: new ObjectId(id) });

    if (!spending) {
      return null;
    }

    const { _id, ...rest } = spending;

    return { id: _id.toHexString(), ...rest };
  }
}
