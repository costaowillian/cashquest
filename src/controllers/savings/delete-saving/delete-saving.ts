import { ISaving } from './../../../models/savings';
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { DeleteSavingParams, IDeleteSavingRepository } from "./protocols";

export class DeleteSavingController implements Icontroller {

    constructor(private readonly deleteSavingRepository: IDeleteSavingRepository){}
    async handle(httpRequest: HttpRequest<DeleteSavingParams>): Promise<HttpResponse<ISaving | string>> {
        try {
            const id = httpRequest?.params?.id

            if(!id) {
                return badRequest("Missing saving id");
            }

            const saving = this.deleteSavingRepository.deleteSaving(id);
            
            return ok<ISaving>(saving);
        } catch(error) {
            return serverError("24");
        }
    }

}