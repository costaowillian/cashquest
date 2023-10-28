import { IBasePet } from "../../../models/base-pet";
import { IGetBasePetsRepository } from "../../base-pets/get-base-pets/protocols";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetTotalDepositsRepository, IGetTotalSavingsRepository, IGetTotalSpendingsRepository } from "../../wallet/get-wallet/protocols";
import { IGetSumDepositsRepository, IGetSumSavingsRepository, IGetSumSpendingsRepository } from "../create-user-pet/protocols";
import { PetDetailsService } from "../servicves/pet-services";
import { IPetDetailsService } from "../servicves/protocols";
import { IGetUserPetRepository } from "./protocol";

export class GetUserPetController implements Icontroller {
    
    private readonly petDetailsService: IPetDetailsService;
    constructor(
        private readonly getSumDepositsRepository: IGetSumDepositsRepository,
        private readonly getSumSpendingRepository: IGetSumSpendingsRepository,
        private readonly getTotalDepositsRepository: IGetTotalDepositsRepository,
        private readonly getTotalSpendingsRepository: IGetTotalSpendingsRepository,
        private readonly getSumSavingsRepository: IGetSumSavingsRepository,
        private readonly getBasePetsRepository: IGetBasePetsRepository,
        private readonly getUserPetRepository: IGetUserPetRepository
    ){
        this.petDetailsService = new PetDetailsService(this.getSumDepositsRepository, this.getSumSpendingRepository, this.getTotalDepositsRepository, this.getTotalSpendingsRepository, this.getSumSavingsRepository, this.getBasePetsRepository);
    }
    
    async handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown| string>> {
        try {
            const id = httpRequest?.params?.userId;

            if(!id){
                return badRequest("Missing id");
            }

            const baseUerPet = await this.getUserPetRepository.getUserPet(id);

            const health = await this.petDetailsService.getHealth(id);

            const xps = await this.petDetailsService.getXps(id);

            const basePet = await this.petDetailsService.getLevel(id);

            const userPet = [{
                name: baseUerPet.name,
                id: baseUerPet.id,
                pet: basePet,
                userId: baseUerPet._userId,
                xps: xps,
                health: health,
                createdAt: baseUerPet.createdAt
            }]

            return ok<IBasePet>(userPet);

        } catch (error) {
            console.log(error);
            return serverError("20");
        }
    }

}