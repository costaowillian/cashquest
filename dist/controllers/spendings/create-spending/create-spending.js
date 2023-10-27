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
exports.CreateSpendingController = void 0;
const mongodb_1 = require("mongodb");
const helpers_1 = require("../../helpers");
class CreateSpendingController {
    constructor(createSpendingRepository) {
        this.createSpendingRepository = createSpendingRepository;
    }
    handle(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log({ controller: httpRequest.body });
                const requiredFields = [
                    "_userId",
                    "category",
                    "value",
                    " isFixed",
                    "createAt"
                ];
                for (const field of requiredFields) {
                    if (!((_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _a === void 0 ? void 0 : _a[field])) {
                        return (0, helpers_1.badRequest)(`Field ${field} is required`);
                    }
                }
                httpRequest.body._userId = new mongodb_1.ObjectId(httpRequest.body._userId);
                const spending = yield this.createSpendingRepository.createSpending(httpRequest.body);
                return (0, helpers_1.created)(spending);
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.serverError)("07");
            }
        });
    }
}
exports.CreateSpendingController = CreateSpendingController;
