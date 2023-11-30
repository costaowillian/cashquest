import { ObjectId } from "mongodb";
import {
  GetMonthlyReportParams,
  IGetMonthlyReportRepoisitory
} from "../../../controllers/reports/get-monthly-report/protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoGetMopnthlyReportRepository
  implements IGetMonthlyReportRepoisitory
{
  async getMonthlyReport(
    params: GetMonthlyReportParams,
    collectionName: string
  ): Promise<any[]> {
    const collection = MongoClient.db.collection(collectionName);

    const today = new Date(params.date);
    const firstDayMonth = `${today.getFullYear()}-${today.getMonth()+1}-01 00:00:00`;
    console.log({ gte: firstDayMonth });
    console.log({ lte: params.date });

    const result = await collection
      .aggregate([
        {
          $match: {
            _userId: new ObjectId(params.userId),
            createAt: {
              $gte: firstDayMonth,
              $lte: params.date
            }
          }
        },
        {
          $sort: {
            createAt: -1
          }
        }
      ])
      .toArray();

    return result.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString()
    }));
  }
}
