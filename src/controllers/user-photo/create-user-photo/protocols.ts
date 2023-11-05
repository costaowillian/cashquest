import { IUserPhoto } from "../../../models/user-photo";

export interface UploadPhotoParams {
    userId: string;
    userphot: string;
}

export interface IUploadPhotoRepository {
    uploadPhoto(params:UploadPhotoParams): Promise<IUserPhoto>;
}