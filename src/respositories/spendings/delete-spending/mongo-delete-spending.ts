import { MongoSpending } from "../../mongo-protocols";
import { IDeleteSpendingRepository } from "../../../controllers/spendings/delete-spending/protocols";
import { ISpending } from "../../../models/spending";
import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";

export class MongoDeleteSpendingRepository
  implements IDeleteSpendingRepository
{
  async deleteSpending(id: string): Promise<ISpending | null> {
    const spending = await MongoClient.db
      .collection<MongoSpending>("spending")
      .findOne({ _id: new ObjectId(id) });

    if (!spending) {
      return null;
    }

    const { deletedCount } = await MongoClient.db
      .collection("spending")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      return null;
    }

    const { _id, ...rest } = spending;

    return { id: _id.toHexString(), ...rest };
  }
}
