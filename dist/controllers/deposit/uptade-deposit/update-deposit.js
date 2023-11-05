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
exports.UpdateDepositController = void 0;
const helpers_1 = require("../../helpers");
class UpdateDepositController {
    constructor(updateDepositRepository) {
        this.updateDepositRepository = updateDepositRepository;
    }
    handle(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.params) === null || _a === void 0 ? void 0 : _a.id;
                const body = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!body) {
                    return (0, helpers_1.badRequest)('Missing body');
                }
                if (!id) {
                    return (0, helpers_1.badRequest)('Missing deposit id');
                }
                const AllowedToUpdate = [
                    'category',
                    'description',
                    'value',
                    'attachment',
                    'isFixed',
                    'comments',
                    'installments'
                ];
                const someFieldsNotAllowedToUpdate = Object.keys(body).some((key) => !AllowedToUpdate.includes(key));
                if (someFieldsNotAllowedToUpdate) {
                    return (0, helpers_1.badRequest)("Some received fields is not allowed");
                }
                const updatedbody = Object.assign({}, body);
                const paramToRemove = "userId";
                delete updatedbody[paramToRemove];
                const deposit = yield this.updateDepositRepository.update(id, updatedbody);
                return (0, helpers_1.ok)(deposit);
            }
            catch (error) {
                return (0, helpers_1.serverError)("15");
            }
        });
    }
}
exports.UpdateDepositController = UpdateDepositController;
