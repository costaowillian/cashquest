import { IWallet } from "../../../models/wallet";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetWalletParams, IGetTotalSpendingsRepository, IGetTotalDepositsRepository, IGetTotalSavingsRepository } from "./protocols";

export class GetWalletController implements Icontroller {
    
    constructor(private readonly getTotalSpendingsRepository: IGetTotalSpendingsRepository,
        private readonly getTotalDepositsRepository: IGetTotalDepositsRepository,
        private readonly getTotalMonthlySpendingdsRepository: IGetTotalSpendingsRepository,
        private readonly getTotalSavingsRepositoyr: IGetTotalSavingsRepository)
        {}
    async handle(httpRequest: HttpRequest<IGetWalletParams>): Promise<HttpResponse<IWallet[] | string>> {
        try {
            const id = httpRequest?.params?.id;

            if(!id) {
                return badRequest("Missing Id");
            }
            
            const spendings:any = await this.getTotalSpendingsRepository.getTotalSpendings(id);

            const depsosits:any = await this.getTotalDepositsRepository.getTotalDeposits(id);

            const savings: any = await this.getTotalSavingsRepositoyr.getTotalSavings(id);

            const monthlySpendings:any = await this.getTotalMonthlySpendingdsRepository.getTotalSpendings(id);

            const walletTotal = this.sumWallet(depsosits?.total, spendings?.total);
                
            const wallet = {
                totalDeposits: walletTotal,
                spendings: spendings?.total,
                monthlySpendings: monthlySpendings?.total,
                savings: savings?.total
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