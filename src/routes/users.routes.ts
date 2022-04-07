import { Router } from 'express';

import { CreateUserController } from '../modules/users/controller/createUser/CreateUserController';

import { DeleteUserController } from '../modules/users/controller/deleteUser/DeleteUserController';

import { ListUserController } from '../modules/users/controller/listUser/ListUserController';

import {  ListAllUsersController} from '../modules/users/controller/listAllUsers/ListAllUsersController';

import { FindUserByNameController } from '../modules/users/controller/findUserByName/FindUserByNameController';

const usersRoutes = Router();

const createUserController = new CreateUserController()
const deleteUserController  = new DeleteUserController()
const listUserController = new ListUserController()
const listAllUserService = new ListAllUsersController()
const findUserByName = new FindUserByNameController()

usersRoutes.post('/', createUserController.handle);

usersRoutes.get("/:username", findUserByName.handle)
usersRoutes.get("/:id", listUserController.handle)
usersRoutes.get("/", listAllUserService.handle)

usersRoutes.delete("/:id", deleteUserController.handle)


export { usersRoutes };