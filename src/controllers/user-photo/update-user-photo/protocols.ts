import { IUserPhoto } from "../../../models/user-photo";

export interface UpdatePhotoParams {
    id: string;
    userId: string;
    userPhoto: string;
}

export interface IUpdateUserPhotoRepository {
    updatePhoto(params: UpdatePhotoParams): Promise<IUserPhoto>
}