import express from 'express';
import { GetUserController } from '../controllers/get-user/get-users';
import { CreateUserController } from '../controllers/create-user/create-user';
import { UpdateUserController } from '../controllers/update-user/update-user';
import { DeleteUserController } from '../controllers/delete-user/delete-user';
import { MongoGetUserRepository } from '../respositories/get-users/mongo-get-users';
import { MongoCreateUserReporitory } from '../respositories/create-user/mongo-create-user';
import { MongoUpdateUserRepository } from '../respositories/update-user/mongo-update-user';
import { MongoDeleteUserRepository } from '../respositories/delete-user/mongo-delete-user';
import { chectToken } from '../middleware/checkToken';

const router = express.Router();

router.get('/users', chectToken, async (req, res) => {
    const mongoGetUserRepository = new MongoGetUserRepository();
    const getUserController = new GetUserController(mongoGetUserRepository);

    const { body, statusCode } = await getUserController.handle();
    res.status(statusCode).send(body);
});

router.post('/create-user', async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserReporitory();
    const createUserController = new CreateUserController(mongoCreateUserRepository);
    const { body, statusCode } = await createUserController.handle({
        body: req.body,
    });
    res.status(statusCode).send(body);
});

router.patch('/users/update/:id', chectToken, async (req, res) => {
    const mongoUpdateUserRepository = new MongoUpdateUserRepository();
    const updateUserController = new UpdateUserController(mongoUpdateUserRepository);
    const { body, statusCode } = await updateUserController.handle({
        body: req.body,
        params: req.params,
    });
    res.status(statusCode).send(body);
});

router.delete('/users/delete/:id', chectToken, async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();
    const deleteUserController = new DeleteUserController(mongoDeleteUserRepository);
    const { body, statusCode } = await deleteUserController.handle({
        params: req.params,
    });
    res.status(statusCode).send(body);
});

export default router;
