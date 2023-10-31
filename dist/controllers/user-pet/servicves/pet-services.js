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
exports.PetDetailsService = void 0;
const protocols_1 = require("../create-user-pet/protocols");
class PetDetailsService {
    constructor(getSumDepositsRepository, getSumSpendingRepository, getTotalDepositsRepository, getTotalSpendingsRepository, getSumSavingsRepository, getBasePetsRepository) {
        this.getSumDepositsRepository = getSumDepositsRepository;
        this.getSumSpendingRepository = getSumSpendingRepository;
        this.getTotalDepositsRepository = getTotalDepositsRepository;
        this.getTotalSpendingsRepository = getTotalSpendingsRepository;
        this.getSumSavingsRepository = getSumSavingsRepository;
        this.getBasePetsRepository = getBasePetsRepository;
    }
    getXps(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sumDeposits = yield this.getSumDepositsRepository.getSumDeposits(id);
            const sumSpendings = yield this.getSumSpendingRepository.getSumSpendings(id);
            const sumSavings = yield this.getSumSavingsRepository.getSumSavings(id);
            let spendingsXps = 0;
            let depositsXps = 0;
            let savingsXps = 0;
            if (sumDeposits != 0 || sumSpendings != 0 || sumSavings != 0) {
                depositsXps = this.sumXps(protocols_1.amountXps.DEPOSITS, sumDeposits.total);
                spendingsXps = this.sumXps(protocols_1.amountXps.SPENDINGS, sumSpendings.total);
                savingsXps = this.sumXps(protocols_1.amountXps.SAVINGS, sumSavings);
            }
            const totalXps = depositsXps + spendingsXps + savingsXps;
            if (totalXps === null) {
                return 0;
            }
            return totalXps;
        });
    }
    sumXps(xps, sumItems) {
        return xps + sumItems;
    }
    getHealth(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalDposits = yield this.getTotalDepositsRepository.getTotalDeposits(id);
            const totalSpendings = yield this.getTotalSpendingsRepository.getTotalSpendings(id);
            let health = 0;
            if (totalDposits != 0 && totalSpendings != 0) {
                health = (totalDposits === null || totalDposits === void 0 ? void 0 : totalDposits.total) - (totalSpendings === null || totalSpendings === void 0 ? void 0 : totalSpendings.total);
            }
            if (health <= 0) {
                return true;
            }
            return false;
        });
    }
    getLevel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userXps = yield this.getXps(id);
            const pets = yield this.getBasePetsRepository.getBasePets();
            const petLevel = Math.floor(userXps / protocols_1.baseXps.BASEXPLEVEL);
            switch (petLevel) {
                case 0:
                    return pets[0];
                case 1:
                    return pets[1];
                case 2:
                    return pets[2];
                case 4:
                    return pets[3];
                case 5:
                    return pets[4];
                case 6:
                    return pets[5];
                case 7:
                    return pets[6];
                default:
                    return pets[0];
            }
        });
    }
}
exports.PetDetailsService = PetDetailsService;
