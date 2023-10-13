"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_get_user_auth_1 = require("./../respositories/get-user-auth/mongo-get-user-auth");
const express_1 = __importDefault(require("express"));
const get_users_1 = require("../controllers/get-user/get-users");
const create_user_1 = require("../controllers/create-user/create-user");
const update_user_1 = require("../controllers/update-user/update-user");
const delete_user_1 = require("../controllers/delete-user/delete-user");
const mongo_get_users_1 = require("../respositories/get-users/mongo-get-users");
const mongo_create_user_1 = require("../respositories/create-user/mongo-create-user");
const mongo_update_user_1 = require("../respositories/update-user/mongo-update-user");
const mongo_delete_user_1 = require("../respositories/delete-user/mongo-delete-user");
const checkToken_1 = require("../middleware/checkToken");
const user_login_1 = require("../controllers/user-login/user-login");
const mongo_get_spending_1 = require("../respositories/get-spending/mongo-get-spending");
const get_spending_1 = require("../controllers/get-spending/get-spending");
const mongo_create_spending_1 = require("../respositories/create-spending/mongo-create-spending");
const create_spending_1 = require("../controllers/create-spending/create-spending");
const router = express_1.default.Router();
router.get("/users", checkToken_1.chectToken, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetUserRepository =
      new mongo_get_users_1.MongoGetUserRepository();
    const getUserController = new get_users_1.GetUserController(
      mongoGetUserRepository
    );
    const { body, statusCode } = yield getUserController.handle();
    res.status(statusCode).send(body);
  })
);
router.post("/auth/login", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const mongoGetUserAuthRepository =
      new mongo_get_user_auth_1.MongoGetUserAuthRepository();
    const logiUserController = new user_login_1.LoginUserController(
      mongoGetUserAuthRepository
    );
    const { body, statusCode } = yield logiUserController.handle({
      body: req.body
    });
    res.status(statusCode).send(body);
  })
);
router.post("/create-user", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const mongoGetUserAuthRepository =
      new mongo_get_user_auth_1.MongoGetUserAuthRepository();
    const mongoCreateUserRepository =
      new mongo_create_user_1.MongoCreateUserReporitory();
    const createUserController = new create_user_1.CreateUserController(
      mongoCreateUserRepository,
      mongoGetUserAuthRepository
    );
    const { body, statusCode } = yield createUserController.handle({
      body: req.body
    });
    res.status(statusCode).send(body);
  })
);
router.patch("/users/update/:id", checkToken_1.chectToken, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const mongoUpdateUserRepository =
      new mongo_update_user_1.MongoUpdateUserRepository();
    const updateUserController = new update_user_1.UpdateUserController(
      mongoUpdateUserRepository
    );
    const { body, statusCode } = yield updateUserController.handle({
      body: req.body,
      params: req.params
    });
    res.status(statusCode).send(body);
  })
);
router.delete("/users/delete/:id", checkToken_1.chectToken, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const mongoDeleteUserRepository =
      new mongo_delete_user_1.MongoDeleteUserRepository();
    const deleteUserController = new delete_user_1.DeleteUserController(
      mongoDeleteUserRepository
    );
    const { body, statusCode } = yield deleteUserController.handle({
      params: req.params
    });
    res.status(statusCode).send(body);
  })
);
router.get("/spending/:id", checkToken_1.chectToken, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const MongoGetSpendingsRepository =
      new mongo_get_spending_1.MongoGetSpendingsRepository();
    const getSpendingController = new get_spending_1.GetSpendingsController(
      MongoGetSpendingsRepository
    );
    const { body, statusCode } = yield getSpendingController.handle({
      params: req.params
    });
    res.status(statusCode).send(body);
  })
);
router.post("/spending/create", checkToken_1.chectToken, (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log({ router: req.body });
    const mongoCreateSpendingRepository =
      new mongo_create_spending_1.MongoCreateSpendingRepository();
    const createSpendingController =
      new create_spending_1.CreateSpendingController(
        mongoCreateSpendingRepository
      );
    const { body, statusCode } = yield createSpendingController.handle({
      body: req.body
    });
    res.status(statusCode).send(body);
  })
);
exports.default = router;
