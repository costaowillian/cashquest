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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWalletController = void 0;
const helpers_1 = require("../../helpers");
class GetWalletController {
    constructor(getTotalSpendingsRepository, getTotalDepositsRepository, getTotalMonthlySpendingdsRepository, getTotalSavingsRepositoyr, getTotalTransferredSavingsRepository, getTotalTranferredSpendingsRepository) {
        this.getTotalSpendingsRepository = getTotalSpendingsRepository;
        this.getTotalDepositsRepository = getTotalDepositsRepository;
        this.getTotalMonthlySpendingdsRepository = getTotalMonthlySpendingdsRepository;
        this.getTotalSavingsRepositoyr = getTotalSavingsRepositoyr;
        this.getTotalTransferredSavingsRepository = getTotalTransferredSavingsRepository;
        this.getTotalTranferredSpendingsRepository = getTotalTranferredSpendingsRepository;
    }
    handle(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.params) === null || _a === void 0 ? void 0 : _a.id;
                if (!id) {
                    return (0, helpers_1.badRequest)("Missing Id");
                }
                const spendings = yield this.getTotalSpendingsRepository.getTotalSpendings(id);
                const depsosits = yield this.getTotalDepositsRepository.getTotalDeposits(id);
                const savings = yield this.getTotalSavingsRepositoyr.getTotalSavings(id);
                const transferredSavings = yield this.getTotalTransferredSavingsRepository.getTotalTransferredSavings(id);
                const monthlySpendings = yield this.getTotalMonthlySpendingdsRepository.getTotalSpendings(id);
                const transferredSpendings = yield this.getTotalTranferredSpendingsRepository.getTotalSpendings(id);
                const walletTotalDeposits = this.sumWalletDeposits(depsosits === null || depsosits === void 0 ? void 0 : depsosits.total, spendings === null || spendings === void 0 ? void 0 : spendings.total, transferredSavings === null || transferredSavings === void 0 ? void 0 : transferredSavings.total);
                console.log({ walletTotalDeposits });
                console.log({ monthlySpendings });
                const walletTotalSavings = this.sumWalletSavings(savings === null || savings === void 0 ? void 0 : savings.total, transferredSpendings === null || transferredSpendings === void 0 ? void 0 : transferredSpendings.total);
                const wallet = {
                    totalDeposits: walletTotalDeposits,
                    monthlySpendings: monthlySpendings.total,
                    savings: walletTotalSavings
                };
                console.log({ wallet });
                return (0, helpers_1.ok)(wallet);
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.serverError)("15");
            }
        });
    }
    sumWalletSavings(deposits = 0, spendings = 0, transferredSavings = 0) {
        return deposits - (spendings + transferredSavings);
    }
    sumWalletDeposits(deposits = 0, spendings = 0, transferredSavings = 0) {
        return deposits - (spendings + transferredSavings);
    }
}
exports.GetWalletController = GetWalletController;
