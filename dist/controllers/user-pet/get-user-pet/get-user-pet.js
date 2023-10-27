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
exports.GetUserPetController = void 0;
const helpers_1 = require("../../helpers");
const pet_services_1 = require("../servicves/pet-services");
class GetUserPetController {
    constructor(getSumDepositsRepository, getSumSpendingRepository, getTotalDepositsRepository, getTotalSpendingsRepository, getBasePetsRepository, getUserPetRepository) {
        this.getSumDepositsRepository = getSumDepositsRepository;
        this.getSumSpendingRepository = getSumSpendingRepository;
        this.getTotalDepositsRepository = getTotalDepositsRepository;
        this.getTotalSpendingsRepository = getTotalSpendingsRepository;
        this.getBasePetsRepository = getBasePetsRepository;
        this.getUserPetRepository = getUserPetRepository;
        this.petDetailsService = new pet_services_1.PetDetailsService(this.getSumDepositsRepository, this.getSumSpendingRepository, this.getTotalDepositsRepository, this.getTotalSpendingsRepository, this.getBasePetsRepository);
    }
    handle(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = (_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.params) === null || _a === void 0 ? void 0 : _a.userId;
                if (!id) {
                    return (0, helpers_1.badRequest)("Missing id");
                }
                const baseUerPet = yield this.getUserPetRepository.getUserPet(id);
                const health = yield this.petDetailsService.getHealth(id);
                const xps = yield this.petDetailsService.getXps(id);
                const basePet = yield this.petDetailsService.getLevel(id);
                const userPet = [{
                        name: baseUerPet.name,
                        id: baseUerPet.id,
                        pet: basePet,
                        userId: baseUerPet._userId,
                        xps: xps,
                        health: health,
                        createdAt: baseUerPet.createdAt
                    }];
                return (0, helpers_1.ok)(userPet);
            }
            catch (error) {
                console.log(error);
                return (0, helpers_1.serverError)("20");
            }
        });
    }
}
exports.GetUserPetController = GetUserPetController;
