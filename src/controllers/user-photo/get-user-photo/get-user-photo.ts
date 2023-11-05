import { IUserPhoto } from "../../../models/user-photo";
import { badRequest, notFound, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { GetUserPhotoParams, IGetUserPhotoRepository } from "./protocols";

export class GetUserPhotoController implements Icontroller {
    constructor(private readonly getUserphotoRepository: IGetUserPhotoRepository) {}
    async handle(httpRequest: HttpRequest<GetUserPhotoParams>): Promise<HttpResponse<IUserPhoto | string>> {
        try {
            const id =  httpRequest?.params?.id;

            if(!id) {
                return badRequest("Missing id");
            }

            const userPhoto = await this.getUserphotoRepository.getUserPhoto(id);

            if(!userPhoto) {
                return notFound("user photo not found");
            }

            return ok<IUserPhoto>(userPhoto);
        } catch (error) {
            return serverError("31");
        }
    }

}