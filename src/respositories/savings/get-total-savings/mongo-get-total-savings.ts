import { ObjectId } from "mongodb";
import {
  IGetTotalSavingsRepository,
  ITotal
} from "../../../controllers/wallet/get-wallet/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetTotalSavingsRepository
  implements IGetTotalSavingsRepository
{
  async getTotalSavings(userId: string): Promise<number | ITotal> {
    const savingsCollection = MongoClient.db.collection("saving");

    const savings = await savingsCollection
      .aggregate([
        {
          $match: { _userId: new ObjectId(userId) }
        },
        {
          $group: {
            _id: new ObjectId(userId),
            total: { $sum: "$value" }
          }
        }
      ])
      .toArray();

    if (savings === null || savings.length === 0) {
      return 0;
    }

    const { _id, total } = savings[0];
    return { userId: _id.toHexString(), total };
  }
}
