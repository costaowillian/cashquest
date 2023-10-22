import { MongoSpending } from "../../mongo-protocols";
import { ObjectId } from "mongodb";
import {
  IGetTotalSpendingsRepository,
  ITotal
} from "../../../controllers/wallet/get-wallet/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetTotalSpendindsRepository
  implements IGetTotalSpendingsRepository
{
  async getTotalSpendings(userId: string): Promise<ITotal | null> {
    const spendingsColection =
      MongoClient.db.collection<MongoSpending>("spending");

    const spendings = await spendingsColection
      .aggregate([
        {
          $match: {
            _userId: new ObjectId(userId)
          }
        },
        {
          $group: {
            _id: new ObjectId(userId),
            total: { $sum: "$value" }
          }
        }
      ])
      .toArray();
      console.log({spendingsTotal: spendings})
    const { _id, total } = spendings[0];
    return { userId: _id.toHexString(), total };
  }
}
