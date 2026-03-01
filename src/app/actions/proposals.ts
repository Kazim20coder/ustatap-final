'use server';

import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function sendProposal(formData: FormData) {
    const session = await getSession();
    if (!session || session.user.role !== 'PRO') {
        return { error: 'İcazəniz yoxdur' };
    }

    const proId = session.user.id;
    const requestId = formData.get('requestId') as string;
    const amountStr = formData.get('amount') as string;
    const amount = parseFloat(amountStr);

    if (!requestId || isNaN(amount)) {
        return { error: 'Məlumatlar tam deyil' };
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: proId } });
        if (!user) return { error: 'İstifadəçi tapılmadı' };
        if (user.credits < 1) return { error: 'Kifayət qədər kreditiniz yoxdur' };

        // Check if already proposed
        const existing = await prisma.proposal.findUnique({
            where: {
                requestId_proId: {
                    requestId,
                    proId
                }
            }
        });

        if (existing) {
            return { error: 'Siz artıq bu işə təklif göndərmisiniz' };
        }

        // Create proposal and decrement credits in a transaction
        await prisma.$transaction([
            prisma.proposal.create({
                data: {
                    requestId,
                    proId,
                    amount
                }
            }),
            prisma.user.update({
                where: { id: proId },
                data: { credits: { decrement: 1 } }
            })
        ]);

        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error('Proposal error:', error);
        return { error: 'Xəta baş verdi. Yenidən cəhd edin.' };
    }
}
