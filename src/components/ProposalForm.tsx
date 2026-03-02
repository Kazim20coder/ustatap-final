'use client';

import { useState } from 'react';
import { sendProposal } from '@/app/actions/proposals';
import { useRouter } from 'next/navigation';

export default function ProposalForm({ requestId }: { requestId: string }) {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setIsPending(true);
        const result = await sendProposal(formData);
        setIsPending(false);

        if (result.error) {
            alert(result.error);
        } else {
            router.refresh(); // Refresh the page to show updated status and credits
        }
    }

    return (
        <form action={handleSubmit} className="flex gap-3">
            <input type="hidden" name="requestId" value={requestId} />
            <div className="flex-1 relative">
                <input
                    type="number"
                    name="amount"
                    required
                    placeholder="Qiymət (AZN)"
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-gray-600">₼</span>
            </div>
            <button
                type="submit"
                disabled={isPending}
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-300 disabled:bg-gray-400 disabled:hover:translate-y-0"
            >
                {isPending ? 'Göndərilir...' : 'Təklif Göndər (1 kredit)'}
            </button>
        </form>
    );
}
