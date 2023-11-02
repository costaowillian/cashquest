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
  async getTotalSpendings(userId: string): Promise<ITotal | number> {
    const spendingsColection =
      MongoClient.db.collection<MongoSpending>("spending");

    const endDate = new Date();

    const spendings = await spendingsColection
      .aggregate([
        {
          $match: {
            _userId: new ObjectId(userId),
            createAt: {
              $lte: endDate,
          },
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

    if (spendings === null || spendings.length === 0) {
      return 0;
    }
    console.log({ spendingsTotal: spendings });
    const { _id, total } = spendings[0];
    return { userId: _id.toHexString(), total };
  }
}
