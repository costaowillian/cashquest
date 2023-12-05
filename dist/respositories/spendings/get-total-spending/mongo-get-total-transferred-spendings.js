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
exports.MongoGetTotalTransferredSpendindsRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../../database/mongo");
class MongoGetTotalTransferredSpendindsRepository {
    getTotalSpendings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const spendingsColection = mongo_1.MongoClient.db.collection("spending");
            const date = new Date();
            const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
            const endDate = `${date.getFullYear()}-${date.getMonth() + 1}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            const spendings = yield spendingsColection
                .aggregate([
                {
                    $match: {
                        _userId: new mongodb_1.ObjectId(userId),
                        createAt: {
                            $lte: endDate
                        },
                        isTransferred: true
                    }
                },
                {
                    $group: {
                        _id: new mongodb_1.ObjectId(userId),
                        total: { $sum: "$value" }
                    }
                }
            ])
                .toArray();
            if (spendings === null || spendings.length === 0) {
                return 0;
            }
            const { _id, total } = spendings[0];
            return { userId: _id.toHexString(), total };
        });
    }
}
exports.MongoGetTotalTransferredSpendindsRepository = MongoGetTotalTransferredSpendindsRepository;
