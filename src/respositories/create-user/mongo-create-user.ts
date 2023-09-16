import {
  CreateUserParams,
  ICreateUserRepository
} from "../../controllers/create-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoCreateUserReporitory implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    //create user
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    //get the created user
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: insertedId });

    //if user is not created show an error
    if (!user) {
      throw new Error("user not created");
    }

    const { _id, ...rest } = user;

    //{ id: _id.toHexString(), ...rest } replace user id with default mongo db id
    return { id: _id.toHexString(), ...rest };
  }
}
