import { IUserPet } from './../../../models/user-pet';
import { created } from './../../helpers';
import { ObjectId } from "mongodb";
import { IGetBasePetsRepository } from "../../base-pets/get-base-pets/protocols";
import { badRequest, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetTotalDepositsRepository, IGetTotalSavingsRepository, IGetTotalSpendingsRepository } from "../../wallet/get-wallet/protocols";
import { CretateUserpetParams, ICreateUserPetRepository, IGetSumDepositsRepository, IGetSumSavingsRepository, IGetSumSpendingsRepository } from "./protocols";
import { IPetDetailsService } from '../servicves/protocols';
import { PetDetailsService } from '../servicves/pet-services';

export class CreateUserPetController implements Icontroller {

    private readonly petDetailsService: IPetDetailsService;
    constructor(
        private readonly getSumDepositsRepository: IGetSumDepositsRepository,
        private readonly getSumSpendingRepository: IGetSumSpendingsRepository,
        private readonly getTotalDepositsRepository: IGetTotalDepositsRepository,
        private readonly getTotalSpendingsRepository: IGetTotalSpendingsRepository,
        private readonly getSumSavingsRepository: IGetSumSavingsRepository,
        private readonly getBasePetsRepository: IGetBasePetsRepository,
        private readonly createUserPetRepository: ICreateUserPetRepository
    ){
        this.petDetailsService = new PetDetailsService(this.getSumDepositsRepository, this.getSumSpendingRepository, this.getTotalDepositsRepository, this.getTotalSpendingsRepository, this.getSumSavingsRepository, this.getBasePetsRepository);
    }

    async handle(httpRequest: HttpRequest<CretateUserpetParams>): Promise<HttpResponse<IUserPet | string>> {
        try {
            const requiredFields = ["_userId", "name", "createdAt"];

            const id = httpRequest?.body?._userId;

            if(!id){
                return badRequest("Missing user id");
            }

            for(const field of requiredFields) {               
                if (!httpRequest?.body?.[field as keyof CretateUserpetParams]) {
                    return badRequest(`Field ${field} is required`);
                }
            }

            httpRequest.body!._userId = new ObjectId(httpRequest.body!._userId);

            const createdPet = await this.createUserPetRepository.createUserPet(httpRequest.body!);

            const health = await this.petDetailsService.getHealth(httpRequest.body!._userId.toHexString());

            const xps = await this.petDetailsService.getXps(httpRequest.body!._userId.toHexString());

            const basePet = await this.petDetailsService.getLevel(httpRequest.body!._userId.toHexString());

            const userPet = [{
                name: createdPet.name,
                id: createdPet.id,
                pet: basePet,
                userId: createdPet._userId,
                xps: xps,
                health: health,
                createdAt: createdPet.createdAt
            }]

            return created<IUserPet>(userPet);

        } catch (error) {
            console.log(error);
            return serverError("19");
        }
    }
}