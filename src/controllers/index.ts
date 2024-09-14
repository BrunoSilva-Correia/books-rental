import { Router } from 'express';
import { BookController } from './book.controller';
import { UserController } from './user.controller';

export class Controller {
    useRoutes(): Router {
        const router = Router();

        router.get('/healthcheck', async (req, res) => res.sendStatus(200));

        const userRoutes = new UserController();
        router.use('/user/', userRoutes.useRoutes());
        const bookRoutes = new BookController();
        router.use('/book/', bookRoutes.useRoutes());

        return router;
    }
}
