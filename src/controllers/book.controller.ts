import { Request, Router } from 'express';
import { validateInput } from './utils/validate-input';
import { BookDto } from '../app/services/dtos/book.dto';
import { BookService } from '../app/services/book.service';

export class BookController {
    useRoutes(): Router {
        const router = Router();
        const service = new BookService();

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

        router.post('/', async (req: Request<{}, {}, BookDto>, res) => {
            const body = req.body;

            const { errorMessage, isValid } = validateInput(body, [
                'title',
                'author',
                'image',
            ]);
            if (!isValid) {
                return res.status(400).json({ message: errorMessage });
            }

            const { status, data } = await service.create(body);
            return res.status(status).json(data);
        });

        router.put(
            '/:id',
            async (req: Request<{ id: string }, {}, BookDto>, res) => {
                const { id } = req.params;
                const body = req.body;

                if (!id) {
                    return { status: 400, data: {} };
                }

                const { errorMessage, isValid } = validateInput(body, [
                    'title',
                    'author',
                    'image',
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

        router.post(
            '/rent',
            async (
                req: Request<{}, {}, { idBook: string; idUser: string }>,
                res,
            ) => {
                const { idBook, idUser } = req.body;

                if (!idBook || !idUser) {
                    return res.status(400).json({
                        message: 'idBook and idUser are required',
                    });
                }

                const { status, data } = await service.rent(
                    Number(idBook),
                    Number(idUser),
                );
                return res.status(status).json(data);
            },
        );

        router.post(
            '/hand-back',
            async (
                req: Request<{}, {}, { idBook: string; idUser: string }>,
                res,
            ) => {
                const { idBook, idUser } = req.body;

                if (!idBook || !idUser) {
                    return res.status(404).json({
                        message: 'idBook and idUser are required',
                    });
                }

                const { status, data } = await service.handBack(
                    Number(idBook),
                    Number(idUser),
                );
                return res.status(status).json(data);
            },
        );

        return router;
    }
}
