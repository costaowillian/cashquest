import { DeleteDepositController } from "./../controllers/deposit/delete-deposit/delete-deposit";
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
import { MongoGetSpendingsRepository } from "../respositories/get-spendings/mongo-get-spendings";
import { GetSpendingsController } from "../controllers/get-spendings/get-spendings";
import { MongoCreateSpendingRepository } from "../respositories/create-spending/mongo-create-spending";
import { CreateSpendingController } from "../controllers/create-spending/create-spending";
import { MongoGetSpendingRepository } from "../respositories/get-spending/mongo-get-spending";
import { GetSpendingController } from "../controllers/get-spending/get-spending";
import { DeleteSpendingController } from "../controllers/delete-spending/delete-spending";
import { MongoDeleteSpendingRepository } from "../respositories/delete-spending/mongo-delete-spending";
import { MongoUpdateSpendingRepository } from "../respositories/update-spending/mongo-update-spending";
import { UpdateSpendingController } from "../controllers/update-spending/update-spending";
import { MongoGetBasePetsRepository } from "../respositories/base-pets/get-base-pets/mongo-get-base-pets";
import { GetBasePetsController } from "../controllers/base-pets/get-base-pets/get-base-pets";
import { MongoGetBasePetRepository } from "../respositories/base-pets/get-base-pet/mongo-get-base-pet";
import { GetBasePetController } from "../controllers/base-pets/get-base-pet/get-base-pet";
import { MongoCreateDepositRepository } from "../respositories/deposit/create-deposit/mongo-create-deposit";
import { CreateDepositController } from "../controllers/deposit/create-deposit/create-deposit";
import { MongoGetDepositsRepository } from "../respositories/deposit/get-all-deposits/mongo-get-all-deposits";
import { GetDepositsContoller } from "../controllers/deposit/get-all-deposits/get-all-deposits";
import { MongoGetDepositRepository } from "../respositories/deposit/get-deposit/mongo-get-deposit";
import { GetDepositController } from "../controllers/deposit/get-deposit/get-deposit";
import { MongoDeleteDepositRepository } from "../respositories/deposit/delelete-deposit/mongo-delete-deposit";
import { MongoUpdateDepositRepository } from "../respositories/deposit/update-deposit/mongo-update-deposit";
import { UpdateDepositController } from "../controllers/deposit/uptade-deposit/update-deposit";
import { MongoGetTotalSpendindsRepository } from "../respositories/wallet/get-wallet/mongo-get-total-spendings";
import { GetWalletController } from "../controllers/wallet/get-wallet/get-wallet";

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

router.post("users/create-user", async (req, res) => {
  console.log(req.body);
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

router.get("/spendings/get-spendings/:id", chectToken, async (req, res) => {
  const mongoGetSpendingsRepository = new MongoGetSpendingsRepository();
  const getSpendingsController = new GetSpendingsController(
    mongoGetSpendingsRepository
  );
  const { body, statusCode } = await getSpendingsController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.post("/spendings/create", chectToken, async (req, res) => {
  console.log({ router: req.body });
  const mongoCreateSpendingRepository = new MongoCreateSpendingRepository();
  const createSpendingController = new CreateSpendingController(
    mongoCreateSpendingRepository
  );
  const { body, statusCode } = await createSpendingController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.get("/spendings/get-spending/:id", chectToken, async (req, res) => {
  const mongoGetSpendingRepository = new MongoGetSpendingRepository();
  const getSpendingController = new GetSpendingController(
    mongoGetSpendingRepository
  );
  const { body, statusCode } = await getSpendingController.handle({
    params: req.params
  });

  res.status(statusCode).send(body);
});

router.delete("/spendings/delete/:id", chectToken, async (req, res) => {
  const mongoDeleteSpendingRepository = new MongoDeleteSpendingRepository();
  const deleteSpendingController = new DeleteSpendingController(
    mongoDeleteSpendingRepository
  );
  const { body, statusCode } = await deleteSpendingController.handle({
    params: req.params
  });

  res.status(statusCode).send(body);
});

router.patch("/spendings/update/:id", chectToken, async (req, res) => {
  const mongoUpdateSpendingRepository = new MongoUpdateSpendingRepository();
  const updateSpendingController = new UpdateSpendingController(
    mongoUpdateSpendingRepository
  );
  const { body, statusCode } = await updateSpendingController.handle({
    body: req.body,
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.get("/pets/get-all-base-pets", chectToken, async (req, res) => {
  const mongoGetBasePetsRepository = new MongoGetBasePetsRepository();
  const getBasePetsController = new GetBasePetsController(
    mongoGetBasePetsRepository
  );
  const { body, statusCode } = await getBasePetsController.handle();
  res.status(statusCode).send(body);
});

router.get("/pets/get-base-pet/:id", chectToken, async (req, res) => {
  const mongoGetBasePetRepository = new MongoGetBasePetRepository();
  const getBasePetController = new GetBasePetController(
    mongoGetBasePetRepository
  );
  const { body, statusCode } = await getBasePetController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.post("/deposit/create", chectToken, async (req, res) => {
  const mongoCreateDepositRepository = new MongoCreateDepositRepository();
  const createDepositController = new CreateDepositController(
    mongoCreateDepositRepository
  );
  const { body, statusCode } = await createDepositController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.get("/deposit/get-all-deposits/:id", chectToken, async (req, res) => {
  const mongoGetDepositsRepository = new MongoGetDepositsRepository();
  const getDepositsController = new GetDepositsContoller(
    mongoGetDepositsRepository
  );
  const { body, statusCode } = await getDepositsController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.get("/deposit/get-deposit/:id", chectToken, async (req, res) => {
  const mongoGetDepositRepository = new MongoGetDepositRepository();
  const getDepositController = new GetDepositController(
    mongoGetDepositRepository
  );
  const { body, statusCode } = await getDepositController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.delete("/deposit/delete/:id", chectToken, async (req, res) => {
  const mongoDeleteDepositRepository = new MongoDeleteDepositRepository();
  const deleteDepositController = new DeleteDepositController(
    mongoDeleteDepositRepository
  );
  const { body, statusCode } = await deleteDepositController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.patch("/deposti/update/:id", chectToken, async (req, res) => {
  const updateDepositRepository = new MongoUpdateDepositRepository();
  const updateDepositController = new UpdateDepositController(
    updateDepositRepository
  );
  const { body, statusCode } = await updateDepositController.handle({
    params: req.params,
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.get("/wallet/get-wallet/:id", chectToken, async (req, res) => {
  const getTotalSpendingsRepository = new MongoGetTotalSpendindsRepository();
  const getWalletController = new GetWalletController(
    getTotalSpendingsRepository
  );
  const { body, statusCode } = await getWalletController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

export default router;
