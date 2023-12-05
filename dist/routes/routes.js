"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_delete_saving_1 = require("./../respositories/savings/delete-saving/mongo-delete-saving");
const mongo_create_saving_1 = require("./../respositories/savings/create-saving/mongo-create-saving");
const delete_deposit_1 = require("./../controllers/deposit/delete-deposit/delete-deposit");
const mongo_get_user_auth_1 = require("./../respositories/get-user-auth/mongo-get-user-auth");
const express_1 = __importDefault(require("express"));
const get_users_1 = require("../controllers/user/get-user/get-users");
const create_user_1 = require("../controllers/user/create-user/create-user");
const update_user_1 = require("../controllers/user/update-user/update-user");
const delete_user_1 = require("../controllers/user/delete-user/delete-user");
const mongo_get_users_1 = require("../respositories/user/get-users/mongo-get-users");
const mongo_create_user_1 = require("../respositories/user/create-user/mongo-create-user");
const mongo_update_user_1 = require("../respositories/user/update-user/mongo-update-user");
const mongo_delete_user_1 = require("../respositories/user/delete-user/mongo-delete-user");
const checkToken_1 = require("../middleware/checkToken");
const user_login_1 = require("../controllers/user-login/user-login");
const mongo_get_spendings_1 = require("../respositories/spendings/get-spendings/mongo-get-spendings");
const get_spendings_1 = require("../controllers/spendings/get-spendings/get-spendings");
const mongo_create_spending_1 = require("../respositories/spendings/create-spending/mongo-create-spending");
const create_spending_1 = require("../controllers/spendings/create-spending/create-spending");
const mongo_get_spending_1 = require("../respositories/spendings/get-spending/mongo-get-spending");
const get_spending_1 = require("../controllers/spendings/get-spending/get-spending");
const delete_spending_1 = require("../controllers/spendings/delete-spending/delete-spending");
const mongo_delete_spending_1 = require("../respositories/spendings/delete-spending/mongo-delete-spending");
const mongo_update_spending_1 = require("../respositories/spendings/update-spending/mongo-update-spending");
const update_spending_1 = require("../controllers/spendings/update-spending/update-spending");
const mongo_get_base_pets_1 = require("../respositories/base-pets/get-base-pets/mongo-get-base-pets");
const get_base_pets_1 = require("../controllers/base-pets/get-base-pets/get-base-pets");
const mongo_get_base_pet_1 = require("../respositories/base-pets/get-base-pet/mongo-get-base-pet");
const get_base_pet_1 = require("../controllers/base-pets/get-base-pet/get-base-pet");
const mongo_create_deposit_1 = require("../respositories/deposit/create-deposit/mongo-create-deposit");
const create_deposit_1 = require("../controllers/deposit/create-deposit/create-deposit");
const mongo_get_all_deposits_1 = require("../respositories/deposit/get-all-deposits/mongo-get-all-deposits");
const get_all_deposits_1 = require("../controllers/deposit/get-all-deposits/get-all-deposits");
const mongo_get_deposit_1 = require("../respositories/deposit/get-deposit/mongo-get-deposit");
const get_deposit_1 = require("../controllers/deposit/get-deposit/get-deposit");
const mongo_delete_deposit_1 = require("../respositories/deposit/delelete-deposit/mongo-delete-deposit");
const mongo_update_deposit_1 = require("../respositories/deposit/update-deposit/mongo-update-deposit");
const update_deposit_1 = require("../controllers/deposit/uptade-deposit/update-deposit");
const mongo_get_total_spendings_1 = require("../respositories/spendings/get-total-spending/mongo-get-total-spendings");
const get_wallet_1 = require("../controllers/wallet/get-wallet/get-wallet");
const mongo_get_total_deposits_1 = require("../respositories/deposit/get-total-deposits/mongo-get-total-deposits");
const mongo_get_total_spendings_month_1 = require("../respositories/spendings/get-total-spending/mongo-get-total-spendings-month");
const mongo_create_user_pet_1 = require("../respositories/user-pet/creat-user-pet/mongo-create-user-pet");
const mongo_get_sum_deposits_1 = require("../respositories/deposit/get-sum-deposits/mongo-get-sum-deposits");
const mong_get_sum_spending_1 = require("../respositories/spendings/get-sum-spendings/mong-get-sum-spending");
const create_user_pet_controller_1 = require("../controllers/user-pet/create-user-pet/create-user-pet-controller");
const mongo_get_user_pet_1 = require("../respositories/user-pet/get-user-pet/mongo-get-user-pet");
const get_user_pet_1 = require("../controllers/user-pet/get-user-pet/get-user-pet");
const create_saving_1 = require("../controllers/savings/create-savings/create-saving");
const mongo_get_saving_1 = require("../respositories/savings/get-saving/mongo-get-saving");
const get_saving_1 = require("../controllers/savings/get-saving/get-saving");
const mongo_get_all_savings_1 = require("../respositories/savings/get-all-savings/mongo-get-all-savings");
const get_all_savings_1 = require("../controllers/savings/get-all-savings/get-all-savings");
const delete_saving_1 = require("../controllers/savings/delete-saving/delete-saving");
const mongo_update_saving_1 = require("../respositories/savings/update-saving/mongo-update-saving");
const update_saving_1 = require("../controllers/savings/update-saving/update-saving");
const mongo_get_sum_savings_1 = require("../respositories/savings/get-sum-savings/mongo-get-sum-savings");
const mongo_get_total_savings_1 = require("../respositories/savings/get-total-savings/mongo-get-total-savings");
const mongo_get_spendings_graphic_1 = require("../respositories/graphics/get-spending-deposits-graphics/mongo-get-spendings-graphic");
const get_depoist_spending_graphics_1 = require("../controllers/graphics/get-deposits-spendings-graphics/get-depoist-spending-graphics");
const mongo_get_spending_graphics_1 = require("../respositories/graphics/get-spending-graphics/mongo-get-spending-graphics");
const get_spendingd_graphics_1 = require("../controllers/graphics/get-spendings-graphics/get-spendingd-graphics");
const mongo_get_transferred_savings_1 = require("../respositories/savings/get-total-transferred-savings/mongo-get-transferred-savings");
const mongo_get_monthly_report_1 = require("../respositories/reports/get-monthly-repot/mongo-get-monthly-report");
const get_monthly_report_1 = require("../controllers/reports/get-monthly-report/get-monthly-report");
const get_deposit_spending_report_1 = require("../controllers/reports/get-deposit-spending-report/get-deposit-spending-report");
const mongo_get_depoist_spending_report_1 = require("../respositories/reports/get-deposit-spending-report/mongo-get-depoist-spending-report");
const get_spending_report_1 = require("../controllers/reports/get-spendings-report/get-spending-report");
const mongo_get_total_transferred_spendings_1 = require("../respositories/spendings/get-total-spending/mongo-get-total-transferred-spendings");
const mongo_upload_photo_1 = require("../respositories/user/upload-photo/mongo-upload-photo");
const create_user_photo_1 = require("../controllers/user-photo/create-user-photo/create-user-photo");
const mongo_update_user_photo_1 = require("../respositories/user/update-user-photo/mongo-update-user-photo");
const update_user_photo_1 = require("../controllers/user-photo/update-user-photo/update-user-photo");
const mongo_get_user_photo_1 = require("../respositories/user/get-user-photo/mongo-get-user-photo");
const get_user_photo_1 = require("../controllers/user-photo/get-user-photo/get-user-photo");
const mongo_get_user_1 = require("../respositories/user/get-one-user/mongo-get-user");
const get_user_1 = require("../controllers/user/get-one-user/get-user");
const get_achievements_1 = require("../controllers/achievements/get-achievements");
const get_all_achievements_1 = require("../controllers/achievements/get-all-achievements.ts/get-all-achievements");
const router = express_1.default.Router();
router.get("/users", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetUserRepository = new mongo_get_users_1.MongoGetUserRepository();
    const getUserController = new get_users_1.GetUserController(mongoGetUserRepository);
    const { body, statusCode } = yield getUserController.handle();
    res.status(statusCode).send(body);
}));
router.get("/users/get-user/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetOneUserRepository = new mongo_get_user_1.MongoGetOneUserRepository();
    const getOneUserController = new get_user_1.GetOneUserController(mongoGetOneUserRepository);
    const { body, statusCode } = yield getOneUserController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.post("/auth/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetUserAuthRepository = new mongo_get_user_auth_1.MongoGetUserAuthRepository();
    const logiUserController = new user_login_1.LoginUserController(mongoGetUserAuthRepository);
    const { body, statusCode } = yield logiUserController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.post("/users/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetUserAuthRepository = new mongo_get_user_auth_1.MongoGetUserAuthRepository();
    const mongoCreateUserRepository = new mongo_create_user_1.MongoCreateUserReporitory();
    const createUserController = new create_user_1.CreateUserController(mongoCreateUserRepository, mongoGetUserAuthRepository);
    const { body, statusCode } = yield createUserController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.post("/users/upload-photo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadPhotoRepository = new mongo_upload_photo_1.MongoUploadPhotoRepository();
    const createUserPhotoController = new create_user_photo_1.CreateUserPhotoController(uploadPhotoRepository);
    const { body, statusCode } = yield createUserPhotoController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.get("/users/get-user-photo/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getUserPhotoRepository = new mongo_get_user_photo_1.MongoGetUserPhotoRepository();
    const getUserPhotoController = new get_user_photo_1.GetUserPhotoController(getUserPhotoRepository);
    const { body, statusCode } = yield getUserPhotoController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.patch("/users/update-photo", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const upaddateuserPhotoRepository = new mongo_update_user_photo_1.MongoUpdatePhotoRepository();
    const updateUserPhotoController = new update_user_photo_1.UpdateUserPhotoController(upaddateuserPhotoRepository);
    const { body, statusCode } = yield updateUserPhotoController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.patch("/users/update/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoUpdateUserRepository = new mongo_update_user_1.MongoUpdateUserRepository();
    const updateUserController = new update_user_1.UpdateUserController(mongoUpdateUserRepository);
    const { body, statusCode } = yield updateUserController.handle({
        body: req.body,
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.delete("/users/delete/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoDeleteUserRepository = new mongo_delete_user_1.MongoDeleteUserRepository();
    const deleteUserController = new delete_user_1.DeleteUserController(mongoDeleteUserRepository);
    const { body, statusCode } = yield deleteUserController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.get("/spendings/get-spendings/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetSpendingsRepository = new mongo_get_spendings_1.MongoGetSpendingsRepository();
    const getSpendingsController = new get_spendings_1.GetSpendingsController(mongoGetSpendingsRepository);
    const { body, statusCode } = yield getSpendingsController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.post("/spendings/create", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ router: req.body });
    const mongoCreateSpendingRepository = new mongo_create_spending_1.MongoCreateSpendingRepository();
    const createSpendingController = new create_spending_1.CreateSpendingController(mongoCreateSpendingRepository);
    const { body, statusCode } = yield createSpendingController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.get("/spendings/get-spending/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetSpendingRepository = new mongo_get_spending_1.MongoGetSpendingRepository();
    const getSpendingController = new get_spending_1.GetSpendingController(mongoGetSpendingRepository);
    const { body, statusCode } = yield getSpendingController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.delete("/spendings/delete/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoDeleteSpendingRepository = new mongo_delete_spending_1.MongoDeleteSpendingRepository();
    const deleteSpendingController = new delete_spending_1.DeleteSpendingController(mongoDeleteSpendingRepository);
    const { body, statusCode } = yield deleteSpendingController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.patch("/spendings/update/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoUpdateSpendingRepository = new mongo_update_spending_1.MongoUpdateSpendingRepository();
    const updateSpendingController = new update_spending_1.UpdateSpendingController(mongoUpdateSpendingRepository);
    const { body, statusCode } = yield updateSpendingController.handle({
        body: req.body,
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.get("/pets/get-all-base-pets", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetBasePetsRepository = new mongo_get_base_pets_1.MongoGetBasePetsRepository();
    const getBasePetsController = new get_base_pets_1.GetBasePetsController(mongoGetBasePetsRepository);
    const { body, statusCode } = yield getBasePetsController.handle();
    res.status(statusCode).send(body);
}));
router.get("/pets/get-base-pet/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetBasePetRepository = new mongo_get_base_pet_1.MongoGetBasePetRepository();
    const getBasePetController = new get_base_pet_1.GetBasePetController(mongoGetBasePetRepository);
    const { body, statusCode } = yield getBasePetController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.post("/deposit/create", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoCreateDepositRepository = new mongo_create_deposit_1.MongoCreateDepositRepository();
    const createDepositController = new create_deposit_1.CreateDepositController(mongoCreateDepositRepository);
    const { body, statusCode } = yield createDepositController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.get("/deposit/get-all-deposits/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetDepositsRepository = new mongo_get_all_deposits_1.MongoGetDepositsRepository();
    const getDepositsController = new get_all_deposits_1.GetDepositsContoller(mongoGetDepositsRepository);
    const { body, statusCode } = yield getDepositsController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.get("/deposit/get-deposit/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetDepositRepository = new mongo_get_deposit_1.MongoGetDepositRepository();
    const getDepositController = new get_deposit_1.GetDepositController(mongoGetDepositRepository);
    const { body, statusCode } = yield getDepositController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.delete("/deposit/delete/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoDeleteDepositRepository = new mongo_delete_deposit_1.MongoDeleteDepositRepository();
    const deleteDepositController = new delete_deposit_1.DeleteDepositController(mongoDeleteDepositRepository);
    const { body, statusCode } = yield deleteDepositController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.patch("/deposit/update/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateDepositRepository = new mongo_update_deposit_1.MongoUpdateDepositRepository();
    const updateDepositController = new update_deposit_1.UpdateDepositController(updateDepositRepository);
    const { body, statusCode } = yield updateDepositController.handle({
        params: req.params,
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.get("/wallet/get-wallet/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getTotalSpendingsRepository = new mongo_get_total_spendings_1.MongoGetTotalSpendindsRepository();
    const getTotalTranferredSpendings = new mongo_get_total_transferred_spendings_1.MongoGetTotalTransferredSpendindsRepository();
    const getTotalDepositsRepository = new mongo_get_total_deposits_1.MongoGetTotalDepositsRepository();
    const getTotalSavingsRepository = new mongo_get_total_savings_1.MongoGetTotalSavingsRepository();
    const getTotalMonthlySpendingdsRepository = new mongo_get_total_spendings_month_1.MongoGetTotalMonthlySpendindsRepository();
    const getTotalTransferredSavingsRepository = new mongo_get_transferred_savings_1.MongoGetTotalTransferredSavingsRepository();
    const getWalletController = new get_wallet_1.GetWalletController(getTotalSpendingsRepository, getTotalDepositsRepository, getTotalMonthlySpendingdsRepository, getTotalSavingsRepository, getTotalTransferredSavingsRepository, getTotalTranferredSpendings);
    const { body, statusCode } = yield getWalletController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.post("/user-pet/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getSumDepositsRepository = new mongo_get_sum_deposits_1.MongoGetSumDepositsRepository();
    const getSumSpendingRepository = new mong_get_sum_spending_1.MongoGetSumSpendingsRepository();
    const getTotalDepositsRepository = new mongo_get_total_deposits_1.MongoGetTotalDepositsRepository();
    const getTotalSpendingsRepository = new mongo_get_total_spendings_1.MongoGetTotalSpendindsRepository();
    const getBasePetsRepository = new mongo_get_base_pets_1.MongoGetBasePetsRepository();
    const getSumSavingsRepository = new mongo_get_sum_savings_1.MongoGetSumSavingsRepository();
    const createUserPetsRepository = new mongo_create_user_pet_1.MongoCreateUserPetRepository();
    const getUserPetController = new create_user_pet_controller_1.CreateUserPetController(getSumDepositsRepository, getSumSpendingRepository, getTotalDepositsRepository, getTotalSpendingsRepository, getSumSavingsRepository, getBasePetsRepository, createUserPetsRepository);
    const { body, statusCode } = yield getUserPetController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.get("/user-pet/get/:userId", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getSumDepositsRepository = new mongo_get_sum_deposits_1.MongoGetSumDepositsRepository();
    const getSumSpendingRepository = new mong_get_sum_spending_1.MongoGetSumSpendingsRepository();
    const getTotalDepositsRepository = new mongo_get_total_deposits_1.MongoGetTotalDepositsRepository();
    const getTotalSpendingsRepository = new mongo_get_total_spendings_1.MongoGetTotalSpendindsRepository();
    const getSumSavingsRepository = new mongo_get_sum_savings_1.MongoGetSumSavingsRepository();
    const getBasePetsRepository = new mongo_get_base_pets_1.MongoGetBasePetsRepository();
    const getUserPetRepository = new mongo_get_user_pet_1.MongoGetUserPetRepository();
    const getUserPetController = new get_user_pet_1.GetUserPetController(getSumDepositsRepository, getSumSpendingRepository, getTotalDepositsRepository, getTotalSpendingsRepository, getSumSavingsRepository, getBasePetsRepository, getUserPetRepository);
    const { body, statusCode } = yield getUserPetController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.post("/savings/create", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createSavingREspoitory = new mongo_create_saving_1.MongoCreateSavingRepository();
    const createSavingController = new create_saving_1.CreateSavingController(createSavingREspoitory);
    const { body, statusCode } = yield createSavingController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.get("/savings/get-saving/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getSavingRepository = new mongo_get_saving_1.MongGetSavingRepository();
    const getSavingController = new get_saving_1.GetSavingController(getSavingRepository);
    const { body, statusCode } = yield getSavingController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.get("/savings/get-all-savings/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getSavingsRepository = new mongo_get_all_savings_1.MongoGetSavingsRepository();
    const getSavingsController = new get_all_savings_1.GetSavingsController(getSavingsRepository);
    const { body, statusCode } = yield getSavingsController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.delete("/saving/delete/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteSavingRepository = new mongo_delete_saving_1.MongoDeleteSavingRepository();
    const deleteSavingController = new delete_saving_1.DeleteSavingController(deleteSavingRepository);
    const { body, statusCode } = yield deleteSavingController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.patch("/saving/update/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateSavingRepository = new mongo_update_saving_1.MongoUpdateSavingRepository();
    const updateSavingController = new update_saving_1.UpdateSavingController(updateSavingRepository);
    const { body, statusCode } = yield updateSavingController.handle({
        params: req.params,
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.post("/graphics/user-month-graphic", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getSpendingDepositGraphicRepository = new mongo_get_spendings_graphic_1.MongoGetSpendingDepositGraphicRepository();
    const getDepositSpendingGraphicController = new get_depoist_spending_graphics_1.GetDepositSpendingGraphicController(getSpendingDepositGraphicRepository);
    const { body, statusCode } = yield getDepositSpendingGraphicController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.post("/graphics/how-did-Spend-graphic", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getSpendingGraphicsRepository = new mongo_get_spending_graphics_1.MongoGetSpendingGraphicsRepository();
    const getSpendingGraphicsController = new get_spendingd_graphics_1.GetSpendigsGraphicsController(getSpendingGraphicsRepository);
    const { body, statusCode } = yield getSpendingGraphicsController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.post("/reports/get-monthly-report-home", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getMonthlyReportHomeRepository = new mongo_get_monthly_report_1.MongoGetMopnthlyReportRepository();
    const getMonthlyReportHomeController = new get_monthly_report_1.GetMonthlyReportController(getMonthlyReportHomeRepository);
    const { body, statusCode } = yield getMonthlyReportHomeController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.post("/reports/get-depoist-spending-report", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getReportHomeRepository = new mongo_get_depoist_spending_report_1.MongoGetReportRepository();
    const getReportHomeController = new get_deposit_spending_report_1.GetReportController(getReportHomeRepository);
    const { body, statusCode } = yield getReportHomeController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.post("/reports/get-spending-report", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getReportHomeRepository = new mongo_get_depoist_spending_report_1.MongoGetReportRepository();
    const getSpendingReportController = new get_spending_report_1.GetSpendingReportController(getReportHomeRepository);
    const { body, statusCode } = yield getSpendingReportController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.post("/reports/get-savings-report", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getReportHomeRepository = new mongo_get_depoist_spending_report_1.MongoGetReportRepository();
    const getSpendingReportController = new get_spending_report_1.GetSpendingReportController(getReportHomeRepository);
    const { body, statusCode } = yield getSpendingReportController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.post("/achievements/get-achievement", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getSumSpendingRepository = new mong_get_sum_spending_1.MongoGetSumSpendingsRepository();
    const getSumSavingsRepository = new mongo_get_sum_savings_1.MongoGetSumSavingsRepository();
    const getAchievementsController = new get_achievements_1.GetAchievementsController(getSumSpendingRepository, getSumSavingsRepository);
    const { body, statusCode } = yield getAchievementsController.handle({
        body: req.body
    });
    res.status(statusCode).send(body);
}));
router.get("/achievements/get-all-achievements/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getSumSpendingRepository = new mong_get_sum_spending_1.MongoGetSumSpendingsRepository();
    const getSumSavingsRepository = new mongo_get_sum_savings_1.MongoGetSumSavingsRepository();
    const getAllAchievementsController = new get_all_achievements_1.GetAllAchievementsController(getSumSpendingRepository, getSumSavingsRepository);
    const { body, statusCode } = yield getAllAchievementsController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
exports.default = router;
