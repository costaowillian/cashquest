import { ObjectId } from "mongodb";
import { IGetUserPhotoRepository } from "../../../controllers/user-photo/get-user-photo/protocols";
import { MongoClient } from "../../../database/mongo";
import { IUserPhoto } from "../../../models/user-photo";
import { MongoPhoto } from "../../mongo-protocols";

export class MongoGetUserPhotoRepository implements IGetUserPhotoRepository {
  async getUserPhoto(userId: string): Promise<IUserPhoto |null> {
    const userPhoto = await MongoClient.db
      .collection<MongoPhoto>("user-photo")
      .findOne({ _id: new ObjectId(userId) });

    if (!userPhoto) {
      return null;
    }

    const { _id, ...rest } = userPhoto;

    return { id: _id.toHexString(), ...rest };
  }
}
