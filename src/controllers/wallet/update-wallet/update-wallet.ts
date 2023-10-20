import { MongoGetWalletRepository } from "../../../respositories/wallet/get-wallet/mongo-get-wallet";
import { MongoUpdateWalletRepository } from "../../../respositories/wallet/update-wallet/mongo-update-wallet";
import { IGetWalletREpository } from "../get-wallet/protocols";
import { IUpdateWalletRepository, UptadeWalletParamas } from "./protocols";

export class UpdatetWalletController {

    private readonly updateWalletRepository: IUpdateWalletRepository;
    private readonly getWalletREpository: IGetWalletREpository;
    
    constructor(){
        this.updateWalletRepository = new MongoUpdateWalletRepository();
        this.getWalletREpository = new MongoGetWalletRepository();
    }

    async handle(params: UptadeWalletParamas): Promise<boolean> {
        try {

            const { userId, ...rest } = params;

            const userWallet = await this.getWalletREpository.getWallet(userId);  
            
            if(!userWallet) {
                //criar carteira
            }

            if(params.Spendings) {
                const newTotalSpendings =  this.updateValue(rest.Spendings!, userWallet!.Spendings);

                const newTotalDeposit = this.updateDeposit(rest.Spendings!, userWallet!.deposits);

                const newTotalSavings =  this.updateValue(rest.savings!, userWallet!.savings);

                params.Spendings = newTotalSpendings;
                params.deposits = newTotalDeposit;
                params.savings = newTotalSavings;
            } else {
                const newTotalSpendings =  this.updateValue(rest.Spendings!, userWallet!.Spendings);

                const newTotalDeposit = this.updateValue(rest.deposits!, userWallet!.deposits);

                const newTotalSavings =  this.updateValue(rest.savings!, userWallet!.savings);

                params.Spendings = newTotalSpendings;
                params.deposits = newTotalDeposit;
                params.savings = newTotalSavings;

            }

            // if(rest.Spendings) {
            //     const newTotalSpendings =  this.updateValue(rest.Spendings, userWallet!.Spendings);
            //     params.Spendings = newTotalSpendings;

            // } else if(rest.deposits) {
            //     const newTotalDeposits =  this.updateDeposit(rest.Spendings!, userWallet!.deposits);
            //     params.deposits = newTotalDeposits;

            // } else if (rest.savings) {
            //     const newTotalSavings =  this.updateValue(rest.savings, userWallet!.savings);
            //     params.savings = newTotalSavings;

            // } else if(rest.Spendings && rest.deposits) {
            //     const newTotalSpending =  this.updateValue(rest.Spendings, userWallet!.Spendings);
            //     const newTotalDeposit =  this.updateDeposit(rest.deposits, userWallet!.deposits);
            //     params.Spendings = newTotalSpending;
            //     params.deposits = newTotalDeposit;

            // } else if(rest.Spendings && rest.savings) {
            //     const newTotalSpending =  this.updateValue(rest.Spendings, userWallet!.Spendings);
            //     const newTotalSavings =  this.updateValue(rest.savings, userWallet!.savings);
            //     params.Spendings = newTotalSpending;
            //     params.savings = newTotalSavings;

            // } else if (rest.deposits && rest.Spendings) {
            //     const newTotalDeposit =  this.updateDeposit(rest.deposits, userWallet!.deposits);
            //     const newTotalSpending =  this.updateValue(rest.Spendings, userWallet!.Spendings);
            //     params.Spendings = newTotalSpending;
            //     params.deposits = newTotalDeposit;

            // } else if (rest.deposits && rest.savings) {
            //     const newTotalDeposit =  this.updateDeposit(rest.deposits, userWallet!.deposits);
            //     const newTotalSavings =  this.updateValue(rest.savings, userWallet!.savings);
            //     params.deposits = newTotalDeposit;
            //     params.savings = newTotalSavings;

            // } else if (rest.savings && rest.Spendings) {
            //     const newTotalSavings =  this.updateValue(rest.savings, userWallet!.savings);
            //     const newTotalSpending =  this.updateValue(rest.Spendings, userWallet!.Spendings);
            //     params.Spendings = newTotalSpending;
            //     params.savings = newTotalSavings;
                

            // } else if (rest.savings && rest.deposits) {
            //     const newTotalDeposit =  this.updateDeposit(rest.deposits, userWallet!.deposits);
            //     const newTotalSavings =  this.updateValue(rest.savings, userWallet!.savings);
            //     params.savings = newTotalSavings;
            //     params.deposits = newTotalDeposit;

            // } else{
            //     const newTotalSpending =  this.updateValue(rest.Spendings!, userWallet!.Spendings);
            //     const newTotalDeposit = this.updateDeposit(rest.deposits!, userWallet!.deposits);
            //     const newTotalSavings =  this.updateValue(rest.savings!, userWallet!.savings);
            //     params.Spendings = newTotalSpending;
            //     params.savings = newTotalSavings;
            //     params.deposits = newTotalDeposit;
            // }

           const wallet =  await this.updateWalletRepository.UpdateWallet(userId, rest);

           if(!wallet){
            return false;
           }

           return true;
            
        } catch(error) {
            throw new Error("Wallet not updated")
        }
        
    }

    updateValue(value: number, total: number): number {
        const newTotal = value + total
        return newTotal;
    }

    updateDeposit(value: number, total: number): number {
        const newTotal = total - value;
        return newTotal;
    }


}