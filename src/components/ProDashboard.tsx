/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import ProposalForm from './ProposalForm';

export const dynamic = 'force-dynamic';

export default async function ProDashboard() {
    const sessionToken = await getSession();
    const isPro = sessionToken?.user?.role === 'PRO';
    const proId = sessionToken?.user?.id;

    if (!isPro) {
        return (
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/50" id="pro-dashboard">
                <div className="max-w-3xl mx-auto text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-primary mb-4">Usta Paneli</h2>
                    <p className="text-foreground mb-8 text-lg">
                        Bu paneli görmək və müştəri sorğularına təklif göndərmək üçün usta kimi qeydiyyatdan keçməlisiniz.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/usta-ol" className="bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0EA5E9] transition-all">
                            Qeydiyyatdan Keç
                        </Link>
                        <Link href="/giris" className="bg-white border-2 border-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-primary hover:text-white transition-all">
                            Daxil Ol
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    let dbJobs: any[] = [];
    let credits = 12;

    try {
        const user = await prisma.user.findUnique({ where: { id: proId } });
        if (user) credits = user.credits;

        dbJobs = await prisma.serviceRequest.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                proposals: {
                    where: { proId: proId }
                }
            }
        });
    } catch (e) {
        console.error("Prisma error, likely db not initialized yet.", e);
    }

    const staticJobs = [
        {
            id: "REQ-0012",
            realId: "",
            service: "Ev Təmizliyi",
            details: "4 otaq, 120m² boş ev təmizliyi.",
            location: "Bakı, Nəsimi r-nu",
            date: "05 Mart, 10:00",
            customer: "A*** M.",
            phone: "+994 50 ... .. ..",
            status: "Yeni",
            budget: "Sərbəst",
            isProposed: false
        },
        {
            id: "REQ-0045",
            realId: "",
            service: "Santexnik",
            details: "Hamam otağında boru sızması var, təcili təmir.",
            location: "Bakı, Yasamal",
            date: "Təcili (Bu gün)",
            customer: "E*** Q.",
            phone: "+994 50 123 45 67",
            status: "Qəbul edilib",
            budget: "Yoxlama lazımdır",
            isProposed: true
        }
    ];

    // Combine DB jobs with static jobs. Map DB jobs to match the UI format.
    const mappedDbJobs = dbJobs.map((job: any) => {
        const isProposed = job.proposals && job.proposals.length > 0;
        return {
            id: `REQ-${job.id.substring(0, 4).toUpperCase()}`,
            realId: job.id,
            service: job.service,
            details: `${job.area ? job.area + 'm² sahə. ' : ''}Ünvan: ${job.address}`,
            location: job.city,
            date: `${job.date} (${job.timeSlot})`,
            customer: job.customer,
            phone: job.phone,
            status: isProposed ? "Təklif Göndərildi" : job.status,
            budget: job.budget,
            isProposed: isProposed
        };
    });

    const jobs = [...mappedDbJobs, ...staticJobs];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent/50 min-h-screen" id="pro-dashboard">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Xoş gəldiniz, {sessionToken?.user?.name}</h2>
                        <p className="text-gray-600">
                            Hal-hazırda aktiv müştəri sorğusu yoxdur.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex gap-4">
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm font-medium border border-gray-100 flex items-center">
                            <span className="text-secondary font-bold mr-2 text-xl">{credits}</span>
                            <span>Kredit qaldı</span>
                        </div>
                        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition">
                            Kredit Al
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {jobs.map((job, index) => (
                        <div key={job.id + index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
                            <div>
                                {job.status === "Yeni" && (
                                    <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        YENİ İŞ
                                    </div>
                                )}
                                {(job.status === "Qəbul edilib" || job.status === "Təklif Göndərildi") && (
                                    <div className="absolute top-0 right-0 bg-primary/10 text-primary border border-primary/20 text-xs font-bold px-3 py-1 rounded-bl-lg">
                                        {job.status.toUpperCase()}
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-xl text-primary">{job.service}</h3>
                                        <p className="text-sm text-gray-600 font-medium">{job.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-700">Tarix</p>
                                        <p className="text-sm text-secondary font-medium">{job.date}</p>
                                    </div>
                                </div>

                                <p className="text-foreground bg-accent p-3 rounded-lg mb-4 text-sm font-medium border border-gray-100">
                                    {job.details}
                                </p>

                                <div className="grid grid-cols-2 gap-y-3 mb-6">
                                    <div>
                                        <p className="text-xs text-gray-600 font-medium">Məkan</p>
                                        <p className="text-sm font-semibold text-gray-800">{job.location}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 font-medium">Büdcə / Təklif</p>
                                        <p className="text-sm font-semibold text-gray-800">{job.budget}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 font-medium">Müştəri</p>
                                        <p className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            {job.customer}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-gray-600 font-medium">Əlaqə nömrəsi</p>
                                        <p className={`text-sm font-semibold mt-1 flex items-center gap-1 ${(job.status === 'Qəbul edilib' || job.isProposed) ? 'text-primary' : 'text-gray-500 blur-[4px] select-none hover:blur-none transition-all'}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                            {job.phone}
                                        </p>
                                        {job.status === "Yeni" && !job.isProposed && (
                                            <p className="text-[11px] text-orange-500 font-medium mt-1 inline-block bg-orange-50 px-2 py-0.5 rounded">Təklif göndərildikdə görünəcək</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto">
                                {job.status === "Yeni" && job.realId ? (
                                    <ProposalForm requestId={job.realId} />
                                ) : job.status === "Yeni" && !job.realId ? (
                                    <div className="flex gap-3">
                                        <div className="flex-1 relative">
                                            <input disabled type="number" placeholder="Demo (AZN)" className="w-full border border-gray-200 rounded-lg p-3 cursor-not-allowed bg-gray-50" />
                                        </div>
                                        <button disabled className="flex-1 bg-secondary/50 text-white px-4 py-3 rounded-lg font-bold cursor-not-allowed">
                                            Demo İşi
                                        </button>
                                    </div>
                                ) : job.status === "Təklif Göndərildi" ? (
                                    <a href={`tel:${job.phone.replace(/[^+\d]/g, '')}`} className="w-full bg-green-400 text-gray-900 border border-green-500 px-4 py-3 rounded-xl font-extrabold flex items-center justify-center gap-2 cursor-pointer transition hover:bg-green-500 block text-center shadow-md text-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Müştəriyə Zəng Et
                                    </a>
                                ) : (
                                    <button className="w-full bg-gray-200 text-gray-900 border border-gray-300 px-4 py-3 rounded-xl font-extrabold hover:bg-gray-300 transition shadow-md flex items-center justify-center gap-2 text-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        Müştəriyə Zəng Et
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
