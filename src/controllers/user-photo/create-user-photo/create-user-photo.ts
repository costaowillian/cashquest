import { ObjectId } from "mongodb";
import { IUserPhoto } from "../../../models/user-photo";
import { badRequest, created, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IUploadPhotoRepository, UploadPhotoParams } from "./protocols";

export class CreateUserPhotoController implements Icontroller {
    constructor(
        private readonly createUserPhotoRepository: IUploadPhotoRepository
      ) { }
    async handle(httpRequest: HttpRequest<UploadPhotoParams>): Promise<HttpResponse<IUserPhoto| string>> {
        try {
            const body = httpRequest?.body;

            if (!body) {
                return badRequest("Missing Body");
            }

            const validationError = this.validateRequiredFields(body);

            if (validationError) {
                return validationError;
            }

            const UserPhotoData = this.prepareDepositData(body);

            const UserPhoto = await this.createUserPhotoRepository.uploadPhoto(UserPhotoData);
            return created<IUserPhoto>(UserPhoto);


        }catch (error) {
            return serverError("30");
        }
    }

    private validateRequiredFields(body: UploadPhotoParams): HttpResponse<IUserPhoto | string> | undefined {
        const requiredFields = ["_userId", "userPhoto"];
        for (const field of requiredFields) {
          const fieldValue = body?.[field as keyof UploadPhotoParams];
          if (fieldValue === undefined || (typeof fieldValue === "string" && !fieldValue.trim())) {
            return badRequest(`Field ${field} is required`);
          }
        }
        return undefined;
    }

    private prepareDepositData(body: UploadPhotoParams): UploadPhotoParams {
        const data = { ...body };
        data._userId = new ObjectId(body._userId);
        return data;
    }
}