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
exports.UpdateUserPhotoController = void 0;
const helpers_1 = require("../../helpers");
class UpdateUserPhotoController {
    constructor(updateUserPhotoRepository) {
        this.updateUserPhotoRepository = updateUserPhotoRepository;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body;
                if (!body) {
                    return (0, helpers_1.badRequest)('Missing body');
                }
                const AllowedToUpdate = [
                    'id',
                    'userId',
                    'userPhoto'
                ];
                const someFieldsNotAllowedToUpdate = Object.keys(body).some((key) => !AllowedToUpdate.includes(key));
                if (someFieldsNotAllowedToUpdate) {
                    return (0, helpers_1.badRequest)("Some received fields is not allowed");
                }
                const userPhoto = yield this.updateUserPhotoRepository.updatePhoto(body);
                return (0, helpers_1.ok)(userPhoto);
            }
            catch (error) {
                return (0, helpers_1.serverError)("15");
            }
        });
    }
}
exports.UpdateUserPhotoController = UpdateUserPhotoController;
