import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';

interface RequestWithUser extends Request {
  user?: any;
}

export const authenticateJWT: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    (req as RequestWithUser).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};
