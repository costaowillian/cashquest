import { IWallet } from "../../../models/wallet";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetWalletParams, IGetTotalSpendingsRepository, IGetTotalDepositsRepository, IGetTotalSavingsRepository, IGetTotalTransferredSavingsRepository } from "./protocols";

export class GetWalletController implements Icontroller {
    
    constructor(private readonly getTotalSpendingsRepository: IGetTotalSpendingsRepository,
        private readonly getTotalDepositsRepository: IGetTotalDepositsRepository,
        private readonly getTotalMonthlySpendingdsRepository: IGetTotalSpendingsRepository,
        private readonly getTotalSavingsRepositoyr: IGetTotalSavingsRepository,
        private readonly getTotalTransferredSavingsRepository: IGetTotalTransferredSavingsRepository,
        private readonly getTotalTranferredSpendingsRepository: IGetTotalSpendingsRepository,){}
    async handle(httpRequest: HttpRequest<IGetWalletParams>): Promise<HttpResponse<IWallet[] | string>> {
        try {
            const id = httpRequest?.params?.id;

            if(!id) {
                return badRequest("Missing Id");
            }
            
            const spendings: any = await this.getTotalSpendingsRepository.getTotalSpendings(id);

            const depsosits:any = await this.getTotalDepositsRepository.getTotalDeposits(id);

            const savings: any = await this.getTotalSavingsRepositoyr.getTotalSavings(id);

            const transferredSavings: any = await this.getTotalTransferredSavingsRepository.getTotalTransferredSavings(id);

            const monthlySpendings:any = await this.getTotalMonthlySpendingdsRepository.getTotalSpendings(id);
            
            const transferredSpendings: any = await this.getTotalTranferredSpendingsRepository.getTotalSpendings(id);         

            const walletTotalDeposits = this.sumWalletDeposits(depsosits?.total, spendings?.total, transferredSavings?.total);
            console.log({walletTotalDeposits});
            console.log({monthlySpendings});

            const walletTotalSavings = this.sumWalletSavings(savings?.total, transferredSpendings?.total);

            const wallet = {
                totalDeposits: walletTotalDeposits,
                monthlySpendings: monthlySpendings!.total,
                savings: walletTotalSavings
            }

            console.log({wallet});

            return ok<IWallet[]>(wallet);
        } catch (error) {
            console.log(error);
            return serverError("15");
        }
    }

    private sumWalletSavings(deposits: number = 0, spendings: number = 0, transferredSavings: number = 0) {
        return deposits - (spendings + transferredSavings);
    }

    private sumWalletDeposits(deposits: number = 0, spendings: number = 0, transferredSavings: number = 0) {
        return deposits - (spendings + transferredSavings);
    }

}