import { Errback, NextFunction, Request, Response, Router } from 'express';
import passport from '../passport-setup'; // Adjust the import path as necessary
import logger from '../logger'; // import the Winston logger

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res, next) => {
  logger.info('Redirecting to Google for authentication');
  next(); // proceed to the next middleware (passport.authenticate in this case)
});

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req: Request, res: Response) => {
    // Successful authentication, redirect home.
    logger.info('Google authentication successful, redirecting to home');
    res.redirect('/');
  },
  (err: Errback, req: Request, res: Response, next: NextFunction) => {
    // Error handler
    logger.error(`Google authentication error: ${err}`);
    res.redirect('/login');
  }
);

export default router;
