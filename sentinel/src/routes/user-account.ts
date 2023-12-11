import { Request, Response, Router } from "express";
import { isAuthenticated } from "../middlewares/auth-middleware";
import { UserController } from "../controllers/UserControllers";

const router = Router();
const userController = new UserController();

router.post('/createCustomer',isAuthenticated, (req: Request, res: Response) => userController.createUserAccount(req, res))

export default router;