import { IDeposit } from './../../../models/deposit';
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IDeleteDepositRepository } from "./protocols";

export class DeleteDepositController implements Icontroller {
    constructor(private readonly deleteSpendingRepository: IDeleteDepositRepository){}
    
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<IDeposit | string>> {
        try {

            const id = httpRequest?.params?.id;

            if (!id) {
                return badRequest("Missing deposit id");
            }

            const deposit = await this.deleteSpendingRepository.deleteDeposit(id);

            return ok<IDeposit>(deposit);
        } catch (error) {
            return serverError("14");
        }
    }

}