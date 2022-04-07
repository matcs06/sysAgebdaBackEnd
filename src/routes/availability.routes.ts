import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateAvailabilityController } from '../modules/availability/controller/createAvailability/CreateAvailabilityController';

import { ListAvailabilityController } from '../modules/availability/controller/listAvailability/ListAvailabilityController';

import { ListAvailabilityDetailsController } from '../modules/availability/controller/listAvailabilityDetails/listAvailabilityDetailsController';

import { DeleteAvailabilityController } from '../modules/availability/controller/deleteAvailability/DeleteAvailabilityController';

const availabilitysRoutes = Router();

const createAvailabilityController = new CreateAvailabilityController()
const listAvailabilityController = new ListAvailabilityController()
const deleteAvailabilityController  = new DeleteAvailabilityController()
const listAvailabilityDetailsController = new ListAvailabilityDetailsController()
availabilitysRoutes.get("/", listAvailabilityController.handle)
availabilitysRoutes.get("/details/:id", listAvailabilityDetailsController.handle)


availabilitysRoutes.use(ensureAuthenticated)

availabilitysRoutes.post('/', createAvailabilityController.handle);

availabilitysRoutes.delete("/:id", deleteAvailabilityController.handle)

export { availabilitysRoutes };