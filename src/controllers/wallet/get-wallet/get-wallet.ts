import { IWallet } from "../../../models/wallet";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetWalletParams, IGetTotalSpendingsRepository } from "./protocols";

export class GetWalletController implements Icontroller {
    
    constructor(private readonly getTotalSpendingsRepository: IGetTotalSpendingsRepository)
        {}
    async handle(httpRequest: HttpRequest<IGetWalletParams>): Promise<HttpResponse<IWallet[] | string>> {
        try {
            const id = httpRequest?.params?.id;

            if(!id) {
                return badRequest("Missing Id");
            }
            
            const wallet = await this.getTotalSpendingsRepository.getTotalSpendings(id);

            return ok<IWallet[]>(wallet);
        } catch (error) {
            return serverError("15");
        }
    }

}