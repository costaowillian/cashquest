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
exports.MongoGetTotalTransferredSavingsRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../../database/mongo");
class MongoGetTotalTransferredSavingsRepository {
    getTotalTransferredSavings(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = mongo_1.MongoClient.db.collection("saving");
            const saving = yield collection.aggregate([
                {
                    $match: { _userId: new mongodb_1.ObjectId(userId), isTransferred: true }
                },
                {
                    $group: {
                        _id: new mongodb_1.ObjectId(userId),
                        total: { $sum: "$value" }
                    }
                }
            ]).toArray();
            if (saving === null || saving.length === 0) {
                return 0;
            }
            const { _id, total } = saving[0];
            return { userId: _id.toHexString(), total };
        });
    }
}
exports.MongoGetTotalTransferredSavingsRepository = MongoGetTotalTransferredSavingsRepository;
