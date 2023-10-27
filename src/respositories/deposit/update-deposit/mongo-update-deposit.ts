import { ObjectId } from "mongodb";
import {
  IUpdateDepositRepository,
  UpdateDepositParams
} from "../../../controllers/deposit/uptade-deposit/protocols";
import { MongoClient } from "../../../database/mongo";
import { IDeposit } from "../../../models/deposit";
import { MongoDeposit } from "../../mongo-protocols";

export class MongoUpdateDepositRepository implements IUpdateDepositRepository {
  async update(id: string, params: UpdateDepositParams): Promise<IDeposit> {
    await MongoClient.db.collection<MongoDeposit>("deposit").updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          ...params
        }
      }
    );

    const deposit = await MongoClient.db
      .collection<MongoDeposit>("deposit")
      .findOne({ _id: new ObjectId(id) });

    if (!deposit) {
      throw new Error("spending not updated");
    }

    const { _id, ...rest } = deposit;
    return { id: _id.toHexString(), ...rest };
  }
}
