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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllAchievementsController = void 0;
const spendings_achievements_json_1 = __importDefault(require("../../../data/achievements/spendings_achievements.json"));
const savings_achievements_json_1 = __importDefault(require("../../../data/achievements/savings_achievements.json"));
const os_1 = require("os");
const helpers_1 = require("../../helpers");
class GetAllAchievementsController {
    constructor(getSumSpendingRepository, getSumSavingsRepository) {
        this.getSumSpendingRepository = getSumSpendingRepository;
        this.getSumSavingsRepository = getSumSavingsRepository;
    }
    handle(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.params) === null || _a === void 0 ? void 0 : _a.id;
                if (!id || !os_1.type) {
                    return (0, helpers_1.badRequest)("missing fields");
                }
                const sumSpendings = yield this.getSumSpendingRepository.getSumSpendings(id);
                const sumSavings = yield this.getSumSavingsRepository.getSumSavings(id);
                const achievement = [];
                achievement.push(this.getAchievement(sumSpendings, savings_achievements_json_1.default));
                achievement.push(this.getAchievement(sumSavings, spendings_achievements_json_1.default));
                return (0, helpers_1.ok)(achievement);
            }
            catch (error) {
                return (0, helpers_1.serverError)("33");
            }
        });
    }
    getAchievement(total, achievementType) {
        const arrayAchievement = [];
        for (const achievementId in achievementType) {
            const achievements = achievementType[achievementId];
            for (const achievement of achievements) {
                if (achievement.condicao < total) {
                    const result = {
                        name: achievement.nome,
                        img: achievement.img
                    };
                    arrayAchievement.push(result);
                }
            }
        }
        return arrayAchievement;
    }
}
exports.GetAllAchievementsController = GetAllAchievementsController;
