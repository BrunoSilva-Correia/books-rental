import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.books.createMany({
        data: [
            {
                title: 'To Kill a Mockingbird',
                author: 'Harper Lee',
                image: 'https://covers.openlibrary.org/b/id/12606504-L.jpg',
                is_rented: false,
            },
            {
                title: '1984',
                author: 'George Orwell',
                image: 'https://covers.openlibrary.org/b/id/14816996-L.jpg',
                is_rented: false,
            },
            {
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald',
                image: 'https://covers.openlibrary.org/b/id/10780935-L.jpg',
                is_rented: false,
            },
            {
                title: 'The Catcher in the Rye',
                author: 'J.D. Salinger',
                image: 'https://covers.openlibrary.org/b/id/14318932-L.jpg',
                is_rented: false,
            },
            {
                title: 'Pride and Prejudice',
                author: 'Jane Austen',
                image: 'https://covers.openlibrary.org/b/id/2468431-L.jpg',
                is_rented: false,
            },
            {
                title: 'The Hobbit',
                author: 'J.R.R. Tolkien',
                image: 'https://covers.openlibrary.org/b/id/14625674-L.jpg',
                is_rented: false,
            },
            {
                title: 'Brave New World',
                author: 'Aldous Huxley',
                image: 'https://covers.openlibrary.org/b/id/12645094-L.jpg',
                is_rented: false,
            },
            {
                title: 'Moby-Dick',
                author: 'Herman Melville',
                image: 'https://covers.openlibrary.org/b/id/12621992-L.jpg',
                is_rented: false,
            },
            {
                title: 'The Lord of the Rings: The Fellowship of the Ring',
                author: 'J.R.R. Tolkien',
                image: 'https://covers.openlibrary.org/w/id/8456479-L.jpg',
                is_rented: false,
            },
            {
                title: 'Jane Eyre',
                author: 'Charlotte Brontë',
                image: 'https://covers.openlibrary.org/b/id/11657937-L.jpg',
                is_rented: false,
            },
        ],
    });
    console.log('Database seeded with books');

    await prisma.users.create({
        data: {
            email: 'admin@admin.com',
            name: 'Admin',
            password:
                '$2a$10$atZbjPRnhU.Ca390nAHsbuQctZdQIp0iz9NVoHAsSZg6rmQt/4xtK',
            phone: '99999999999',
        },
    });
    console.log('Database seeded with admin user');
}

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
