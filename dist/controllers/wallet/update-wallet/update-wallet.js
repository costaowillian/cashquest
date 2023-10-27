"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatetWalletController = void 0;
const mongo_get_wallet_1 = require("../../../respositories/wallet/get-wallet/mongo-get-wallet");
const mongo_update_wallet_1 = require("../../../respositories/wallet/update-wallet/mongo-update-wallet");
class UpdatetWalletController {
    constructor() {
        this.updateWalletRepository = new mongo_update_wallet_1.MongoUpdateWalletRepository();
        this.getWalletREpository = new mongo_get_wallet_1.MongoGetWalletRepository();
    }
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = params, rest = __rest(params, ["userId"]);
                const userWallet = yield this.getWalletREpository.getWallet(userId);
                if (!userWallet) {
                    //criar carteira
                }
                if (params.Spendings) {
                    const newTotalSpendings = this.updateValue(rest.Spendings, userWallet.Spendings);
                    const newTotalDeposit = this.updateDeposit(rest.Spendings, userWallet.deposits);
                    const newTotalSavings = this.updateValue(rest.savings, userWallet.savings);
                    params.Spendings = newTotalSpendings;
                    params.deposits = newTotalDeposit;
                    params.savings = newTotalSavings;
                }
                else {
                    const newTotalSpendings = this.updateValue(rest.Spendings, userWallet.Spendings);
                    const newTotalDeposit = this.updateValue(rest.deposits, userWallet.deposits);
                    const newTotalSavings = this.updateValue(rest.savings, userWallet.savings);
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
                const wallet = yield this.updateWalletRepository.UpdateWallet(userId, rest);
                if (!wallet) {
                    return false;
                }
                return true;
            }
            catch (error) {
                throw new Error("Wallet not updated");
            }
        });
    }
    updateValue(value, total) {
        const newTotal = value + total;
        return newTotal;
    }
    updateDeposit(value, total) {
        const newTotal = total - value;
        return newTotal;
    }
}
exports.UpdatetWalletController = UpdatetWalletController;
