import { ObjectId } from "mongodb";
import { ISpending } from "../../models/spending";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../protocols";
import { CreateSpendingParams, ICreateSpendingRepository } from "./protocols";

export class CreateSpendingController implements Icontroller {

    constructor(
        private readonly createSpendingRepository: ICreateSpendingRepository,
      ) {}
    async handle(httpRequest: HttpRequest<CreateSpendingParams>): Promise<HttpResponse<ISpending | string>> {
        try {

            console.log({controller: httpRequest.body});
            const requiredFields = ["_userId", "category", "value", "createAt"];

            for(const field of requiredFields) {
                const fieldValue = httpRequest.body?.[field as keyof CreateSpendingParams];

                if(typeof fieldValue === 'string' && !fieldValue.length){
                    return badRequest(`Field ${field} is required`);
                }
            }
            httpRequest.body!._userId = new ObjectId(httpRequest.body!._userId);

            const spending = await this.createSpendingRepository.createSpending(
                httpRequest.body!,
            );

            return created<ISpending>(spending);

        } catch (error) {
            console.log(error);
            return serverError("07");
        }
    }
}