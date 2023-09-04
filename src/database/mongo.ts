import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const username = process.env.MONGODB_USERNAME;
    const password = process.env.MONGODB_PASSWORD;

    const url = `mongodb+srv://${username}:${password}@willian.woo9o7w.mongodb.net/?retryWrites=true&w=majority`;

    const client = new Mongo(url);
    const db = client.db("users-db");

    this.client = client;
    this.db = db;

    console.log("connected to mongodb!");
  }
};
