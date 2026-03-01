'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createServiceRequest(data: {
    service: string;
    area: number | null;
    city: string;
    address: string;
    date: string;
    timeSlot: string;
}) {
    try {
        const request = await prisma.serviceRequest.create({
            data: {
                service: data.service,
                area: data.area,
                city: data.city,
                address: data.address,
                date: data.date,
                timeSlot: data.timeSlot,
                status: 'Yeni',
                budget: 'Sərbəst',
                customer: 'Anonim Müştəri',
                phone: 'Gözləyir...',
            },
        });

        // Revalidate dashboard to show new content
        revalidatePath('/');

        return { success: true, request };
    } catch (error) {
        console.error('Failed to create service request', error);
        return { success: false, error: 'Failed to create service request' };
    }
}
