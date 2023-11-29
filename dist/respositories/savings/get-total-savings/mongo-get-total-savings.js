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
exports.MongoGetTotalSavingsRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../../database/mongo");
class MongoGetTotalSavingsRepository {
    getTotalSavings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const savingsCollection = mongo_1.MongoClient.db.collection("saving");
            const endDate = new Date().toString();
            const savings = yield savingsCollection
                .aggregate([
                {
                    $match: { _userId: new mongodb_1.ObjectId(userId),
                        createAt: {
                            $lte: endDate,
                        },
                        isTransferred: false,
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
            if (savings === null || savings.length === 0) {
                return 0;
            }
            const { _id, total } = savings[0];
            return { userId: _id.toHexString(), total };
        });
    }
}
exports.MongoGetTotalSavingsRepository = MongoGetTotalSavingsRepository;
