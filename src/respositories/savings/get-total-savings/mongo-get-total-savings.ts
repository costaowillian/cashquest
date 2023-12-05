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
    const month = date.getMonth() + 1;
    const paddedMonth = month < 10 ? `0${month}` : month;
    const hours =
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds =
      date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const endDate = `${date.getFullYear()}-${
      paddedMonth
    }-${day} ${hours}:${minutes}:${seconds}`;
   
    const savings = await savingsCollection
      .aggregate([
        {
          $match: {
            _userId: new ObjectId(userId),
            createAt: {
              $lte: endDate
            },
            isTransferred: false
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
