import { ISpending } from "../../models/spending";
import { ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../protocols";
import { GetSpendingParams, IGetSpendingRepository } from "./protocols";

export class GetSpendingsController implements Icontroller{

    constructor(private readonly getSpendingsRepository: IGetSpendingRepository) {}

    async handle(httpRequest: HttpRequest<GetSpendingParams>): Promise<HttpResponse<ISpending[] | string>> {
        try {
            const spending = await this.getSpendingsRepository.getSpendingByUserId(httpRequest.params);
            

            if(!spending) {
                throw new Error("user has no spendings");
            }

            return ok<ISpending[]>(spending);
        } catch(error) {
            return serverError("06");
        }
    }

}