import { IWallet } from "../../../models/wallet";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetWalletParams, IGetWalletREpository } from "./protocols";

export class GetWalletController implements Icontroller {
    
    constructor(private readonly getWalletRepository: IGetWalletREpository){}
    async handle(httpRequest: HttpRequest<IGetWalletParams>): Promise<HttpResponse<IWallet[] | string>> {
        try {
            const id = httpRequest?.params?.id;

            if(!id) {
                return badRequest("Missing Id");
            }

            const wallet = await this.getWalletRepository.getWallet(id);

            return ok<IWallet[]>(wallet);
        } catch (error) {
            return serverError("15");
        }
    }

}