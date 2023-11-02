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
exports.GetSpendingReportController = void 0;
const helpers_1 = require("../../helpers");
class GetSpendingReportController {
    constructor(getReportRepository) {
        this.getReportRepository = getReportRepository;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!body) {
                    return (0, helpers_1.serverError)("Missing fields");
                }
                const spendings = yield this.getReportRepository.getReport(body, "saving");
                return (0, helpers_1.ok)(spendings || []);
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.serverError)("29");
            }
        });
    }
}
exports.GetSpendingReportController = GetSpendingReportController;
