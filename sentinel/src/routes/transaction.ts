import { Request, Response, Router } from "express";
import { isAuthenticated } from "../middlewares/auth-middleware";
import { TransactionController } from "../controllers/TransactionController";

const router = Router();
const transactionController = new TransactionController();


router.post('/initiate-transaction',isAuthenticated, (req: Request, res: Response) => transactionController.startTransaction(req, res))
router.get('/getAllTransactions',isAuthenticated, (req: Request, res: Response) => transactionController.getAllTransaction(req, res))


export default router;
