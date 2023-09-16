import { MongoGetUserRepository } from "./respositories/get-users/mongo-get-users";
import { GetUserController } from "./controllers/get-user/get-users";
import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserReporitory } from "./respositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  await MongoClient.connect();

  app.get("/users", async (req, res) => {
    const mongoGetUserRepository = new MongoGetUserRepository();
    const getUserController = new GetUserController(mongoGetUserRepository);

    const { body, statusCode } = await getUserController.handle();
    res.status(statusCode).send(body);
  });

  app.post("/create-user", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserReporitory();
    console.log(req);

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
