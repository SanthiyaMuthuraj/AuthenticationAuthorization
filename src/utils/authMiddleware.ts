// utils/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';

// Extend the Request interface to include the 'user' property
interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract token from headers
    
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token:', token);
    if (!token) {
      res.status(401).json({ error: 'Authentication failed. Token not provided.' });
      return;
    }

    // Verify the token
    const decodedToken: any = jwt.verify(token, 'your-secret-key');
    console.log('Decoded Token:', decodedToken);

    // Attach user information to the request for later use
    const user = await User.findById(decodedToken.userId);
    console.log('User:', user);
    if (!user) {
      res.status(401).json({ error: 'Invalid token. User not found.' });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ error: 'Authentication failed. Invalid token.' });
  }
};

export const authorizeAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  // Check if the authenticated user is an admin
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Authorization failed. User is not an admin.' });
  }
};
