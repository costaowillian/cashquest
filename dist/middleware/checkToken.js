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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chectToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const protocols_1 = require("../controllers/protocols");
const chectToken = (req, res, next) => {
    var _a;
    const authHeader = req.headers["authorization"];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!token)
        return res.status(protocols_1.httpStatusCode.UNAUTHORIZED).json({ Error: "Access denied!" });
    try {
        const secret = (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : "";
        jwt.verify(token, secret);
        next();
    }
    catch (err) {
        res.status(protocols_1.httpStatusCode.BAD_REQUEST).json({ Error: "The Token is invalid!" });
    }
};
exports.chectToken = chectToken;
