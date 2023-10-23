import { CretateUserpetParams, ICreateUserPetRepository } from "../../controllers/user-pet/create-user-pet/protocols";
import { MongoClient } from "../../database/mongo";
import { MongoCretateUserpetParams } from "../mongo-protocols";

export class MongoCreateUserPetRepository implements ICreateUserPetRepository {
    async createUserPet(params: CretateUserpetParams): Promise<CretateUserpetParams> {
        const { insertedId } = await MongoClient.db.collection("user-pet").insertOne(params);

        const userPet = await MongoClient.db.collection<MongoCretateUserpetParams>("user-pet").findOne({ _id: insertedId });

        if(!userPet) {
            throw new Error("Pet not created");
        }

        const { _id, ...rest} = userPet;
        return {id: _id.toHexString(), ...rest};
    }

}