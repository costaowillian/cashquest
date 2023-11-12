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
exports.CreateUserPhotoController = void 0;
const mongodb_1 = require("mongodb");
const helpers_1 = require("../../helpers");
class CreateUserPhotoController {
    constructor(createUserPhotoRepository) {
        this.createUserPhotoRepository = createUserPhotoRepository;
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
                const UserPhotoData = this.prepareDepositData(body);
                const UserPhoto = yield this.createUserPhotoRepository.uploadPhoto(UserPhotoData);
                return (0, helpers_1.created)(UserPhoto);
            }
            catch (error) {
                return (0, helpers_1.serverError)("30");
            }
        });
    }
    validateRequiredFields(body) {
        const requiredFields = ["_userId", "userPhoto"];
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
        data._userId = new mongodb_1.ObjectId(body._userId);
        return data;
    }
}
exports.CreateUserPhotoController = CreateUserPhotoController;
