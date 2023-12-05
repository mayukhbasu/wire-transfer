import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth-middleware';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/test', isAuthenticated, (req, res) => {
  res.send('Protected route!');
});

export default router;
