/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
    const sessionToken = await getSession();

    if (!sessionToken || sessionToken.user.role !== 'PRO') {
        redirect('/giris');
    }

    const proId = sessionToken.user.id;
    let pro: any = null;

    try {
        pro = await prisma.user.findUnique({
            where: { id: proId },
            include: {
                proposals: {
                    include: {
                        request: true
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
    } catch (e) {
        console.error("Error loading profile", e);
    }

    if (!pro) {
        return <div>Profil tapılmadı.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Header Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary text-4xl font-bold flex-shrink-0">
                            {pro.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{pro.name}</h1>
                            <p className="text-secondary font-medium mb-4">{pro.specialty || 'İxtisas qeyd olunmayıb'}</p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium">
                                <div className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-2">
                                    <span className="text-yellow-500 text-lg">★</span>
                                    {pro.rating > 0 ? pro.rating.toFixed(1) : 'Yeni Usta'}
                                </div>
                                <div className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700">
                                    <span className="font-bold text-gray-900">{pro.completedJobs}</span> Tamamlanmış iş
                                </div>
                                <div className="bg-blue-50 px-4 py-2 rounded-lg text-blue-700 font-bold flex items-center gap-2">
                                    {pro.credits} Kredit qaldı
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-auto mt-4 md:mt-0">
                            <Link href="/dashboard" className="block w-full text-center bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition shadow-sm">
                                İşlərə Bax
                            </Link>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Info Column */}
                        <div className="col-span-1 space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Əlaqə Məlumatları</h3>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <p className="text-gray-600 mb-1">E-poçt</p>
                                        <p className="font-medium text-gray-900">{pro.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">Qeydiyyat Tarixi</p>
                                        <p className="font-medium text-gray-900">{new Date(pro.createdAt).toLocaleDateString('az-AZ')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Haqqında</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {pro.about || 'Özünüz haqqında qısa məlumat daxil etməmisiniz. (Profil redaktə funksiyası tezliklə əlavə ediləcək).'}
                                </p>
                            </div>
                        </div>

                        {/* Recent Proposals Column */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-hidden">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Son Təkliflərim</h3>

                                {pro.proposals.length === 0 ? (
                                    <div className="text-center py-10">
                                        <p className="text-gray-600 mb-4">Hələ heç bir işə təklif göndərməmisiniz.</p>
                                        <Link href="/dashboard" className="text-secondary font-bold hover:underline">
                                            İndi iş axtar
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {pro.proposals.slice(0, 5).map((proposal: any) => (
                                            <div key={proposal.id} className="p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-bold text-primary">{proposal.request.service}</h4>
                                                    <span className="font-bold text-secondary text-lg">{proposal.amount} ₼</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-600">{proposal.request.city} • {new Date(proposal.createdAt).toLocaleDateString('az-AZ')}</span>
                                                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                                                        Müştəriyə Zəng Edilib
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        {pro.proposals.length > 5 && (
                                            <button className="w-full py-3 text-sm font-bold text-primary hover:bg-gray-50 rounded-lg transition mt-4">
                                                Bütün Təkliflərə Bax
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
