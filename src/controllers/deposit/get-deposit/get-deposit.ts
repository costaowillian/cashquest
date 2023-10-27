import { IDeposit } from "../../../models/deposit";
import { badRequest, notFound, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetDepositRepository } from "./protocols";

export class GetDepositController implements Icontroller {
    constructor(private readonly getDepositRepository: IGetDepositRepository) {}
    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<IDeposit | string>> {
        try {
            const id =  httpRequest?.params?.id;

            if(!id) {
                return badRequest("Missing id");
            }

            const deposit = await this.getDepositRepository.getDeposit(id);

            if(!deposit) {
                return notFound("Deposit not found");
            }

            return ok<IDeposit>(deposit);
        } catch (error) {
            return serverError("13");
        }
    }

}