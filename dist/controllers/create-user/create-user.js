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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const helpers_1 = require("../helpers");
class CreateUserController {
    constructor(createUserRepository, getUserAuthRepository) {
        this.createUserRepository = createUserRepository;
        this.getUserAuthRepository = getUserAuthRepository;
    }
    handle(httpRequest) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requiredFields = ["firstName", "lastName", "email", "password"];
                for (const field of requiredFields) {
                    if (!((_b = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _a === void 0 ? void 0 : _a[field]) === null || _b === void 0 ? void 0 : _b.length)) {
                        return (0, helpers_1.badRequest)(`Field ${field} is required`);
                    }
                }
                const emailIsValid = validator_1.default.isEmail(httpRequest.body.email);
                if (!emailIsValid) {
                    return (0, helpers_1.badRequest)("E-mail is invalid");
                }
                const userExists = this.getUserAuthRepository.findByEmail(httpRequest.body.email);
                if (yield userExists) {
                    return (0, helpers_1.badRequest)("Please use another email!");
                }
                const salt = yield bcrypt_1.default.genSalt(12);
                const passwordHash = yield bcrypt_1.default.hash(httpRequest.body.password, salt);
                httpRequest.body.password = passwordHash;
                console.log(httpRequest.body);
                const user = yield this.createUserRepository.createUser(httpRequest.body);
                return (0, helpers_1.created)(user);
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.serverError)("02");
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
