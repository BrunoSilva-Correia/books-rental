import { PrismaClient } from '@prisma/client';

class Database extends PrismaClient {
    constructor() {
        super();
    }
}

export const database = new Database();
