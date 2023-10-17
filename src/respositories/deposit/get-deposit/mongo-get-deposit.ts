import { ObjectId } from "mongodb";
import { IGetDepositRepository } from "../../../controllers/deposit/get-deposit/protocols";
import { MongoClient } from "../../../database/mongo";
import { IDeposit } from "../../../models/deposit";
import { MongoDeposit } from "../../mongo-protocols";

export class MongoGetDepositRepository implements IGetDepositRepository {
  async getDeposit(id: string): Promise<IDeposit | null> {
    const deposit = await MongoClient.db
      .collection<MongoDeposit>("deposit")
      .findOne({ _id: new ObjectId(id) });

    if (!deposit) {
      return null;
    }

    const { _id, ...rest } = deposit;

    return { id: _id.toHexString(), ...rest };
  }
}
