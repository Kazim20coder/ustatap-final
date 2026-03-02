'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerPro } from '@/app/actions/auth';

export default function RegisterForm() {
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setIsPending(true);
        setError('');

        const result = await registerPro(formData);

        if (result.error) {
            setError(result.error);
            setIsPending(false);
        } else if (result.success) {
            router.push(result.redirectTo || '/');
            router.refresh();
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4 mt-6 text-left">
            {error && (
                <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm text-center">
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad və Soyad</label>
                <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    placeholder="Məs: Əli Əliyev"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-poçt</label>
                <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    placeholder="nümunə@email.az"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şifrə</label>
                <input
                    type="password"
                    name="password"
                    required
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    placeholder="Ən azı 6 simvol"
                    minLength={6}
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-all shadow-sm disabled:bg-gray-400 mt-4"
            >
                {isPending ? 'Qeydiyyatdan Keçilir...' : 'Usta Kimi Qeydiyyatdan Keç'}
            </button>
        </form>
    );
}
