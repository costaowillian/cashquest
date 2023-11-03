import { ObjectId } from "mongodb";
import { MongoClient } from '../../../database/mongo';
import { IGetSavingGraphicRepository, SavingGraphicParams } from "../../../controllers/graphics/get-savings-graphic/protocols";

export class MongoGetSavingGraphicsRepository implements IGetSavingGraphicRepository {
    async getSavingGraphic(params: SavingGraphicParams, isFixed: boolean, collectionName: string): Promise<any> {
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
