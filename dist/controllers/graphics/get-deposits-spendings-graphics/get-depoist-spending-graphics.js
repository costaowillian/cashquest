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
exports.GetDepositSpendingGraphicController = void 0;
const helpers_1 = require("../../helpers");
class GetDepositSpendingGraphicController {
    constructor(getSpendingDepositGraphicRepository) {
        this.getSpendingDepositGraphicRepository = getSpendingDepositGraphicRepository;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!body) {
                    return (0, helpers_1.badRequest)("Missing Fields");
                }
                const validationError = this.validateRequiredFields(body);
                if (validationError) {
                    return validationError;
                }
                const data = this.prepareDepositData(body);
                let deposits = yield this.getSpendingDepositGraphicRepository.getSpandingAndDepositGraphic(data, "deposit");
                if (!deposits) {
                    deposits = 0;
                }
                let spendings = yield this.getSpendingDepositGraphicRepository.getSpandingAndDepositGraphic(data, "spending");
                if (!spendings) {
                    spendings = 0;
                }
                const graphicData = {
                    depositsTotal: deposits.total || 0,
                    spendingsTotal: spendings.total || 0,
                };
                return (0, helpers_1.ok)(graphicData);
            }
            catch (error) {
                return (0, helpers_1.badRequest)("26");
            }
        });
    }
    validateRequiredFields(body) {
        const requiredFields = ["userId", "startDate", "endDate"];
        for (const field of requiredFields) {
            const fieldValue = body === null || body === void 0 ? void 0 : body[field];
            if (fieldValue === undefined || (typeof fieldValue === "string" && !fieldValue.trim())) {
                return (0, helpers_1.badRequest)(`Field ${field} is required`);
            }
        }
        return undefined;
    }
    prepareDepositData(body) {
        const data = Object.assign({}, body);
        data.startDate = new Date(body.startDate);
        data.endDate = new Date(body.endDate);
        return data;
    }
}
exports.GetDepositSpendingGraphicController = GetDepositSpendingGraphicController;
