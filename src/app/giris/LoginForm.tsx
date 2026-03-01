'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/actions/auth';

export default function LoginForm() {
    const [error, setError] = useState('');
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setIsPending(true);
        setError('');

        const result = await loginUser(formData);

        if (result.error) {
            setError(result.error);
            setIsPending(false);
        } else if (result.success) {
            router.push(result.redirectTo || '/');
            router.refresh();
        }
    }

    return (
        <form action={handleSubmit} className="space-y-5">
            {error && (
                <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm text-center">
                    {error}
                </div>
            )}

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
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:bg-gray-400 mt-4"
            >
                {isPending ? 'Daxil olunur...' : 'Daxil Ol'}
            </button>
        </form>
    );
}
