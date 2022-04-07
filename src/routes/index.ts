import { Router } from "express";

import { productsRoutes } from "./products.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes"
import {availabilitysRoutes} from "./availability.routes"
import { schedulesRoutes } from "./schedules.routes";
import {transactionsRoutes} from "./transaction.routes"

const router = Router()

router.use('/products', productsRoutes);
router.use("/users", usersRoutes );
router.use("/sessions", authenticateRoutes);
router.use("/availability", availabilitysRoutes);
router.use("/schedules", schedulesRoutes);
router.use("/transactions", transactionsRoutes)

export { router }