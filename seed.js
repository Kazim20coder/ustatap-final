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

    // Helper function to get random high-quality placeholder images
    const getMockImages = (category) => [
        `https://source.unsplash.com/400x400/?${category},worker,1`,
        `https://source.unsplash.com/400x400/?${category},worker,2`,
        `https://source.unsplash.com/400x400/?${category},worker,3`,
        `https://source.unsplash.com/400x400/?${category},work,4`,
    ];

    const elchin = await prisma.user.create({
        data: {
            name: 'Elçin Qurbanov',
            email: 'elchin@ustatap.az',
            password: hashedPassword,
            role: 'PRO',
            specialty: 'Santexnik',
            experience: 12,
            completedJobs: 45,
            rating: 4.8,
            phone: '+994 50 123 45 67',
            bio: 'Salam, mən Elçin ustayam. 12 ildir santexnika sahəsində çalışıram. İsti və soyuq su xətlərinin çəkilməsi, kombi və radiatorların təmiri, sızıntıların tapılması üzrə ixtisaslaşmışam. Bütün işlərimə qarantiya verirəm.',
            portfolioImages: getMockImages('plumber'),
            reviews: {
                create: [
                    { rating: 5, comment: 'İşini çox səliqəli və vaxtında gördü. Təşəkkürlər!', customerName: 'Rüfət A.' },
                    { rating: 4, comment: 'Yaxşı ustadır, qiymətlər bir az bahadır, amma keyfiyyətə söz yoxdur.', customerName: 'Leyla M.' }
                ]
            }
        }
    });

    const aysel = await prisma.user.create({
        data: {
            name: 'Aysel Təmizlik',
            email: 'aysel@ustatap.az',
            password: hashedPassword,
            role: 'PRO',
            specialty: 'Təmizlikçi',
            experience: 5,
            completedJobs: 130,
            rating: 4.9,
            phone: '+994 55 987 65 43',
            bio: 'Evlərin, ofislərin, təmirdən çıxmış obyektlərin dərin təmizliyi. Komandamla birlikdə ən çətin ləkələri belə təmizləyirik. Öz təmizlik vasitələrimizlə gəlirik.',
            portfolioImages: getMockImages('cleaning'),
            reviews: {
                create: [
                    { rating: 5, comment: 'Ev par-par parıldayır, doğrudan da bu qədər gözləmirdim!', customerName: 'Sevinc H.' },
                    { rating: 5, comment: 'Pəncərələr və kafelər əla təmizlənmişdi. Çox sağ olun.', customerName: 'Fərid Q.' },
                    { rating: 5, comment: 'Vaxtında gəldilər və 2 saata hər yeri təmizlədilər.', customerName: 'Nigar K.' }
                ]
            }
        }
    });

    const cavid = await prisma.user.create({
        data: {
            name: 'Cavid Usta',
            email: 'cavid@ustatap.az',
            password: hashedPassword,
            role: 'PRO',
            specialty: 'Elektrik',
            experience: 8,
            completedJobs: 82,
            rating: 5.0,
            phone: '+994 70 333 22 11',
            bio: 'Elektrik xətlərinin sıfırdan çəkilməsi, qısaqapanmaların tapılıb təmiri və çilçıraqların quraşdırılması. Təhlükəsizlik qaydalarına 100% əməl edirəm.',
            portfolioImages: getMockImages('electrician'),
            reviews: {
                create: [
                    { rating: 5, comment: 'Bütün rozetkaları tez bir zamanda dəyişdi və sistemi yoxladı.', customerName: 'Tural E.' }
                ]
            }
        }
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
