import { ISaving } from "../../../models/savings";
import { badRequest, notFound, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetSavingRepository } from "./protocols";

export class GetSavingController implements Icontroller {
    constructor(private readonly getSavingRepository: IGetSavingRepository) {}
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<ISaving | string>> {
        try {
            const id = httpRequest?.params?.id;

            if(!id) {
                return badRequest("Missing Id");
            }

            const saving = await this.getSavingRepository.getSaving(id);

            if(!saving) {
                return notFound("Saving not found");
            }

            return ok<ISaving>(saving);
        } catch (error) {
            return serverError("22");
        }
    }
}