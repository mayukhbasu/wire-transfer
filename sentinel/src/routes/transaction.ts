import { Request, Response, Router } from "express";
import { isAuthenticated } from "../middlewares/auth-middleware";
import { UserController } from "../controllers/UserControllers";
import { TransactionController } from "../controllers/TransactionController";

const router = Router();
const transactionController = new TransactionController();
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/initiate-transaction',isAuthenticated, (req: Request, res: Response) => transactionController.startTransaction(req, res))


export default router;
