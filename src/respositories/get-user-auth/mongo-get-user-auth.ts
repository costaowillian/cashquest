import { IGetUsersAuthRepository } from "../../controllers/create-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { MongoUser } from "../mongo-protocols";

export class MongoGetUserAuthRepository implements IGetUsersAuthRepository {
  async getUsers(email: string): Promise<User[]> {
    const users = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ email: email });

    return users ? [{ ...users, id: users._id.toHexString() }] : [];
  }
}
