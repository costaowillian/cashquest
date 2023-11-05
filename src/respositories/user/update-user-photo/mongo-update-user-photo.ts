import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { IUpdateUserPhotoRepository, UpdatePhotoParams } from "../../../controllers/user-photo/update-user-photo/protocols";
import { IUserPhoto } from "../../../models/user-photo";
import { MongoPhoto } from "../../mongo-protocols";

export class MongoUpdatePhotoRepository implements IUpdateUserPhotoRepository {
  async updatePhoto(params: UpdatePhotoParams): Promise<IUserPhoto> {
    await MongoClient.db.collection<MongoPhoto>("user-photo").updateOne(
      {
        _id: new ObjectId(params.id)
      },
      {
        $set: {
          ...params
        }
      }
    );

    const UserPhoto = await MongoClient.db
      .collection<MongoPhoto>("user-photo")
      .findOne({ _id: new ObjectId(params.id) });

    if (!UserPhoto) {
      throw new Error("user photo not updated");
    }

    const { _id, ...rest } = UserPhoto;
    return { id: _id.toHexString(), ...rest };
  }
}
