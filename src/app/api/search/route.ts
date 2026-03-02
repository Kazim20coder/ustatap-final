import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ pros: [] });
    }

    try {
        const pros = await prisma.user.findMany({
            where: {
                role: 'PRO',
                OR: [
                    { name: { contains: q, mode: 'insensitive' } },
                    { specialty: { contains: q, mode: 'insensitive' } }
                ]
            },
            select: {
                id: true,
                name: true,
                specialty: true,
                rating: true,
                completedJobs: true,
            },
            take: 20
        });

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
