import { ObjectId } from "mongodb";
import { IGetSpendingsGraphicRepository, SpendingsGraphicParams } from "../../../controllers/graphics/get-spendings-graphics/protocols";
import { MongoClient } from '../../../database/mongo';

export class MongoGetSpendingGraphicsRepository implements IGetSpendingsGraphicRepository {
    async getSpendingsGraphic(params: SpendingsGraphicParams, isFixed: boolean, collectionName: string): Promise<any> {
        const collection = MongoClient.db.collection(collectionName);

        const result = await collection.aggregate([
            {
                $match: {
                    _userId: new ObjectId(params.userId),
                    createAt: {
                        $gte: params.startDate,
                        $lte: params.endDate,
                    },
                    isFixed: isFixed,
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
