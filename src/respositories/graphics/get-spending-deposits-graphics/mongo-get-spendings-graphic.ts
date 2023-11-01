import { ObjectId } from "mongodb";
import { IGetSpandingAndDepositGraphicRepository, SpandingAndDepositGraphicParams } from "../../../controllers/graphics/get-deposits-spendings-graphics/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetSpendingDepositGraphicRepository implements IGetSpandingAndDepositGraphicRepository {
    async getSpandingAndDepositGraphic(params: SpandingAndDepositGraphicParams, collectionName: string): Promise<any> {
        const collection = MongoClient.db.collection(collectionName);

        const result = await collection.aggregate([
            {
                $match: {
                    _userId: new ObjectId(params.userId),
                    createAt: {
                        $gte: params.startDate,
                        $lte: params.endDate,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$value" },
                },
            },
        ]).toArray();

        if(result == null || result.length === 0) {
            return 0
        }

        return result[0];
    }
    

}