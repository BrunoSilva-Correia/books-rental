import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.books.createMany({
        data: [
            {
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                image: 'https://example.com/to-kill-a-mockingbird.jpg',
                is_rented: false,
            },
            {
                title: '1984',
                author: 'George Orwell',
                image: 'https://example.com/1984.jpg',
                is_rented: false,
            },
            {
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                image: 'https://example.com/the-great-gatsby.jpg',
                is_rented: false,
            },
            {
                title: 'The Catcher in the Rye',
                author: 'J.D. Salinger',
                image: 'https://example.com/the-catcher-in-the-rye.jpg',
                is_rented: false,
            },
            {
                title: 'Pride and Prejudice',
                author: 'Jane Austen',
                image: 'https://example.com/pride-and-prejudice.jpg',
                is_rented: false,
            },
            {
                title: 'The Hobbit',
                author: 'J.R.R. Tolkien',
                image: 'https://example.com/the-hobbit.jpg',
                is_rented: false,
            },
            {
                title: 'Brave New World',
                author: 'Aldous Huxley',
                image: 'https://example.com/brave-new-world.jpg',
                is_rented: false,
            },
            {
                title: 'Moby-Dick',
                author: 'Herman Melville',
                image: 'https://example.com/moby-dick.jpg',
                is_rented: false,
            },
            {
                title: 'The Lord of the Rings: The Fellowship of the Ring',
                author: 'J.R.R. Tolkien',
                image: 'https://example.com/the-fellowship-of-the-ring.jpg',
                is_rented: false,
            },
            {
                title: 'Jane Eyre',
                author: 'Charlotte Brontë',
                image: 'https://example.com/jane-eyre.jpg',
                is_rented: false,
            },
        ],
    });

    console.log('Database seeded with books');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
