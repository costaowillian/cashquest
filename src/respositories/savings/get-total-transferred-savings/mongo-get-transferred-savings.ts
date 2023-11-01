import { ObjectId } from "mongodb";
import { IGetTotalTransferredSavingsRepository, ITotal } from "../../../controllers/wallet/get-wallet/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetTotalTransferredSavingsRepository implements IGetTotalTransferredSavingsRepository{
    async getTotalTransferredSavings(userId: string): Promise<number | ITotal> {
        const collection = MongoClient.db.collection("saving");
        const saving = await collection.aggregate([
            {
                $match: { _userId: new ObjectId(userId), isTransferred: true}
            },
            {
                $group: {
                    _id: new ObjectId(userId),
                    total: { $sum: "$value" }
                  }
            }
        ]).toArray();

        if (saving === null || saving.length === 0) {
            return 0;
          }
      
          const { _id, total } = saving[0];
          return { userId: _id.toHexString(), total };

        
    }

}