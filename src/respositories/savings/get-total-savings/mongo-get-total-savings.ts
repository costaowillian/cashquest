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

    const date = new Date();
    const endDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${
      date.getHours()
    }:${date.getMinutes()}:${date.getSeconds()}`;

    const savings = await savingsCollection
      .aggregate([
        {
          $match: { _userId: new ObjectId(userId),
            createAt: {
              $lte: endDate,
          },
          isTransferred: false,
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

    if (savings === null || savings.length === 0) {
      return 0;
    }

    const { _id, total } = savings[0];
    return { userId: _id.toHexString(), total };
  }
}
