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
    console.log({ repo: params.date });
    const today = new Date(params.date);
    const month = today.getMonth() + 1;
    const paddedMonth = month < 10 ? `0${month}` : month;
    const firstDayMonth = `${today.getFullYear()}-${paddedMonth}-01 00:00:00`;
    console.log({ firstDayMonth: firstDayMonth });
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
