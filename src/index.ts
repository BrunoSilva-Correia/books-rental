import express from 'express';
import cors from 'cors';
import { Controller } from './controllers';

const app = express();
const port = 3000;

const controller = new Controller();

app.use(cors());
app.use(express.json());
app.use(controller.useRoutes());
app.listen(port, () => {
    console.log(`Server running at port: ${port}`);
});
