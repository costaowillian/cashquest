import { IBasePet } from "../../../models/base-pet";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";

export class CreateUserPetController implements Icontroller {
    handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>> {
        throw new Error("Method not implemented.");
    }

    private getXps(): Promise<number> {

    }

    private getHealth(): Promise<boolean> {

    }

    private getLevel(): Promise<IBasePet> {
        
    }

}