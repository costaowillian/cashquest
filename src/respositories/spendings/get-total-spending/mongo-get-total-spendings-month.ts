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
  async getTotalSpendings(userId: string): Promise<ITotal | number> {
    const spendingsColection =
      MongoClient.db.collection<MongoSpending>("spending");

    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    const currentDate = date.toString();

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 0);
    const finalDate =  endDate.toString();

    const spendings = await spendingsColection
      .aggregate([
        {
          $match: {
            _userId: new ObjectId(userId),
            createAt: { $gte: currentDate, $lte: finalDate }
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
    console.log({ spendings });
    if (spendings === null || spendings.length === 0) {
      return 0;
    }
    const { _id, total } = spendings[0];
    return { userId: _id.toHexString(), total };
  }
}
