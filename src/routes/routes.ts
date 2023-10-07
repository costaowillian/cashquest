import { created } from './../controllers/helpers';
import { MongoGetUserAuthRepository } from "./../respositories/get-user-auth/mongo-get-user-auth";
import express from "express";
import { GetUserController } from "../controllers/get-user/get-users";
import { CreateUserController } from "../controllers/create-user/create-user";
import { UpdateUserController } from "../controllers/update-user/update-user";
import { DeleteUserController } from "../controllers/delete-user/delete-user";
import { MongoGetUserRepository } from "../respositories/get-users/mongo-get-users";
import { MongoCreateUserReporitory } from "../respositories/create-user/mongo-create-user";
import { MongoUpdateUserRepository } from "../respositories/update-user/mongo-update-user";
import { MongoDeleteUserRepository } from "../respositories/delete-user/mongo-delete-user";
import { chectToken } from "../middleware/checkToken";
import { LoginUserController } from "../controllers/user-login/user-login";
import { MongoGetSpendingRepository } from "../respositories/get-spending/mongo-get-spending";
import { GetSpendingsController } from "../controllers/get-spending/get-spending";
import { MongoCreateSpendingRepository } from "../respositories/create-spending/mongo-create-spending";
import { CreateSpendingController } from '../controllers/create-spending/create-spending';

const router = express.Router();

router.get("/users", chectToken, async (req, res) => {
  const mongoGetUserRepository = new MongoGetUserRepository();
  const getUserController = new GetUserController(mongoGetUserRepository);

  const { body, statusCode } = await getUserController.handle();
  res.status(statusCode).send(body);
});

router.post("/auth/login", async (req, res) => {
  const mongoGetUserAuthRepository = new MongoGetUserAuthRepository();
  const logiUserController = new LoginUserController(
    mongoGetUserAuthRepository
  );
  const { body, statusCode } = await logiUserController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.post("/create-user", async (req, res) => {
  console.log(req.body)
  const mongoGetUserAuthRepository = new MongoGetUserAuthRepository();
  const mongoCreateUserRepository = new MongoCreateUserReporitory();
  const createUserController = new CreateUserController(
    mongoCreateUserRepository,
    mongoGetUserAuthRepository
  );
  const { body, statusCode } = await createUserController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.patch("/users/update/:id", chectToken, async (req, res) => {
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

router.delete("/users/delete/:id", chectToken, async (req, res) => {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();
  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository
  );
  const { body, statusCode } = await deleteUserController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.get("/spending/:id", chectToken,async (req, res) => {
  const mongoGetSpendingRepository = new MongoGetSpendingRepository();
  const getSpendingController = new GetSpendingsController(mongoGetSpendingRepository);
  const{ body, statusCode } = await getSpendingController.handle({params: req.params});
  res.status(statusCode).send(body);
})

router.post("/spending/create", chectToken, async (req, res) => {

  console.log({router: req.body});
  const mongoCreateSpendingRepository = new MongoCreateSpendingRepository();
  const createSpendingController = new CreateSpendingController(mongoCreateSpendingRepository);
  const{ body, statusCode } = await createSpendingController.handle({body: req.body});
  res.status(statusCode).send(body);
})

export default router;