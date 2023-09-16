import { MongoGetUserRepository } from "./respositories/get-users/mongo-get-users";
import { GetUserController } from "./controllers/get-user/get-users";
import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";
import { MongoCreateUserReporitory } from "./respositories/create-user/mongo-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { MongoUpdateUserRepository } from "./respositories/update-user/mongo-update-user";
import { UpdateUserController } from "./controllers/update-user/update-user";

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

    const createUserController = new CreateUserController(
      mongoCreateUserRepository
    );

    const { body, statusCode } = await createUserController.handle({
      body: req.body
    });

    res.status(statusCode).send(body);
  });

  app.patch("/users/update/:id", async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();

    const updateUserController = new UpdateUserController(
      mongoUpdateUserRepository
    );

    const { body, statusCode } = await updateUserController.handle({
      body: req.body,
      params: req.params
    });

    res.status(statusCode).send(body);
  });

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log(`listening on port ${port}`));
};

main();
