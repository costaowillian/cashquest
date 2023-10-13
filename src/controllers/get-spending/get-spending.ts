import { ISpending } from "../../models/spending";
import { HttpRequest, HttpResponse, Icontroller } from "../protocols";

export class GetSpedingController implements Icontroller {

    async handle(httpRequest: HttpRequest<ISpending | string>): Promise<HttpResponse<ISpending>> {
        throw new Error("Method not implemented.");
    }

}