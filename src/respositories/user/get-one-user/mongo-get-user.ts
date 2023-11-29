import { ObjectId } from "mongodb";
import { IGetUserRepository } from "../../../controllers/user/get-one-user/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";

export class MongoGetOneUserRepository implements IGetUserRepository {
    async getUser(userId: string): Promise<User | null> {
        const user = await MongoClient.db.collection<MongoUser>("users").findOne({
            _id: new ObjectId(userId)
        });

        if(!user) {
            return null;
        }

        const { _id, ...rest } = user;
        return {id: _id.toHexString(), ...rest};
    }

}