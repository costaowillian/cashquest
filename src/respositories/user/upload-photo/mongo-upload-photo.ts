import { IUploadPhotoRepository, UploadPhotoParams } from "../../../controllers/user-photo/create-user-photo/protocols";
import { MongoClient } from "../../../database/mongo";
import { IUserPhoto } from "../../../models/user-photo";
import { MongoPhoto } from "../../mongo-protocols";

export class MongoUploadPhotoRepository implements IUploadPhotoRepository {
    async uploadPhoto(params: UploadPhotoParams): Promise<IUserPhoto> {
        const { insertedId } = await MongoClient.db
        .collection("user-photo")
        .insertOne(params);

        const photo = await MongoClient.db.collection<MongoPhoto>("user-photo").findOne({_id: insertedId});

        if(!photo) {
            throw new Error('error on upload photo');
        }

        const {_id, ...rest} = photo;

        return {id: _id.toHexString(), ...rest}
    }

}