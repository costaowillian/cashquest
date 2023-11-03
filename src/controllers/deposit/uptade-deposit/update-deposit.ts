import { IDeposit } from "../../../models/deposit";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IUpdateDepositRepository, UpdateDepositParams } from "./protocols";
import { badRequest, ok, serverError } from '../../helpers';

export class UpdateDepositController implements Icontroller {
    constructor(private readonly updateDepositRepository: IUpdateDepositRepository){}
    
    async handle(httpRequest: HttpRequest<UpdateDepositParams>): Promise<HttpResponse<IDeposit | string>> {
        try {
            const id = httpRequest?.params?.id;
            const body = httpRequest?.body;

            if(!body) {
                return badRequest('Missing body');
            }

            if(!id) {
                return badRequest('Missing deposit id');
            }

            const AllowedToUpdate: (keyof UpdateDepositParams)[] = [
                'category',
                'description',
                'value',
                'attachment',
                'isFixed',
                'comments',
                'installments'
            ];

            const someFieldsNotAllowedToUpdate = Object.keys(body).some((key) => !AllowedToUpdate.includes(key as keyof UpdateDepositParams));

            if(someFieldsNotAllowedToUpdate) {
                return badRequest("Some received fields is not allowed");
            }

            const updatedbody =  {...body};
            const paramToRemove = "userId";
            delete updatedbody[paramToRemove];

            const deposit = await this.updateDepositRepository.update(id, updatedbody);

            return ok<IDeposit>(deposit);

        } catch (error) {
            return serverError("15");
        }
    }

}