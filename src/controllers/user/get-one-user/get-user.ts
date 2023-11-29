import { User } from "../../../models/user";
import { badRequest, notFound, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, Icontroller } from "../../protocols";
import { IGetUserRepository } from "./protocols";

export class GetOneUserController implements Icontroller {
    constructor(
        private readonly getUserRepository: IGetUserRepository
    ){}
    async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User | string>> {
       try{
            const id = httpRequest?.params?.id;

            if (!id) {
                return badRequest("Missing id");
            }
            const user = await this.getUserRepository.getUser(id);

            if(!user) {
                return notFound('User not found');
            }

            return ok<User>(user);

       } catch(error) {
        return serverError("31");
       }
    }
    
}