import { ObjectId } from "mongodb";
import {
  IUpdateSavingRepository,
  UpdateSavingParams
} from "../../../controllers/savings/update-saving/protocols";
import { MongoClient } from "../../../database/mongo";
import { ISaving } from "../../../models/savings";
import { MongoSaving } from "../../mongo-protocols";

export class MongoUpdateSavingRepository implements IUpdateSavingRepository {
  async update(id: string, params: UpdateSavingParams): Promise<ISaving> {
    await MongoClient.db.collection<MongoSaving>("saving").updateOne(
      {
        _id: new ObjectId(id)
      },
      {
        $set: {
          ...params
        }
      }
    );

    const saving = await MongoClient.db
      .collection<MongoSaving>("saving")
      .findOne({
        _id: new ObjectId(id)
      });

    if (!saving) {
      throw Error("Saving not updated");
    }

    const { _id, ...rest } = saving;
    return { id: _id.toHexString(), ...rest };
  }
}
