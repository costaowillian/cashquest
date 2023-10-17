import { IGetDepositsRepository } from "../../../controllers/deposit/get-all-deposits/protocols";
import { MongoClient } from "../../../database/mongo";
import { IDeposit } from "../../../models/deposit";
import { MongoDeposit } from "../../mongo-protocols";

export class MongoGetDepositsRepository implements IGetDepositsRepository {
  async getDeposits(): Promise<IDeposit[]> {
    const deposits = await MongoClient.db
      .collection<MongoDeposit>("deposit")
      .find({})
      .toArray();

      return deposits.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toHexString()
      }));
  }
}
