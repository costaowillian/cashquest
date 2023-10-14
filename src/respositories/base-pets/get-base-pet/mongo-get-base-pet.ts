import { ObjectId } from "mongodb";
import { IGetBasePetRepository } from "../../../controllers/base-pets/get-base-pet/protocols";
import { MongoClient } from "../../../database/mongo";
import { IBasePet } from "../../../models/base-pet";
import { MongoBasePet } from "../../mongo-protocols";

export class MongoGetBasePetRepository implements IGetBasePetRepository {
  async getBasePet(id: string): Promise<IBasePet | null> {
    console.log({id});
    const basePet = await MongoClient.db
      .collection<MongoBasePet>("base-pets")
      .findOne({ _id: new ObjectId(id) });

    console.log({basePet});

    if (!basePet) {
      return null;
    }

    const { _id, ...rest } = basePet;

    return { id: _id.toHexString(), ...rest };
  }
}
