import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Granting 50 credits to kazim huseynov...");

    // Attempt to grant to a user with a loosely matched name. Adjust query if needed.
    const user = await prisma.user.findFirst({
        where: {
            name: {
                contains: "kazim",
            }
        }
    });

    if (user) {
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { credits: 50 }
        });
        console.log(`Success! Updated ${updatedUser.name} (${updatedUser.email}) to 50 credits.`);
    } else {
        console.log("Could not find a user matching 'kazim'. Make sure the name matches or run query by exact email.");
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
