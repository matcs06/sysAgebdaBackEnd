import { Router } from 'express';

import { CreateTransactionController } from '../modules/transactions/controller/createTransaction/CreateTransactionController';

import { ListTransactionsController } from '../modules/transactions/controller/listTransaction/ListTransactionController';

import { DeleteTransactionsController } from '../modules/transactions/controller/deleteTransaction/DeleteTransactionController'

import {UpdateTransactionController} from "../modules/transactions/controller/updateTransaction/UpdateTransactionController"

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const transactionsRoutes = Router();

const createTransactionController = new CreateTransactionController()
const listTransactionController = new ListTransactionsController()
const deleteTransactionController  = new DeleteTransactionsController()
const updateTransactionController = new UpdateTransactionController()


transactionsRoutes.get('/', listTransactionController.handle);
transactionsRoutes.use(ensureAuthenticated)

transactionsRoutes.post('/', createTransactionController.handle);

transactionsRoutes.delete("/:id", deleteTransactionController.handle)

transactionsRoutes.patch("/", updateTransactionController.handle)

export { transactionsRoutes };
