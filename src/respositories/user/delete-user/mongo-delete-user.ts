import { ObjectId } from "mongodb";
import { IDeleteUserRepository } from "../../../controllers/user/delete-user/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";
import { MongoUser } from "../../mongo-protocols";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(id: string): Promise<User> {
    console.log("veio na requisição do banco");
    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: new ObjectId(id) });
    console.log(user);
    if (!user) {
      throw new Error("User not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("Error: User not deleted");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
