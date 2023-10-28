import { MongoSpending } from "../../mongo-protocols";
import { ObjectId } from "mongodb";
import {
  IGetTotalDepositsRepository,
  ITotal
} from "../../../controllers/wallet/get-wallet/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetTotalDepositsRepository
  implements IGetTotalDepositsRepository
{
  async getTotalDeposits(userId: string): Promise<ITotal | number> {
    const spendingsCollection =
      MongoClient.db.collection<MongoSpending>("deposit");

    const deposits = await spendingsCollection
      .aggregate([
        {
          $match: {
            _userId: new ObjectId(userId)
          }
        },
        {
          $group: {
            _userId: new ObjectId(userId),
            total: { $sum: "$value" }
          }
        }
      ])
      .toArray();

    if (deposits === null || deposits.length === 0) {
      return 0;
    }

    console.log(deposits[0]);
    const { _userId, total } = deposits[0];
    return { userId: _userId.toHexString(), total };
  }
}
