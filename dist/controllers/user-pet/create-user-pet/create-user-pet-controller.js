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
exports.CreateUserPetController = void 0;
const helpers_1 = require("./../../helpers");
const mongodb_1 = require("mongodb");
const helpers_2 = require("../../helpers");
const pet_services_1 = require("../services/pet-services");
class CreateUserPetController {
    constructor(getSumDepositsRepository, getSumSpendingRepository, getTotalDepositsRepository, getTotalSpendingsRepository, getSumSavingsRepository, getBasePetsRepository, createUserPetRepository) {
        this.getSumDepositsRepository = getSumDepositsRepository;
        this.getSumSpendingRepository = getSumSpendingRepository;
        this.getTotalDepositsRepository = getTotalDepositsRepository;
        this.getTotalSpendingsRepository = getTotalSpendingsRepository;
        this.getSumSavingsRepository = getSumSavingsRepository;
        this.getBasePetsRepository = getBasePetsRepository;
        this.createUserPetRepository = createUserPetRepository;
        this.petDetailsService = new pet_services_1.PetDetailsService(this.getSumDepositsRepository, this.getSumSpendingRepository, this.getTotalDepositsRepository, this.getTotalSpendingsRepository, this.getSumSavingsRepository, this.getBasePetsRepository);
    }
    handle(httpRequest) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requiredFields = ["_userId", "name", "createdAt"];
                const id = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _a === void 0 ? void 0 : _a._userId;
                if (!id) {
                    return (0, helpers_2.badRequest)("Missing user id");
                }
                for (const field of requiredFields) {
                    if (!((_b = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body) === null || _b === void 0 ? void 0 : _b[field])) {
                        return (0, helpers_2.badRequest)(`Field ${field} is required`);
                    }
                }
                httpRequest.body._userId = new mongodb_1.ObjectId(httpRequest.body._userId);
                const createdPet = yield this.createUserPetRepository.createUserPet(httpRequest.body);
                const health = yield this.petDetailsService.getHealth(httpRequest.body._userId.toHexString());
                const xps = yield this.petDetailsService.getXps(httpRequest.body._userId.toHexString());
                const basePet = yield this.petDetailsService.getLevel(httpRequest.body._userId.toHexString());
                const userPet = [
                    {
                        name: createdPet.name,
                        id: createdPet.id,
                        pet: basePet,
                        userId: createdPet._userId,
                        xps: xps,
                        health: health,
                        createdAt: createdPet.createdAt
                    }
                ];
                return (0, helpers_1.created)(userPet);
            }
            catch (error) {
                console.log(error);
                return (0, helpers_2.serverError)("19");
            }
        });
    }
}
exports.CreateUserPetController = CreateUserPetController;
