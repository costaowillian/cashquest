import { ObjectId } from "mongodb";
import { ICountTotal, IGetSumSpendingsRepository } from "../../../controllers/user-pet/create-user-pet/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetSumSpendingsRepository implements IGetSumSpendingsRepository{
    async getSumSpendings(id: string): Promise<ICountTotal> {
        const collection = MongoClient.db.collection("spending");

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