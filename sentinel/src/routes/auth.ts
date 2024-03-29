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
    const authorizationCode = req.query.code;
    console.log('Authorization Code:', authorizationCode);
    res.redirect(`${process.env.REDIRECT_URL}/home`);
  },
  (err: Errback, req: Request, res: Response, next: NextFunction) => {
    // Error handler
    logger.error(`Google authentication error: ${err}`);
    
    res.redirect('/login');
  }
);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) { 
      logger.error('Error during logout:', err);
      return next(err); 
    }

    // Clear the session cookie
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          logger.error('Error destroying session:', err);
          return next(err);
        }
      });
    }
    logger.info('User logged out successfully');
    res.json({ message: 'Logged out successfully' });
  });
})

export default router;
