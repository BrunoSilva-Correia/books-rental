import { Router } from 'express';
import { BookController } from './book.controller';
import { UserController } from './user.controller';
import { basicAuthMiddleware } from './middlewares/basic-auth.middleware';

export class Controller {
    useRoutes(): Router {
        const router = Router();

        router.get('/healthcheck', async (req, res) => res.sendStatus(200));

        router.get('/login', basicAuthMiddleware, async (req, res) => {
            const token = req.headers['token'];
            const userId = req.headers['user-id'];

            return res.status(200).json({
                token,
                userId: Number(userId),
            });
        });

        const userRoutes = new UserController();
        router.use('/user/', userRoutes.useRoutes());
        const bookRoutes = new BookController();
        router.use('/book/', bookRoutes.useRoutes());

        return router;
    }
}
