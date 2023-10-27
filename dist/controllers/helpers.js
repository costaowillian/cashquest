"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.notFound = exports.badRequest = exports.created = exports.ok = void 0;
const protocols_1 = require("./protocols");
const ok = (body) => {
    return {
        statusCode: protocols_1.httpStatusCode.OK,
        body: body
    };
};
exports.ok = ok;
const created = (body) => {
    return {
        statusCode: protocols_1.httpStatusCode.CREATED,
        body: body
    };
};
exports.created = created;
const badRequest = (message) => {
    return {
        statusCode: protocols_1.httpStatusCode.BAD_REQUEST,
        body: message
    };
};
exports.badRequest = badRequest;
const notFound = (message) => {
    return {
        statusCode: protocols_1.httpStatusCode.NOTFOUND,
        body: message
    };
};
exports.notFound = notFound;
const serverError = (code) => {
    return {
        statusCode: protocols_1.httpStatusCode.SERVER_ERROR,
        body: "something went wrong. internal code: " + code
    };
};
exports.serverError = serverError;
