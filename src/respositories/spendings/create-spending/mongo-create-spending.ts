import { MongoClient } from "../../../database/mongo";
import { ISpending } from "../../../models/spending";
import { MongoSpending } from "../../mongo-protocols";
import {
  CreateSpendingParams,
  ICreateSpendingRepository
} from "../../../controllers/spendings/create-spending/protocols";

export class MongoCreateSpendingRepository
  implements ICreateSpendingRepository
{
  async createSpending(params: CreateSpendingParams): Promise<ISpending> {
    const { insertedId } = await MongoClient.db
      .collection("spending")
      .insertOne(params);

    const spending = await MongoClient.db
      .collection<MongoSpending>("spending")
      .findOne({ _id: insertedId });

    if (!spending) {
      throw new Error("spending not created");
    }

    const { _id, ...rest } = spending;

    return { id: _id.toHexString(), ...rest };
  }
}
