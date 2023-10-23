import { ObjectId } from "mongodb";
import { IGetSumSpendingsRepository } from "../../../controllers/user-pet/create-user-pet/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetSumSpendingsRepository implements IGetSumSpendingsRepository{
    async getSumSpendings(id: string): Promise<any> {
        const collection = MongoClient.db.collection("spending");

        const result = await collection.aggregate([
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
          ]).toArray();

          return result[0];
    }

}