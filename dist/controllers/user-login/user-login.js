"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.LoginUserController = void 0;
const helpers_1 = require("../helpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
class LoginUserController {
    constructor(getUserAuthRepository) {
        this.getUserAuthRepository = getUserAuthRepository;
    }
    handle(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log({ body: httpRequest });
                const { email, password } = httpRequest.body;
                if (!email) {
                    return (0, helpers_1.badRequest)("Email is mandatory!");
                }
                if (!password) {
                    return (0, helpers_1.badRequest)("The password is mandatory!");
                }
                const user = yield this.getUserAuthRepository.findByEmail(httpRequest.body.email);
                if (!user) {
                    return (0, helpers_1.badRequest)("User not Found");
                }
                const checkPassword = yield bcrypt_1.default.compare(httpRequest.body.password, user.password);
                if (!checkPassword) {
                    return (0, helpers_1.badRequest)("Invalid credentials");
                }
                const secret = (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : "";
                const token = jwt.sign({
                    id: user.id
                }, secret);
                const response = { token: token, user: Object.assign(Object.assign({}, user), { password: undefined, _id: undefined }), };
                return (0, helpers_1.ok)(response);
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.serverError)("05");
            }
        });
    }
}
exports.LoginUserController = LoginUserController;
