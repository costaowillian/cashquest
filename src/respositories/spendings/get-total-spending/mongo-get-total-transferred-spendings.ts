import { MongoSpending } from "../../mongo-protocols";
import { ObjectId } from "mongodb";
import {
  IGetTotalSpendingsRepository,
  ITotal
} from "../../../controllers/wallet/get-wallet/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetTotalTransferredSpendindsRepository
  implements IGetTotalSpendingsRepository
{
  async getTotalSpendings(userId: string): Promise<ITotal | number> {
    const spendingsColection =
      MongoClient.db.collection<MongoSpending>("spending");

    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const endDate = `${date.getFullYear()}-${date.getMonth()+1}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const spendings = await spendingsColection
      .aggregate([
        {
          $match: {
            _userId: new ObjectId(userId),
            createAt: {
              $lte: endDate
            },
            isTransferred: true
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
    
    const { _id, total } = spendings[0];
    return { userId: _id.toHexString(), total };
  }
}
