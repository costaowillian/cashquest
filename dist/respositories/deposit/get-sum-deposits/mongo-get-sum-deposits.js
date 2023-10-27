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
exports.MongoGetSumDepositsRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_1 = require("../../../database/mongo");
class MongoGetSumDepositsRepository {
    getSumDeposits(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = mongo_1.MongoClient.db.collection("deposit");
            const result = yield collection.aggregate([
                {
                    $match: {
                        _userId: new mongodb_1.ObjectId(id)
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: 1
                        }
                    }
                }
            ]).toArray();
            if (result === null || result.length === 0) {
                return 0;
            }
            return result[0];
        });
    }
}
exports.MongoGetSumDepositsRepository = MongoGetSumDepositsRepository;
