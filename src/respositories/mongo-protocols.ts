import { IBasePet } from "../models/base-pet";
import { ISpending } from "../models/spending";
import { User } from "../models/user";

export type MongoUser = Omit<User, "id">;
export type MongoSpending = Omit<ISpending, "id">;
export type MongoBasePet = Omit<IBasePet, "id">;
