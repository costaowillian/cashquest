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
exports.GetSavingsController = void 0;
const helpers_1 = require("../../helpers");
class GetSavingsController {
    constructor(getSavingsRepository) {
        this.getSavingsRepository = getSavingsRepository;
    }
    handle(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.params) === null || _a === void 0 ? void 0 : _a.id;
                if (!id) {
                    return (0, helpers_1.badRequest)("Missing user id");
                }
                const savings = yield this.getSavingsRepository.getSavings(id);
                if (!savings) {
                    return (0, helpers_1.notFound)("Not found Savings");
                }
                return (0, helpers_1.ok)(savings);
            }
            catch (error) {
                return (0, helpers_1.serverError)("23");
            }
        });
    }
}
exports.GetSavingsController = GetSavingsController;
