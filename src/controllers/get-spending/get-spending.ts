import { ISpending } from './../../models/spending';
import { ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../protocols";
import { IGetSpendingRepository } from './protocols';

export class GetSpendingController implements Icontroller {
    constructor(private readonly getSpendingRepository: IGetSpendingRepository) {}
    async handle(httpRequest: HttpRequest<ISpending>): Promise<HttpResponse<ISpending | string>> {
        try{
            const spending = await this.getSpendingRepository.getSpending(httpRequest.headers.id);

            return ok<ISpending>(spending);
        } catch(error) {
            return serverError("08");
        }
    }

}