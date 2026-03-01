import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function RecentRequests() {
    const sessionToken = await getSession();
    const isPro = sessionToken?.user?.role === 'PRO';

    let dbJobs: any[] = [];
    try {
        dbJobs = await prisma.serviceRequest.findMany({
            orderBy: { createdAt: 'desc' },
            take: 4 // Only show the 4 most recent requests
        });
    } catch (e) {
        console.error("Prisma error, likely db not initialized yet.", e);
    }

    if (dbJobs.length === 0) return null;

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="recent-requests">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                        Son Göndərilən <span className="text-secondary">Sorğular</span>
                    </h2>
                    <p className="text-xl text-foreground max-w-2xl mx-auto opacity-80">
                        Ustalarımız hər gün yüzlərlə müştəriyə kömək edir. İndi qoşulun və qazanmağa başlayın.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dbJobs.map((job: any) => (
                        <div key={job.id} className="bg-accent/30 rounded-2xl p-6 border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-white text-secondary text-xs font-bold px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                                    {job.status}
                                </span>
                                <span className="text-xs text-gray-500 font-medium">{job.city}</span>
                            </div>

                            <h3 className="font-bold text-lg text-primary mb-2 line-clamp-1">{job.service}</h3>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                                {job.budget === 'Sərbəst' ? 'Qiymət razılaşma yolu ilə' : `Büdcə: ${job.budget}`}
                            </p>

                            <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
                                <span className="text-xs text-gray-500">{new Date(job.createdAt).toLocaleDateString('az-AZ')}</span>
                                {isPro ? (
                                    <Link href="/dashboard" className="text-primary text-sm font-bold hover:underline">
                                        Təklif Göndər
                                    </Link>
                                ) : (
                                    <Link href="/usta-ol" className="text-primary text-sm font-bold hover:underline">
                                        Usta Ol
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {!isPro && (
                    <div className="mt-12 text-center">
                        <Link href="/usta-ol" className="inline-block bg-secondary text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0EA5E9] transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                            Usta Kimi Qeydiyyatdan Keç
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}
