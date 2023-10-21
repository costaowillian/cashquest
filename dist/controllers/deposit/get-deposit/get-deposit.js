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
exports.GetDepositController = void 0;
const helpers_1 = require("../../helpers");
class GetDepositController {
    constructor(getDepositRepository) {
        this.getDepositRepository = getDepositRepository;
    }
    handle(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.params) === null || _a === void 0 ? void 0 : _a.id;
                if (!id) {
                    return (0, helpers_1.badRequest)("Missing id");
                }
                const deposit = yield this.getDepositRepository.getDeposit(id);
                if (!deposit) {
                    return (0, helpers_1.notFound)("Deposit not found");
                }
                return (0, helpers_1.ok)(deposit);
            }
            catch (error) {
                return (0, helpers_1.serverError)("13");
            }
        });
    }
}
exports.GetDepositController = GetDepositController;
