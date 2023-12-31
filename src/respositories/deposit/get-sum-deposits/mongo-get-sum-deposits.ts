import { ObjectId } from "mongodb";
import { IGetSumDepositsRepository } from "../../../controllers/user-pet/create-user-pet/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetSumDepositsRepository implements IGetSumDepositsRepository{
    async getSumDeposits(id: string): Promise<any| number> {
        const collection = MongoClient.db.collection("deposit");

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

          if(result === null || result.length === 0) {
            return 0;
          }

          return result[0];
    }
}