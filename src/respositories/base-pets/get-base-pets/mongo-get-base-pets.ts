
import { MongoClient } from './../../../database/mongo';
import { IGetBasePetsRepository } from "../../../controllers/base-pets/get-base-pets/protocols";
import { IBasePet } from "../../../models/base-pet";
import { MongoBasePet } from '../../mongo-protocols';

export class MongoGetBasePetsREpository implements IGetBasePetsRepository {
    async getBasePets(): Promise<IBasePet[]> {
        const basePets = await MongoClient.db.collection<MongoBasePet>("base-pets").find({}).toArray();

        return basePets.map(({ _id, ...rest }) => ({
            ...rest,
            id: _id.toHexString()
        }));
    }
}