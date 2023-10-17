import { ObjectId } from "mongodb";
import { IDeleteDepositRepository } from "../../../controllers/deposit/delete-deposit/protocols";
import { MongoClient } from "../../../database/mongo";
import { IDeposit } from "../../../models/deposit";
import { MongoDeposit } from "../../mongo-protocols";

export class MongoDeleteDepositRepository implements IDeleteDepositRepository {
  async deleteDeposit(id: string): Promise<IDeposit> {
    const deposit = await MongoClient.db
      .collection<MongoDeposit>("deposit")
      .findOne({ _id: new ObjectId(id) });

    if (!deposit) {
      throw new Error("Deposit not found");
    }
    const { deletedCount } = await MongoClient.db
      .collection<MongoDeposit>("deposit")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Deposit not deleted");
    }

    const { _id, ...rest } = deposit;

    return { id: _id.toHexString(), ...rest };
  }
}
