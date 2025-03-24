import { Router } from "express";
import { AuthenticateUserController } from "../modules/users/controller/authenticateUser/AuthenticateUserController";
import { AuthenticateGoogleUserController } from "../modules/users/controller/authenticateUserGoogle/AuthenticateUserGoogleController";
const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const authenticateUserGoogleController = new AuthenticateGoogleUserController();

authenticateRoutes.post("/", authenticateUserController.handle);
authenticateRoutes.post("/google", authenticateUserGoogleController.handle);

export { authenticateRoutes };