import { ISaving } from './../../../models/savings';
import { badRequest, notFound, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { GetSavingParams, IGetSavingsRepository } from './protocols';

export class GetSavingsController implements Icontroller {

    constructor(private readonly getSavingsRepository: IGetSavingsRepository){}
    async handle(httpRequest: HttpRequest<GetSavingParams>): Promise<HttpResponse<ISaving[] | string>> {
        try {
            const id = httpRequest?.params?.id;

            if(!id) {
                return badRequest("Missing user id");
            }

            const savings = await this.getSavingsRepository.getSavings(id);

            if (!savings) {
                return notFound("Not found Savings");
            }

            return ok<ISaving[]>(savings);
        } catch(error) {
            return serverError("23");
        }
    }
    
}