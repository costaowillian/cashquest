"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amountXps = exports.baseXps = void 0;
var baseXps;
(function (baseXps) {
    baseXps[baseXps["BASEXPLEVEL"] = 500] = "BASEXPLEVEL";
})(baseXps || (exports.baseXps = baseXps = {}));
var amountXps;
(function (amountXps) {
    amountXps[amountXps["DEPOSITS"] = 30] = "DEPOSITS";
    amountXps[amountXps["SPENDINGS"] = 60] = "SPENDINGS";
    amountXps[amountXps["SAVINGS"] = 45] = "SAVINGS";
    amountXps[amountXps["GOALS"] = 55] = "GOALS";
})(amountXps || (exports.amountXps = amountXps = {}));
