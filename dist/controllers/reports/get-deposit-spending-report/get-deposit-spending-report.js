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
exports.GetReportController = void 0;
const helpers_1 = require("../../helpers");
class GetReportController {
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
                const deposits = yield this.getReportRepository.getReport(body, "deposit");
                const spendings = yield this.getReportRepository.getReport(body, "spending");
                const data = {
                    depoists: deposits || [],
                    spandings: spendings || []
                };
                return (0, helpers_1.ok)(data);
            }
            catch (error) {
                return (0, helpers_1.serverError)("28");
            }
        });
    }
}
exports.GetReportController = GetReportController;
