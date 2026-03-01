'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { setSession, clearSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function registerPro(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
        return { error: 'Bütün xanaları doldurun' };
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { error: 'Bu e-poçt artıq qeydiyyatdan keçib' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'PRO',
            },
        });

        await setSession({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        revalidatePath('/');
        return { success: true, redirectTo: '/dashboard' };
    } catch (error) {
        console.error('Registration error:', error);
        return { error: 'Qeydiyyat zamanı xəta baş verdi' };
    }
}

export async function loginUser(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'E-poçt və şifrə daxil edin' };
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return { error: 'İstifadəçi tapılmadı və ya şifrə yanlışdır' };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { error: 'İstifadəçi tapılmadı və ya şifrə yanlışdır' };
        }

        await setSession({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        revalidatePath('/');
        return { success: true, redirectTo: user.role === 'PRO' ? '/dashboard' : '/' };
    } catch (error) {
        console.error('Login error:', error);
        return { error: 'Daxil olarkən xəta baş verdi' };
    }
}

export async function logoutUser() {
    await clearSession();
    revalidatePath('/');
    redirect('/');
}
