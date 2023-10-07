"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpStatusCode = void 0;
var httpStatusCode;
(function (httpStatusCode) {
    httpStatusCode[httpStatusCode["OK"] = 200] = "OK";
    httpStatusCode[httpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    httpStatusCode[httpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    httpStatusCode[httpStatusCode["SERVER_ERROR"] = 500] = "SERVER_ERROR";
    httpStatusCode[httpStatusCode["CREATED"] = 201] = "CREATED";
})(httpStatusCode || (exports.httpStatusCode = httpStatusCode = {}));
