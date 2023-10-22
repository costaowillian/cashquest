import { IWallet } from "../../../models/wallet";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetWalletParams, IGetTotalSpendingsRepository, IGetTotalDepositsRepository } from "./protocols";

export class GetWalletController implements Icontroller {
    
    constructor(private readonly getTotalSpendingsRepository: IGetTotalSpendingsRepository,
        private readonly getTotalDepositsRepository: IGetTotalDepositsRepository,
        private readonly getTotalMonthlySpendingdsRepository: IGetTotalSpendingsRepository)
        {}
    async handle(httpRequest: HttpRequest<IGetWalletParams>): Promise<HttpResponse<IWallet[] | string>> {
        try {
            const id = httpRequest?.params?.id;

            if(!id) {
                return badRequest("Missing Id");
            }
            
            const spendings = await this.getTotalSpendingsRepository.getTotalSpendings(id);

            const depsosits = await this.getTotalDepositsRepository.getTotalDeposits(id);

            const monthlySpendings = await this.getTotalMonthlySpendingdsRepository.getTotalSpendings(id);

            const walletTotal = this.sumWallet(depsosits?.total, spendings?.total);
            
            const wallet = {
                totalDeposits: walletTotal,
                spendings: spendings?.total,
                monthlySpendings: monthlySpendings?.total,
                savings: 0
            }

            console.log(wallet);

            return ok<IWallet[]>(wallet);
        } catch (error) {
            console.log(error);
            return serverError("15");
        }
    }

    private sumWallet(deposits: number = 0, spendings: number = 0) {
        return deposits - spendings;
    }

}