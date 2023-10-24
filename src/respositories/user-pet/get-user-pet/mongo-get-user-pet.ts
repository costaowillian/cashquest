import { ObjectId } from "mongodb";
import { CretateUserpetParams } from "../../../controllers/user-pet/create-user-pet/protocols";
import { IGetUserPetRepository } from "../../../controllers/user-pet/get-user-pet/protocol";
import { MongoClient } from "../../../database/mongo";
import { MongoCretateUserpetParams } from "../../mongo-protocols";

export class MongoGetUserPetRepository implements IGetUserPetRepository {
    async getUserPet(userId: string): Promise<CretateUserpetParams> {
        const userPet = await MongoClient.db.collection<MongoCretateUserpetParams>("user-pet").findOne({ _userId: new ObjectId(userId) });

        if(!userPet) {
            throw new Error("Pet not exist");
        }

        const { _id, ...rest } = userPet;

        return { id: _id.toHexString(), ...rest}
    }

}