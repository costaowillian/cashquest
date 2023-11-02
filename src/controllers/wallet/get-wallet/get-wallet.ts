import { IWallet } from "../../../models/wallet";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetWalletParams, IGetTotalSpendingsRepository, IGetTotalDepositsRepository, IGetTotalSavingsRepository, IGetTotalTransferredSavingsRepository } from "./protocols";

export class GetWalletController implements Icontroller {
    
    constructor(private readonly getTotalSpendingsRepository: IGetTotalSpendingsRepository,
        private readonly getTotalDepositsRepository: IGetTotalDepositsRepository,
        private readonly getTotalMonthlySpendingdsRepository: IGetTotalSpendingsRepository,
        private readonly getTotalSavingsRepositoyr: IGetTotalSavingsRepository,
        private readonly getTotalTransferredSavingsRepository: IGetTotalTransferredSavingsRepository)
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

            const transferredSavings: any = await this.getTotalTransferredSavingsRepository.getTotalTransferredSavings(id);

            const monthlySpendings:any = await this.getTotalMonthlySpendingdsRepository.getTotalSpendings(id);         

            const walletTotal = this.sumWallet(depsosits?.total, spendings?.total, transferredSavings?.total);

            const wallet = {
                totalDeposits: walletTotal,
                monthlySpendings: monthlySpendings?.total,
                savings: savings?.total
            }

            return ok<IWallet[]>(wallet);
        } catch (error) {
            console.log(error);
            return serverError("15");
        }
    }

    private sumWallet(deposits: number = 0, spendings: number = 0, transferredSavings: number = 0) {
        return deposits - (spendings + transferredSavings);
    }

}