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
exports.CreateDepositController = void 0;
const mongodb_1 = require("mongodb");
const helpers_1 = require("../../helpers");
class CreateDepositController {
    constructor(createDepositRepository) {
        this.createDepositRepository = createDepositRepository;
    }
    handle(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!body) {
                    return (0, helpers_1.badRequest)("Missing Body");
                }
                const requiredFields = [
                    "_userId",
                    "category",
                    "value",
                    "isFixed",
                    "createAt"
                ];
                for (const field of requiredFields) {
                    const fieldValue = (_a = httpRequest.body) === null || _a === void 0 ? void 0 : _a[field];
                    if (fieldValue === undefined ||
                        (typeof fieldValue === "string" && !fieldValue.trim())) {
                        return (0, helpers_1.badRequest)(`Field ${field} is required`);
                    }
                }
                httpRequest.body._userId = new mongodb_1.ObjectId(httpRequest.body._userId);
                const deposit = yield this.createDepositRepository.createDeposit(httpRequest.body);
                return (0, helpers_1.created)(deposit);
            }
            catch (error) {
                return (0, helpers_1.serverError)("12");
            }
        });
    }
}
exports.CreateDepositController = CreateDepositController;
