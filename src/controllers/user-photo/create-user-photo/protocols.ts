import { ObjectId } from "mongodb";
import { IUserPhoto } from "../../../models/user-photo";

export interface UploadPhotoParams {
    _userId: string | ObjectId;
    userPhoto: string;
}

export interface IUploadPhotoRepository {
    uploadPhoto(params:UploadPhotoParams): Promise<IUserPhoto>;
}