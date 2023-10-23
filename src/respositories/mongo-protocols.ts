import { type } from "os";
import { IBasePet } from "../models/base-pet";
import { IDeposit } from "../models/deposit";
import { ISpending } from "../models/spending";
import { User } from "../models/user";
import { IWallet } from "../models/wallet";
import { CretateUserpetParams } from "../controllers/user-pet/create-user-pet/protocols";

export type MongoUser = Omit<User, "id">;
export type MongoSpending = Omit<ISpending, "id">;
export type MongoBasePet = Omit<IBasePet, "id">;
export type MongoDeposit = Omit<IDeposit, "id">;
export type MongoWallet = Omit<IWallet, "id">;
export type MongoCretateUserpetParams = Omit<CretateUserpetParams, "id">