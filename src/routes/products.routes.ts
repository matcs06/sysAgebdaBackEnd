import { Router } from 'express';

import { CreateProductController } from '../modules/product/controller/createProduct/CreateProductController';

import { ListProductController } from '../modules/product/controller/listProduct/ListProductController';

import { DeleteProductController } from '../modules/product/controller/deleteProduc/DeleteProductController';

import { ListSingleProductController } from '../modules/product/controller/listSingleProduct/ListSingleProductController';

import { UpdateProductController } from '../modules/product/controller/updateProduct/UpdateProductController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const productsRoutes = Router();

const createProductController = new CreateProductController()
const listProductController = new ListProductController
const deleteProductController  = new DeleteProductController()
const listSingleProductController  = new ListSingleProductController()
const updateProductController = new UpdateProductController()

productsRoutes.get('/', listProductController.handle);

productsRoutes.get("/:id", listSingleProductController.handle)

productsRoutes.use(ensureAuthenticated)

productsRoutes.post('/', createProductController.handle);

productsRoutes.delete("/:id", deleteProductController.handle)

productsRoutes.patch("/:id", updateProductController.handle)

export { productsRoutes };
