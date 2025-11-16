const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Start seeding...');

    // Admin User
    const adminPassword = bcrypt.hashSync("admin123", 10);
    const adminUser = await prisma.user.upsert({
        where: { email: "admin@gmail.com" },
        update: {},
        create: {
            email: "admin@gmail.com",
            name: "Admin",
            role: "ADMIN",
            password: adminPassword,
        }
    });
    console.log('✅ Admin:', adminUser.email);

    // Customer User
    const customerPassword = bcrypt.hashSync("customer123", 10);
    const customerUser = await prisma.user.upsert({
        where: { email: "customer@gmail.com" },
        update: {},
        create: {
            email: "customer@gmail.com",
            name: "John Doe",
            role: "CUSTOMER",
            password: customerPassword,
        }
    });
    console.log('✅ Customer:', customerUser.email);

    console.log('🎉 Seeding finished!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('❌ Error:', e);
        await prisma.$disconnect();
        process.exit(1);
    });