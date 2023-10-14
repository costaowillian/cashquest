import { ISpending } from "../../models/spending";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../protocols";
import { IDeleteSpendingRepository } from "./protocols";

export class DeleteSpendingController implements Icontroller {

    constructor(private readonly deleteSpendingRepository: IDeleteSpendingRepository) {

    }
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<ISpending | string>> {
        try {
            const id = httpRequest?.params?.id;

            if(!id) {
                return badRequest("Missing spending id");
            }

            const spending = await this.deleteSpendingRepository.deleteSpending(id);
            
            return ok<ISpending>(spending);
        } catch(error) {
            return serverError("04");
        }
    }

}