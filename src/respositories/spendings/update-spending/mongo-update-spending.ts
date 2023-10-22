import { ObjectId } from "mongodb";
import {
  IUpdateSpendingRepository,
  UpdateSpendingParams
} from "../../../controllers/spendings/update-spending/protocols";
import { MongoClient } from "../../../database/mongo";
import { ISpending } from "../../../models/spending";
import { MongoSpending } from "../../mongo-protocols";

export class MongoUpdateSpendingRepository
  implements IUpdateSpendingRepository
{
  async updateSpending(
    id: string,
    params: UpdateSpendingParams
  ): Promise<ISpending> {
    await MongoClient.db.collection<MongoSpending>("spending").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...params
        }
      }
    );

    const spending = await MongoClient.db
      .collection<MongoSpending>("spending")
      .findOne({ _id: new ObjectId(id) });

    if (!spending) {
      throw new Error("Spending not updated");
    }

    const { _id, ...rest } = spending;

    return { id: _id.toHexString(), ...rest };
  }
}
