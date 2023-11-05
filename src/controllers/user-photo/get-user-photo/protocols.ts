import { IUserPhoto } from "../../../models/user-photo";

export interface GetUserPhotoParams {
    userId: string;
}

export interface IGetUserPhotoRepository {
    getUserPhoto(id: string):Promise<IUserPhoto| null>;
}