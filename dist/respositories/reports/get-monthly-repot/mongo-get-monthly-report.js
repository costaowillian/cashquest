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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoGetMopnthlyReportRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../../database/mongo");
class MongoGetMopnthlyReportRepository {
    getMonthlyReport(params, collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = mongo_1.MongoClient.db.collection(collectionName);
            const today = new Date(params.date);
            const firstDayMonth = `${today.getFullYear()}-${today.getMonth() + 1}-01 00:00:00`;
            const result = yield collection
                .aggregate([
                {
                    $match: {
                        _userId: new mongodb_1.ObjectId(params.userId),
                        createAt: {
                            $gte: firstDayMonth,
                            $lte: params.date
                        }
                    }
                },
                {
                    $sort: {
                        createAt: -1
                    }
                }
            ])
                .toArray();
            return result.map((_a) => {
                var { _id } = _a, rest = __rest(_a, ["_id"]);
                return (Object.assign(Object.assign({}, rest), { id: _id.toHexString() }));
            });
        });
    }
}
exports.MongoGetMopnthlyReportRepository = MongoGetMopnthlyReportRepository;
