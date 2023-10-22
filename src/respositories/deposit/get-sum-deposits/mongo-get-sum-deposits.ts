import { ObjectId } from "mongodb";
import { ICountTotal, IGetSumDepositsRepository } from "../../../controllers/user-pet/create-user-pet/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetSumDepositsRepository implements IGetSumDepositsRepository{
    async getSumDeposits(id: string): Promise<ICountTotal> {
        const collection = MongoClient.db.collection("deposit");

        const result = await collection.aggregate([
            {
              $match: {
                _userId: new ObjectId(id)
              }
            },
            {
              total: {$count: "total"}
            }
          ]).toArray();

          return result[0].total;
    }
}