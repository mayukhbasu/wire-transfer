import { Request, Response, Router } from "express";
import { isAuthenticated } from "../middlewares/auth-middleware";
import { UserController } from "../controllers/UserControllers";

const router = Router();
const userController = new UserController();

router.post('/createCustomer',isAuthenticated, (req: Request, res: Response) => userController.createUserAccount(req, res))
router.get('/createCustomer', isAuthenticated, (req: Request, res: Response) => userController.getUserAccounts(req, res));
router.post('/createAccount', isAuthenticated, (req: Request, res: Response) => userController.createOtherAccounts(req, res));

export default router;