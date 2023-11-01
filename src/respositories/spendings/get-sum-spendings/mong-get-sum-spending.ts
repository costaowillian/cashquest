import { ObjectId } from "mongodb";
import { IGetSumSpendingsRepository } from "../../../controllers/user-pet/create-user-pet/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetSumSpendingsRepository
  implements IGetSumSpendingsRepository
{
  async getSumSpendings(id: string): Promise<any> {
    const collection = MongoClient.db.collection("spending");

    const startDate = new Date();
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date();

    const result = await collection
      .aggregate([
        {
          $match: {
            _userId: new ObjectId(id),
            createAt: {
              $gte: startDate,
              $lte: endDate,
          },
          }
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: 1
            }
          }
        }
      ])
      .toArray();

    if (result === null || result.length === 0) {
      return 0;
    }

    return result[0];
  }
}
