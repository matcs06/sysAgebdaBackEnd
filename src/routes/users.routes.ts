import { Router } from 'express';

import { CreateUserController } from '../modules/users/controller/createUser/CreateUserController';

import { DeleteUserController } from '../modules/users/controller/deleteUser/DeleteUserController';

import { ListUserController } from '../modules/users/controller/listUser/ListUserController';

import {  ListAllUsersController} from '../modules/users/controller/listAllUsers/ListAllUsersController';

import { FindUserByNameController } from '../modules/users/controller/findUserByName/FindUserByNameController';

import { UpdateUserController } from '../modules/users/controller/updateUser/UpdateUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { checkUserLevel } from '../middlewares/checkUserLevel';

const usersRoutes = Router();

const createUserController = new CreateUserController()
const deleteUserController  = new DeleteUserController()
const listUserController = new ListUserController()
const listAllUserService = new ListAllUsersController()
const findUserByName = new FindUserByNameController()
const updateUser = new UpdateUserController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.get("/:username", findUserByName.handle)
usersRoutes.get("/:id", listUserController.handle)
usersRoutes.get("/", listAllUserService.handle)

usersRoutes.use(checkUserLevel)
usersRoutes.delete("/:id", deleteUserController.handle)
usersRoutes.patch("/", updateUser.handle)

export { usersRoutes };