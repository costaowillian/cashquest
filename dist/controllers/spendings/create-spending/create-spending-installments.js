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
exports.CreateInstallmentsSpendingController = void 0;
const helpers_1 = require("../../helpers");
const date_fns_1 = require("date-fns");
class CreateInstallmentsSpendingController {
    constructor(creatSpendingRepository) {
        this.creatSpendingRepository = creatSpendingRepository;
    }
    handle(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const numMonths = params === null || params === void 0 ? void 0 : params.installments;
                const spendings = [];
                const installmentsValue = Math.floor((params.value / params.installments) * 100) / 100;
                for (let i = 0; i < numMonths; i++) {
                    const newDate = new Date(params.createAt);
                    const date = (0, date_fns_1.addMonths)(newDate, i);
                    const depositData = Object.assign(Object.assign({}, params), { total: params.value, _userId: params._userId, createAt: (0, helpers_1.formatDate)(date), value: installmentsValue });
                    const spending = yield this.creatSpendingRepository.createSpending(depositData);
                    if (spending) {
                        spendings.push(spending);
                    }
                }
                if (spendings.length == numMonths) {
                    return spendings[0];
                }
                return false;
            }
            catch (error) {
                return "Server Error";
            }
        });
    }
}
exports.CreateInstallmentsSpendingController = CreateInstallmentsSpendingController;
