import { ObjectId } from "mongodb";
import { IGetSumSavingsRepository } from "../../../controllers/user-pet/create-user-pet/protocols";
import { MongoClient } from "../../../database/mongo";
import { ISaving } from "../../../models/savings";

export class MongoGetSumSavingsRepository implements IGetSumSavingsRepository {
  async getSumSavings(id: string): Promise<number | any> {
    const collection = MongoClient.db.collection("saving");

    const result = await collection
      .aggregate([
        {
          $match: {
            _userId: new ObjectId(id)
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
