import { ISpending } from "../models/spending";
import { User } from "../models/user";

export type MongoUser = Omit<User, "id">;
export type MongoSpending = Omit<ISpending, "id" | "user">;
