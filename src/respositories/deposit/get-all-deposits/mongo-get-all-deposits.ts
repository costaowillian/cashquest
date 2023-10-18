import { ObjectId } from "mongodb";
import { IGetDepositsRepository } from "../../../controllers/deposit/get-all-deposits/protocols";
import { MongoClient } from "../../../database/mongo";
import { IDeposit } from "../../../models/deposit";
import { MongoDeposit } from "../../mongo-protocols";

export class MongoGetDepositsRepository implements IGetDepositsRepository {
  async getDeposits(userIdString: string): Promise<IDeposit[]> {
    const deposits = await MongoClient.db
      .collection<MongoDeposit>("deposit")
      .find({ _userId: new ObjectId(userIdString) })
      .toArray();

    return deposits.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString()
    }));
  }
}
