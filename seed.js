const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    console.log("Cleaning up old users and their proposals...");
    const pros = await prisma.user.findMany({
        where: { role: 'PRO' },
        select: { id: true }
    });
    const proIds = pros.map(p => p.id);

    await prisma.proposal.deleteMany({
        where: { proId: { in: proIds } }
    });

    // The user requested to clean old test data that doesn't have a category
    await prisma.user.deleteMany({
        where: {
            role: 'PRO'
        }
    });

    console.log("Seeding new professionals...");
    const hashedPassword = await bcrypt.hash('password123', 10);

    await prisma.user.createMany({
        data: [
            {
                name: 'Elçin Qurbanov',
                email: 'elchin@ustatap.az',
                password: hashedPassword,
                role: 'PRO',
                specialty: 'Santexnik',
                experience: 12,
                completedJobs: 45,
                rating: 4.8,
            },
            {
                name: 'Aysel Təmizlik',
                email: 'aysel@ustatap.az',
                password: hashedPassword,
                role: 'PRO',
                specialty: 'Təmizlikçi',
                experience: 5,
                completedJobs: 130,
                rating: 4.9,
            },
            {
                name: 'Cavid Usta',
                email: 'cavid@ustatap.az',
                password: hashedPassword,
                role: 'PRO',
                specialty: 'Elektrik',
                experience: 8,
                completedJobs: 82,
                rating: 5.0,
            }
        ]
    });
    console.log("Seeding complete!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
