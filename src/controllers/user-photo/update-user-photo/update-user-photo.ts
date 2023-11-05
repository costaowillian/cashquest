import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { badRequest, ok, serverError } from '../../helpers';
import { IUpdateUserPhotoRepository, UpdatePhotoParams } from "./protocols";
import { IUserPhoto } from "../../../models/user-photo";

export class UpdateuserPhotoController implements Icontroller {
    constructor(private readonly updateUserPhotoRepository: IUpdateUserPhotoRepository){}
    
    async handle(httpRequest: HttpRequest<UpdatePhotoParams>): Promise<HttpResponse<IUserPhoto | string>> {
        try {
            const body = httpRequest?.body;

            if(!body) {
                return badRequest('Missing body');
            }

            const AllowedToUpdate: (keyof UpdatePhotoParams)[] = [
             'id',
             'userId',
             'userPhoto'
            ];

            const someFieldsNotAllowedToUpdate = Object.keys(body).some((key) => !AllowedToUpdate.includes(key as keyof UpdatePhotoParams));

            if(someFieldsNotAllowedToUpdate) {
                return badRequest("Some received fields is not allowed");
            }


            const userPhoto = await this.updateUserPhotoRepository.updatePhoto(body);

            return ok<IUserPhoto>(userPhoto);
        } catch (error) {
            return serverError("15");
        }
    }

}