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
const router = express_1.default.Router();
router.get("/users", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetUserRepository = new mongo_get_users_1.MongoGetUserRepository();
    const getUserController = new get_users_1.GetUserController(mongoGetUserRepository);
    const { body, statusCode } = yield getUserController.handle();
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
router.post("users/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const mongoGetUserAuthRepository = new mongo_get_user_auth_1.MongoGetUserAuthRepository();
    const mongoCreateUserRepository = new mongo_create_user_1.MongoCreateUserReporitory();
    const createUserController = new create_user_1.CreateUserController(mongoCreateUserRepository, mongoGetUserAuthRepository);
    const { body, statusCode } = yield createUserController.handle({
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
router.patch("/deposti/update/:id", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const getTotalDepositsRepository = new mongo_get_total_deposits_1.MongoGetTotalDepositsRepository();
    const getTotalMonthlySpendingdsRepository = new mongo_get_total_spendings_month_1.MongoGetTotalMonthlySpendindsRepository();
    const getWalletController = new get_wallet_1.GetWalletController(getTotalSpendingsRepository, getTotalDepositsRepository, getTotalMonthlySpendingdsRepository);
    const { body, statusCode } = yield getWalletController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
router.post("/user-pet/create", checkToken_1.chectToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getSumDepositsRepository = new mongo_get_sum_deposits_1.MongoGetSumDepositsRepository();
    const getSumSpendingRepository = new mong_get_sum_spending_1.MongoGetSumSpendingsRepository();
    const getTotalDepositsRepository = new mongo_get_total_deposits_1.MongoGetTotalDepositsRepository();
    const getTotalSpendingsRepository = new mongo_get_total_spendings_1.MongoGetTotalSpendindsRepository();
    const getBasePetsRepository = new mongo_get_base_pets_1.MongoGetBasePetsRepository();
    const createUserPetsRepository = new mongo_create_user_pet_1.MongoCreateUserPetRepository();
    const getUserPetController = new create_user_pet_controller_1.CreateUserPetController(getSumDepositsRepository, getSumSpendingRepository, getTotalDepositsRepository, getTotalSpendingsRepository, getBasePetsRepository, createUserPetsRepository);
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
    const getBasePetsRepository = new mongo_get_base_pets_1.MongoGetBasePetsRepository();
    const getUserPetRepository = new mongo_get_user_pet_1.MongoGetUserPetRepository();
    const getUserPetController = new get_user_pet_1.GetUserPetController(getSumDepositsRepository, getSumSpendingRepository, getTotalDepositsRepository, getTotalSpendingsRepository, getBasePetsRepository, getUserPetRepository);
    const { body, statusCode } = yield getUserPetController.handle({
        params: req.params
    });
    res.status(statusCode).send(body);
}));
exports.default = router;
