import { ObjectId } from "mongodb";
import { IGetSpendingsRepository } from "../../../controllers/spendings/get-spendings/protocols";
import { MongoClient } from "../../../database/mongo";
import { ISpending } from "../../../models/spending";
import { MongoSpending } from "../../mongo-protocols";

export class MongoGetSpendingsRepository implements IGetSpendingsRepository {
  async getSpendingByUserId(userIdString: string): Promise<ISpending[]> {
    const spending = await MongoClient.db
      .collection<MongoSpending>("spending")
      .find({ _userId: new ObjectId(userIdString) })
      .toArray();

    return spending.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString()
    }));
  }
}
