import express, { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const message = `Route ${req.originalUrl} not found`;
  
  res.status(404).json({
    status: 'fail',
    message,
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
};
