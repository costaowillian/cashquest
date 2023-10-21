import { MongoSpending } from "../../mongo-protocols";
import { ObjectId } from "mongodb";
import {
    IGetTotalDepositsRepository,
  IGetTotalSpendingsRepository,
  ITotal
} from "../../../controllers/wallet/get-wallet/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetTotalDepositsRepository
  implements IGetTotalDepositsRepository
{
  async getTotalDeposits(userId: string): Promise<ITotal | null> {
    const spendingsColection =
      MongoClient.db.collection<MongoSpending>("deposit");

    const deposits = await spendingsColection
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
    const { _id, total } = deposits[0];
    return { userId: _id.toHexString(), total };
  }
}
