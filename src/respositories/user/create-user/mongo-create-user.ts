import {
  CreateUserParams,
  ICreateUserRepository
} from "../../../controllers/user/create-user/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { MongoUser } from "../../mongo-protocols";

export class MongoCreateUserReporitory implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("user not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}