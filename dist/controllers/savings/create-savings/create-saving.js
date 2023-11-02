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
exports.CreateSavingController = void 0;
const helpers_1 = require("../../helpers");
const mongodb_1 = require("mongodb");
const create_savings_installments_1 = require("./create-savings-installments");
class CreateSavingController {
    constructor(createSavingRepository) {
        this.createSavingRepository = createSavingRepository;
        this.createInstallmentsSavingController =
            new create_savings_installments_1.CreateInstallmentsSavingController(createSavingRepository);
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!body) {
                    return (0, helpers_1.badRequest)("Missing Body");
                }
                const validationError = this.validateRequiredFields(body);
                if (validationError) {
                    return validationError;
                }
                const savingData = this.prepareSavingsData(body);
                if (body.installments && body.installments > 1) {
                    if (body.isFixed) {
                        const installmentsDeposits = yield this.createInstallmentsSavingController.handle(savingData);
                        if (installmentsDeposits) {
                            return (0, helpers_1.created)(installmentsDeposits);
                        }
                        else {
                            return (0, helpers_1.serverError)("12");
                        }
                    }
                    else {
                        return (0, helpers_1.badRequest)("Missing fields");
                    }
                }
                else {
                    const deposit = yield this.createSavingRepository.createSaving(savingData);
                    return (0, helpers_1.created)(deposit);
                }
            }
            catch (error) {
                return (0, helpers_1.serverError)("21");
            }
        });
    }
    validateRequiredFields(body) {
        const requiredFields = ["_userId", "category", "value", "isFixed", "createAt", "isTransferred"];
        for (const field of requiredFields) {
            const fieldValue = body === null || body === void 0 ? void 0 : body[field];
            if (fieldValue === undefined || (typeof fieldValue === "string" && !fieldValue.trim())) {
                return (0, helpers_1.badRequest)(`Field ${field} is required`);
            }
        }
        return undefined;
    }
    prepareSavingsData(body) {
        const savingData = Object.assign({}, body);
        savingData._userId = new mongodb_1.ObjectId(body._userId);
        savingData.createAt = new Date(body.createAt);
        return savingData;
    }
}
exports.CreateSavingController = CreateSavingController;
