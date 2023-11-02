import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { GetReportParams, IGetReportRepoisitory } from "../../../controllers/reports/get-deposit-spending-report/protocol";


export class MongoGetReportRepository implements IGetReportRepoisitory {
    async getReport(params: GetReportParams, collectionName: string): Promise<any[]> {
        const collection = MongoClient.db.collection(collectionName);

        const result = await collection.aggregate([
            {
              $match: { _userId: new ObjectId(params.userId),
                createAt: {
                    $gte: new Date(params.startDate),
                    $lte: new Date(params.endDate),
                  }
              }
            },
            {
              $sort: {
                createAt: -1
              }
            }
        ]).toArray();

        return result.map(({ _id, ...rest }) => ({
            ...rest, id: _id.toHexString()
        }));
    }
}