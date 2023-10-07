import { IGetUsersAuthRepository } from "../../controllers/create-user/protocols";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";
import { MongoUser } from "../mongo-protocols";

export class MongoGetUserAuthRepository implements IGetUsersAuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ email: email });

    if(user) {
      const { _id, ...rest } = user;
      return { id: _id.toHexString(), ...rest };
    }
    
    return null;
  }
}
