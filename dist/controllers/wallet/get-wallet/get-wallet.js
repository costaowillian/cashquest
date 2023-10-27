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
    constructor(getTotalSpendingsRepository, getTotalDepositsRepository, getTotalMonthlySpendingdsRepository) {
        this.getTotalSpendingsRepository = getTotalSpendingsRepository;
        this.getTotalDepositsRepository = getTotalDepositsRepository;
        this.getTotalMonthlySpendingdsRepository = getTotalMonthlySpendingdsRepository;
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
                const monthlySpendings = yield this.getTotalMonthlySpendingdsRepository.getTotalSpendings(id);
                const walletTotal = this.sumWallet(depsosits === null || depsosits === void 0 ? void 0 : depsosits.total, spendings === null || spendings === void 0 ? void 0 : spendings.total);
                const wallet = {
                    totalDeposits: walletTotal,
                    spendings: spendings === null || spendings === void 0 ? void 0 : spendings.total,
                    monthlySpendings: monthlySpendings === null || monthlySpendings === void 0 ? void 0 : monthlySpendings.total,
                    savings: 0
                };
                console.log(wallet);
                return (0, helpers_1.ok)(wallet);
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.serverError)("15");
            }
        });
    }
    sumWallet(deposits = 0, spendings = 0) {
        return deposits - spendings;
    }
}
exports.GetWalletController = GetWalletController;
