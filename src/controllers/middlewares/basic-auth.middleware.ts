import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../app/services/user.service';
import { UserDto } from '../../app/services/dtos/user.dto';

// Initialize UserService
const userService = new UserService();

export const basicAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res
            .status(401)
            .json({ message: 'Authorization header missing' });
    }

    const [scheme, credentials] = authHeader.split(' ');

    if (scheme !== 'Basic' || !credentials) {
        return res
            .status(401)
            .json({ message: 'Invalid authorization scheme' });
    }

    const [username, password] = Buffer.from(credentials, 'base64')
        .toString()
        .split(':');

    if (!username || !password) {
        return res.status(401).json({ message: 'Invalid credentials format' });
    }

    try {
        const result = await userService.login(username, password);
        if (result.status === 200) {
            const userData = result.data as UserDto;

            req.headers['token'] = credentials;
            req.headers['user-id'] = String(userData.id);
            return next();
        } else {
            return res
                .status(401)
                .json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
