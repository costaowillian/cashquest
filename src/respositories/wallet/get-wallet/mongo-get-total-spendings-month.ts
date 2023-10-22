import { MongoSpending } from "../../mongo-protocols";
import { ObjectId } from "mongodb";
import {
  IGetTotalSpendingsRepository,
  ITotal
} from "../../../controllers/wallet/get-wallet/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetTotalMonthlySpendindsRepository
  implements IGetTotalSpendingsRepository
{
  async getTotalSpendings(userId: string): Promise<ITotal | null> {
    const spendingsColection =
      MongoClient.db.collection<MongoSpending>("spending");

    const currentDate = new Date();
    currentDate.setDate(1);
    currentDate.setHours(0, 0, 0, 0);
    
    const spendings = await spendingsColection
      .aggregate([
        {
          $match: {
            _userId: new ObjectId(userId),
            createAt: { $gte: currentDate }
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

    if (!spendings) {
      throw new Error(`Not found data for date ${currentDate}`);
    }
    const { _id, total } = spendings[0];
    return { userId: _id.toHexString(), total };
  }
}
