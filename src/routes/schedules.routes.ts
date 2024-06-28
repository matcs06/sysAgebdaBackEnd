import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateScheduleController } from '../modules/schedules/controller/createSchedule/CreateScheduleController';

import { ListScheduleController } from '../modules/schedules/controller/listSchedule/ListScheduleController';

import { DeleteScheduleController } from '../modules/schedules/controller/deleteSchedule/DeleteScheduleController';

import { UpdateScheduleController } from "../modules/schedules/controller/updateSchedule/UpdateScheduleController"

import { ListScheduleByMonthAndYearController } from '../modules/schedules/controller/listSchedulesByMonthAndYear/ListScheduleByMonthAndYearController';

const schedulesRoutes = Router();

const createScheduleController = new CreateScheduleController()
const listScheduleController = new ListScheduleController()
const deleteScheduleController = new DeleteScheduleController()
const updateScheduleController = new UpdateScheduleController()
const listSchedulesByMonthAndYear = new ListScheduleByMonthAndYearController()

schedulesRoutes.post('/', createScheduleController.handle);
schedulesRoutes.get("/bymonthandyear", listSchedulesByMonthAndYear.handle)
schedulesRoutes.get("/", listScheduleController.handle)

schedulesRoutes.use(ensureAuthenticated)
schedulesRoutes.delete("/:id", deleteScheduleController.handle)
schedulesRoutes.patch("/", updateScheduleController.handle)

export { schedulesRoutes };