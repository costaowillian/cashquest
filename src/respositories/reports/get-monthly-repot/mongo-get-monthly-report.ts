import { ObjectId } from "mongodb";
import { IGetMonthlyReportRepoisitory } from "../../../controllers/reports/get-monthly-report/protocols";
import { MongoClient } from "../../../database/mongo";
import { IDeposit } from "../../../models/deposit";
import { ISaving } from "../../../models/savings";
import { ISpending } from "../../../models/spending";

export class MongoGetMopnthlyReportRepository implements IGetMonthlyReportRepoisitory {
    async getMonthlyReport(userId: string, collectionName: string): Promise<any> {
        const collection = MongoClient.db.collection(collectionName);

        const today = new Date();
        const firstDayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const result = await collection.aggregate([
            {
              $match: { _userId: new ObjectId(userId),
                createAt: {
                    $gte: firstDayMonth,
                    $lte: todayDate
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
            ...rest, id: _id.ttoHexString()
        }));
    }

}