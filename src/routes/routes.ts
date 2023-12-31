import { MongoDeleteSavingRepository } from "./../respositories/savings/delete-saving/mongo-delete-saving";
import { MongoCreateSavingRepository } from "./../respositories/savings/create-saving/mongo-create-saving";
import { DeleteDepositController } from "./../controllers/deposit/delete-deposit/delete-deposit";
import { MongoGetUserAuthRepository } from "./../respositories/get-user-auth/mongo-get-user-auth";
import express from "express";
import { GetUserController } from "../controllers/user/get-user/get-users";
import { CreateUserController } from "../controllers/user/create-user/create-user";
import { UpdateUserController } from "../controllers/user/update-user/update-user";
import { DeleteUserController } from "../controllers/user/delete-user/delete-user";
import { MongoGetUserRepository } from "../respositories/user/get-users/mongo-get-users";
import { MongoCreateUserReporitory } from "../respositories/user/create-user/mongo-create-user";
import { MongoUpdateUserRepository } from "../respositories/user/update-user/mongo-update-user";
import { MongoDeleteUserRepository } from "../respositories/user/delete-user/mongo-delete-user";
import { chectToken } from "../middleware/checkToken";
import { LoginUserController } from "../controllers/user-login/user-login";
import { MongoGetSpendingsRepository } from "../respositories/spendings/get-spendings/mongo-get-spendings";
import { GetSpendingsController } from "../controllers/spendings/get-spendings/get-spendings";
import { MongoCreateSpendingRepository } from "../respositories/spendings/create-spending/mongo-create-spending";
import { CreateSpendingController } from "../controllers/spendings/create-spending/create-spending";
import { MongoGetSpendingRepository } from "../respositories/spendings/get-spending/mongo-get-spending";
import { GetSpendingController } from "../controllers/spendings/get-spending/get-spending";
import { DeleteSpendingController } from "../controllers/spendings/delete-spending/delete-spending";
import { MongoDeleteSpendingRepository } from "../respositories/spendings/delete-spending/mongo-delete-spending";
import { MongoUpdateSpendingRepository } from "../respositories/spendings/update-spending/mongo-update-spending";
import { UpdateSpendingController } from "../controllers/spendings/update-spending/update-spending";
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
import { MongoGetTotalSpendindsRepository } from "../respositories/spendings/get-total-spending/mongo-get-total-spendings";
import { GetWalletController } from "../controllers/wallet/get-wallet/get-wallet";
import { MongoGetTotalDepositsRepository } from "../respositories/deposit/get-total-deposits/mongo-get-total-deposits";
import { MongoGetTotalMonthlySpendindsRepository } from "../respositories/spendings/get-total-spending/mongo-get-total-spendings-month";
import { MongoCreateUserPetRepository } from "../respositories/user-pet/creat-user-pet/mongo-create-user-pet";
import { MongoGetSumDepositsRepository } from "../respositories/deposit/get-sum-deposits/mongo-get-sum-deposits";
import { MongoGetSumSpendingsRepository } from "../respositories/spendings/get-sum-spendings/mong-get-sum-spending";
import { CreateUserPetController } from "../controllers/user-pet/create-user-pet/create-user-pet-controller";
import { MongoGetUserPetRepository } from "../respositories/user-pet/get-user-pet/mongo-get-user-pet";
import { GetUserPetController } from "../controllers/user-pet/get-user-pet/get-user-pet";
import { CreateSavingController } from "../controllers/savings/create-savings/create-saving";
import { MongGetSavingRepository } from "../respositories/savings/get-saving/mongo-get-saving";
import { GetSavingController } from "../controllers/savings/get-saving/get-saving";
import { MongoGetSavingsRepository } from "../respositories/savings/get-all-savings/mongo-get-all-savings";
import { GetSavingsController } from "../controllers/savings/get-all-savings/get-all-savings";
import { DeleteSavingController } from "../controllers/savings/delete-saving/delete-saving";
import { MongoUpdateSavingRepository } from "../respositories/savings/update-saving/mongo-update-saving";
import { UpdateSavingController } from "../controllers/savings/update-saving/update-saving";
import { MongoGetSumSavingsRepository } from "../respositories/savings/get-sum-savings/mongo-get-sum-savings";
import { MongoGetTotalSavingsRepository } from "../respositories/savings/get-total-savings/mongo-get-total-savings";
import { MongoGetSpendingDepositGraphicRepository } from "../respositories/graphics/get-spending-deposits-graphics/mongo-get-spendings-graphic";
import { GetDepositSpendingGraphicController } from "../controllers/graphics/get-deposits-spendings-graphics/get-depoist-spending-graphics";
import { MongoGetSpendingGraphicsRepository } from "../respositories/graphics/get-spending-graphics/mongo-get-spending-graphics";
import { GetSpendigsGraphicsController } from "../controllers/graphics/get-spendings-graphics/get-spendingd-graphics";
import { MongoGetTotalTransferredSavingsRepository } from "../respositories/savings/get-total-transferred-savings/mongo-get-transferred-savings";
import { MongoGetMopnthlyReportRepository } from "../respositories/reports/get-monthly-repot/mongo-get-monthly-report";
import { GetMonthlyReportController } from "../controllers/reports/get-monthly-report/get-monthly-report";
import { GetReportController } from "../controllers/reports/get-deposit-spending-report/get-deposit-spending-report";
import { MongoGetReportRepository } from "../respositories/reports/get-deposit-spending-report/mongo-get-depoist-spending-report";
import { GetSpendingReportController } from "../controllers/reports/get-spendings-report/get-spending-report";
import { MongoGetTotalTransferredSpendindsRepository } from "../respositories/spendings/get-total-spending/mongo-get-total-transferred-spendings";
import { MongoUploadPhotoRepository } from "../respositories/user/upload-photo/mongo-upload-photo";
import { CreateUserPhotoController } from "../controllers/user-photo/create-user-photo/create-user-photo";
import { MongoUpdatePhotoRepository } from "../respositories/user/update-user-photo/mongo-update-user-photo";
import { UpdateUserPhotoController } from "../controllers/user-photo/update-user-photo/update-user-photo";
import { MongoGetUserPhotoRepository } from "../respositories/user/get-user-photo/mongo-get-user-photo";
import { GetUserPhotoController } from "../controllers/user-photo/get-user-photo/get-user-photo";
import { MongoGetOneUserRepository } from "../respositories/user/get-one-user/mongo-get-user";
import { GetOneUserController } from "../controllers/user/get-one-user/get-user";
import { GetAchievementsController } from "../controllers/achievements/get-achievements";
import { GetAllAchievementsController } from "../controllers/achievements/get-all-achievements.ts/get-all-achievements";

const router = express.Router();

router.get("/users", chectToken, async (req, res) => {
  const mongoGetUserRepository = new MongoGetUserRepository();
  const getUserController = new GetUserController(mongoGetUserRepository);

  const { body, statusCode } = await getUserController.handle();
  res.status(statusCode).send(body);
});
router.get("/users/get-user/:id", chectToken, async (req, res) => {
  const mongoGetOneUserRepository = new MongoGetOneUserRepository();
  const getOneUserController = new GetOneUserController(
    mongoGetOneUserRepository
  );

  const { body, statusCode } = await getOneUserController.handle({
    params: req.params
  });
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

router.post("/users/create-user", async (req, res) => {
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

router.post("/users/upload-photo", async (req, res) => {
  const uploadPhotoRepository = new MongoUploadPhotoRepository();
  const createUserPhotoController = new CreateUserPhotoController(
    uploadPhotoRepository
  );
  const { body, statusCode } = await createUserPhotoController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.get("/users/get-user-photo/:id", chectToken, async (req, res) => {
  const getUserPhotoRepository = new MongoGetUserPhotoRepository();
  const getUserPhotoController = new GetUserPhotoController(
    getUserPhotoRepository
  );
  const { body, statusCode } = await getUserPhotoController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.patch("/users/update-photo", chectToken, async (req, res) => {
  const upaddateuserPhotoRepository = new MongoUpdatePhotoRepository();
  const updateUserPhotoController = new UpdateUserPhotoController(
    upaddateuserPhotoRepository
  );
  const { body, statusCode } = await updateUserPhotoController.handle({
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

router.patch("/deposit/update/:id", chectToken, async (req, res) => {
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
  const getTotalTranferredSpendings =
    new MongoGetTotalTransferredSpendindsRepository();
  const getTotalDepositsRepository = new MongoGetTotalDepositsRepository();
  const getTotalSavingsRepository = new MongoGetTotalSavingsRepository();
  const getTotalMonthlySpendingdsRepository =
    new MongoGetTotalMonthlySpendindsRepository();
  const getTotalTransferredSavingsRepository =
    new MongoGetTotalTransferredSavingsRepository();
  const getWalletController = new GetWalletController(
    getTotalSpendingsRepository,
    getTotalDepositsRepository,
    getTotalMonthlySpendingdsRepository,
    getTotalSavingsRepository,
    getTotalTransferredSavingsRepository,
    getTotalTranferredSpendings
  );
  const { body, statusCode } = await getWalletController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.post("/user-pet/create", async (req, res) => {
  const getSumDepositsRepository = new MongoGetSumDepositsRepository();
  const getSumSpendingRepository = new MongoGetSumSpendingsRepository();
  const getTotalDepositsRepository = new MongoGetTotalDepositsRepository();
  const getTotalSpendingsRepository = new MongoGetTotalSpendindsRepository();
  const getBasePetsRepository = new MongoGetBasePetsRepository();
  const getSumSavingsRepository = new MongoGetSumSavingsRepository();
  const createUserPetsRepository = new MongoCreateUserPetRepository();
  const getUserPetController = new CreateUserPetController(
    getSumDepositsRepository,
    getSumSpendingRepository,
    getTotalDepositsRepository,
    getTotalSpendingsRepository,
    getSumSavingsRepository,
    getBasePetsRepository,
    createUserPetsRepository
  );
  const { body, statusCode } = await getUserPetController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.get("/user-pet/get/:userId", chectToken, async (req, res) => {
  const getSumDepositsRepository = new MongoGetSumDepositsRepository();
  const getSumSpendingRepository = new MongoGetSumSpendingsRepository();
  const getTotalDepositsRepository = new MongoGetTotalDepositsRepository();
  const getTotalSpendingsRepository = new MongoGetTotalSpendindsRepository();
  const getSumSavingsRepository = new MongoGetSumSavingsRepository();
  const getBasePetsRepository = new MongoGetBasePetsRepository();
  const getUserPetRepository = new MongoGetUserPetRepository();
  const getUserPetController = new GetUserPetController(
    getSumDepositsRepository,
    getSumSpendingRepository,
    getTotalDepositsRepository,
    getTotalSpendingsRepository,
    getSumSavingsRepository,
    getBasePetsRepository,
    getUserPetRepository
  );
  const { body, statusCode } = await getUserPetController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.post("/savings/create", chectToken, async (req, res) => {
  const createSavingREspoitory = new MongoCreateSavingRepository();
  const createSavingController = new CreateSavingController(
    createSavingREspoitory
  );
  const { body, statusCode } = await createSavingController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.get("/savings/get-saving/:id", chectToken, async (req, res) => {
  const getSavingRepository = new MongGetSavingRepository();
  const getSavingController = new GetSavingController(getSavingRepository);
  const { body, statusCode } = await getSavingController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.get("/savings/get-all-savings/:id", chectToken, async (req, res) => {
  const getSavingsRepository = new MongoGetSavingsRepository();
  const getSavingsController = new GetSavingsController(getSavingsRepository);
  const { body, statusCode } = await getSavingsController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.delete("/saving/delete/:id", chectToken, async (req, res) => {
  const deleteSavingRepository = new MongoDeleteSavingRepository();
  const deleteSavingController = new DeleteSavingController(
    deleteSavingRepository
  );
  const { body, statusCode } = await deleteSavingController.handle({
    params: req.params
  });
  res.status(statusCode).send(body);
});

router.patch("/saving/update/:id", chectToken, async (req, res) => {
  const updateSavingRepository = new MongoUpdateSavingRepository();
  const updateSavingController = new UpdateSavingController(
    updateSavingRepository
  );
  const { body, statusCode } = await updateSavingController.handle({
    params: req.params,
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.post("/graphics/user-month-graphic", chectToken, async (req, res) => {
  const getSpendingDepositGraphicRepository =
    new MongoGetSpendingDepositGraphicRepository();
  const getDepositSpendingGraphicController =
    new GetDepositSpendingGraphicController(
      getSpendingDepositGraphicRepository
    );
  const { body, statusCode } = await getDepositSpendingGraphicController.handle(
    {
      body: req.body
    }
  );
  res.status(statusCode).send(body);
});

router.post("/graphics/how-did-Spend-graphic", chectToken, async (req, res) => {
  const getSpendingGraphicsRepository =
    new MongoGetSpendingGraphicsRepository();
  const getSpendingGraphicsController = new GetSpendigsGraphicsController(
    getSpendingGraphicsRepository
  );
  const { body, statusCode } = await getSpendingGraphicsController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.post(
  "/reports/get-monthly-report-home",
  chectToken,
  async (req, res) => {
    const getMonthlyReportHomeRepository =
      new MongoGetMopnthlyReportRepository();
    const getMonthlyReportHomeController = new GetMonthlyReportController(
      getMonthlyReportHomeRepository
    );
    const { body, statusCode } = await getMonthlyReportHomeController.handle({
      body: req.body
    });
    res.status(statusCode).send(body);
  }
);

router.post(
  "/reports/get-depoist-spending-report",
  chectToken,
  async (req, res) => {
    const getReportHomeRepository = new MongoGetReportRepository();
    const getReportHomeController = new GetReportController(
      getReportHomeRepository
    );
    const { body, statusCode } = await getReportHomeController.handle({
      body: req.body
    });
    res.status(statusCode).send(body);
  }
);

router.post("/reports/get-spending-report", chectToken, async (req, res) => {
  const getReportHomeRepository = new MongoGetReportRepository();
  const getSpendingReportController = new GetSpendingReportController(
    getReportHomeRepository
  );
  const { body, statusCode } = await getSpendingReportController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.post("/reports/get-savings-report", chectToken, async (req, res) => {
  const getReportHomeRepository = new MongoGetReportRepository();
  const getSpendingReportController = new GetSpendingReportController(
    getReportHomeRepository
  );
  const { body, statusCode } = await getSpendingReportController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.post("/achievements/get-achievement", chectToken, async (req, res) => {
  const getSumSpendingRepository = new MongoGetSumSpendingsRepository();
  const getSumSavingsRepository = new MongoGetSumSavingsRepository();
  const getAchievementsController = new GetAchievementsController(
    getSumSpendingRepository,
    getSumSavingsRepository
  );
  const { body, statusCode } = await getAchievementsController.handle({
    body: req.body
  });
  res.status(statusCode).send(body);
});

router.get(
  "/achievements/get-all-achievements/:id",
  chectToken,
  async (req, res) => {
    const getSumSpendingRepository = new MongoGetSumSpendingsRepository();
    const getSumSavingsRepository = new MongoGetSumSavingsRepository();
    const getAllAchievementsController = new GetAllAchievementsController(
      getSumSpendingRepository,
      getSumSavingsRepository
    );
    const { body, statusCode } = await getAllAchievementsController.handle({
      params: req.params
    });
    res.status(statusCode).send(body);
  }
);

export default router;
