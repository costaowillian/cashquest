import { ObjectId } from "mongodb";
import { GetMonthlyReportParams, IGetMonthlyReportRepoisitory } from "../../../controllers/reports/get-monthly-report/protocols";
import { MongoClient } from "../../../database/mongo";


export class MongoGetMopnthlyReportRepository implements IGetMonthlyReportRepoisitory {
    async getMonthlyReport(params: GetMonthlyReportParams, collectionName: string): Promise<any[]> {
        const collection = MongoClient.db.collection(collectionName);

        const today = new Date(params.date);
        const firstDayMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const result = await collection.aggregate([
            {
              $match: { _userId: new ObjectId(params.userId),
                createAt: {
                    $gte: firstDayMonth,
                    $lte: today
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