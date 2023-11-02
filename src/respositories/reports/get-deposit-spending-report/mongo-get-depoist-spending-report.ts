import { ObjectId } from "mongodb";
import { IGetMonthlyReportRepoisitory } from "../../../controllers/reports/get-monthly-report/protocols";
import { MongoClient } from "../../../database/mongo";
import { GetReportParams } from "../../../controllers/reports/get-deposit-spending-report/protocol";


export class MongoGetMopnthlyReportRepository implements IGetMonthlyReportRepoisitory {
    async getMonthlyReport(params: GetReportParams, collectionName: string): Promise<any[]> {
        const collection = MongoClient.db.collection(collectionName);

        const result = await collection.aggregate([
            {
              $match: { _userId: new ObjectId(params.userId),
                createAt: {
                    $gte: params.startDate,
                    $lte: params.endDate,
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