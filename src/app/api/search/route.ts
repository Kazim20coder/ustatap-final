import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const category = searchParams.get('category');

    if (!q && !category) {
        return NextResponse.json({ pros: [] });
    }

    // Use Prisma types explicitly or any
    const whereQuery: any = {};
    const conditions = [];

    if (q) {
        conditions.push({
            OR: [
                { name: { contains: q, mode: 'insensitive' } },
                { specialty: { contains: q, mode: 'insensitive' } }
            ]
        });
    }

    if (category) {
        conditions.push({
            specialty: { equals: category, mode: 'insensitive' }
        });
    }

    if (conditions.length > 0) {
        whereQuery.AND = conditions;
    }

    console.log("Axtarılan söz:", q, "| Kateqoriya:", category);

    try {
        const pros = await prisma.user.findMany({
            where: whereQuery,
            select: {
                id: true,
                name: true,
                specialty: true,
                rating: true,
                completedJobs: true,
            },
            take: 20
        });

        console.log("Tapılan ustalar:", pros);

        // Add mock image and location for display purposes
        const prosWithDisplayData = pros.map((pro, index) => ({
            ...pro,
            image: `https://i.pravatar.cc/150?u=${pro.id}`,
            location: "Bakı",
            reviews: pro.completedJobs || Math.floor(Math.random() * 50) + 5
        }));

        return NextResponse.json({ pros: prosWithDisplayData });
    } catch (error) {
        console.error("Search error:", error);
        return NextResponse.json({ error: "Xəta baş verdi" }, { status: 500 });
    }
}
