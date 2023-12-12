import { NextFunction, Request, Response } from "express";
import logger from '../logger';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  logger.info(req.isAuthenticated());
  
  if (req.isAuthenticated()) {
    return next();
  }
  
  // If not authenticated, redirect to the login page or send an error
  res.status(401).send('Not Authenticated');// or res.status(401).send('Not Authenticated');
};
