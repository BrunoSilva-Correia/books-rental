import { Request, Router } from 'express';
import { validateInput } from './utils/validate-input';
import { UserDto } from '../app/services/dtos/user.dto';
import { UserService } from '../app/services/user.service';

export class UserController {
    useRoutes(): Router {
        const router = Router();
        const service = new UserService();

        router.get('/', async (req, res) => {
            const { status, data } = await service.get();
            return res.status(status).json(data);
        });
        router.get('/:id', async (req: Request<{ id: string }>, res) => {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({});
            }

            const { status, data } = await service.getById(Number(id));
            return res.status(status).json(data);
        });
        router.post('/', async (req: Request<{}, {}, UserDto>, res) => {
            const body = req.body;

            const { errorMessage, isValid } = validateInput(body, [
                'email',
                'name',
                'phone',
                'password',
            ]);
            if (!isValid) {
                return res.status(400).json({ message: errorMessage });
            }

            const { status, data } = await service.create(body);
            return res.status(status).json(data);
        });

        router.put(
            '/:id',
            async (req: Request<{ id: string }, {}, UserDto>, res) => {
                const { id } = req.params;
                const body = req.body;

                if (!id) {
                    return { status: 400, data: {} };
                }

                const { errorMessage, isValid } = validateInput(body, [
                    'email',
                    'name',
                    'phone',
                    'password',
                ]);
                if (!isValid) {
                    return res.status(400).json({ message: errorMessage });
                }

                const { status, data } = await service.update(Number(id), body);
                return res.status(status).json(data);
            },
        );
        router.delete('/:id', async (req: Request<{ id: string }>, res) => {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({});
            }

            const { status, data } = await service.delete(Number(id));
            return res.status(status).json(data);
        });

        return router;
    }
}
