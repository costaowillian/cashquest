import {
  MongoGetUserRepository
} from "./respositories/get-users/mongo-get-users";
import {
  GetUserController
} from "./controllers/get-user/get-users";
import express from "express";
import { config } from "dotenv";

config();

const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}`));

app.get("/users", async (req, res) => {
  const mongoGetUserRepository = new MongoGetUserRepository();
  const metUserController = new GetUserController(mongoGetUserRepository);

  const { body, statusCode } = await metUserController.handle();
  res.send(body).status(statusCode);
});
