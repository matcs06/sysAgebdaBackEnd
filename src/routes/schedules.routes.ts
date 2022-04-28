import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateScheduleController } from '../modules/schedules/controller/createSchedule/CreateScheduleController';

import { ListScheduleController } from '../modules/schedules/controller/listSchedule/ListScheduleController';

import { DeleteScheduleController } from '../modules/schedules/controller/deleteSchedule/DeleteScheduleController';

import {UpdateScheduleController} from "../modules/schedules/controller/updateSchedule/UpdateScheduleController"

const schedulesRoutes = Router();

const createScheduleController = new CreateScheduleController()
const listScheduleController = new ListScheduleController()
const deleteScheduleController  = new DeleteScheduleController() 
const updateScheduleController = new UpdateScheduleController()

schedulesRoutes.post('/', createScheduleController.handle);
schedulesRoutes.get("/", listScheduleController.handle)

schedulesRoutes.use(ensureAuthenticated)

schedulesRoutes.delete("/:id", deleteScheduleController.handle) 
schedulesRoutes.patch("/", updateScheduleController.handle)

export { schedulesRoutes };