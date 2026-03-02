import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let pro = null;
    try {
        pro = await prisma.user.findUnique({
            where: { id },
            select: { name: true, specialty: true }
        });
    } catch { }

    if (!pro) {
        return { title: 'Tapılmadı - UstaTap' };
    }

    return {
        title: `${pro.name} - ${pro.specialty || 'Peşəkar Usta'} | UstaTap`,
        description: `${pro.name} - UstaTap profilinə xoş gəlmisiniz.`,
    };
}

export default async function ProProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let pro;
    try {
        pro = await prisma.user.findUnique({
            where: { id }
        });
    } catch (e) {
        console.error("Error finding pro:", e);
        notFound();
    }

    if (!pro && ["1", "2", "3", "4"].includes(id)) {
        // Fallback for static mock pros from TopRatedPros
        pro = {
            id,
            name: id === "1" ? "Tofiq S." : id === "2" ? "Samir K." : id === "3" ? "Aysel M." : "Rüfət A.",
            specialty: id === "1" ? "Santexnik" : id === "2" ? "Elektrik" : id === "3" ? "Ev Təmizliyi" : "Mebel Quraşdırma",
            role: "PRO",
            completedJobs: id === "1" ? 124 : id === "2" ? 89 : id === "3" ? 210 : 156,
            rating: id === "1" ? 4.9 : id === "2" ? 5.0 : id === "3" ? 4.8 : 4.9,
            createdAt: new Date(),
            about: "Bu, sistem tərəfindən yaradılmış nümunəvi profil səhifəsidir."
        };
    }

    if (!pro || pro.role !== 'PRO') {
        notFound();
    }

    // Generate mock reviews and rating if not present
    const reviewsCount = pro.completedJobs || Math.floor(Math.random() * 50) + 10;
    const rating = pro.rating || 4.8;
    const imageUrl = `https://i.pravatar.cc/300?u=${pro.id}`;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <main className="flex-grow bg-accent/30 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                        {/* Header/Cover */}
                        <div className="h-48 bg-gradient-to-r from-blue-600 to-[#0EA5E9]"></div>

                        <div className="px-8 pb-8">
                            <div className="relative flex justify-between items-end -mt-16 mb-8">
                                <div className="p-1 bg-white inline-block rounded-full shadow-lg">
                                    <img
                                        src={imageUrl}
                                        alt={pro.name}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white"
                                    />
                                </div>
                                <button className="bg-green-500 text-white hover:bg-green-600 py-3 px-8 rounded-xl font-bold transition-all shadow-md hover:-translate-y-0.5 mb-2 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    Əlaqə saxla
                                </button>
                            </div>

                            <div>
                                <h1 className="text-4xl font-extrabold text-primary mb-2">{pro.name}</h1>
                                <p className="text-xl font-semibold text-blue-600 mb-6 bg-blue-50 inline-block px-4 py-1 rounded-full">
                                    {pro.specialty || "Peşəkar Usta"}
                                </p>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="bg-accent/50 p-4 rounded-2xl border border-gray-50 text-center">
                                        <p className="text-sm text-gray-600 font-medium mb-1">Reytinq</p>
                                        <p className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {rating.toFixed(1)}
                                        </p>
                                    </div>
                                    <div className="bg-accent/50 p-4 rounded-2xl border border-gray-50 text-center">
                                        <p className="text-sm text-gray-600 font-medium mb-1">Şərhlər</p>
                                        <p className="text-2xl font-bold text-gray-900">{reviewsCount}</p>
                                    </div>
                                    <div className="bg-accent/50 p-4 rounded-2xl border border-gray-50 text-center md:col-span-2">
                                        <p className="text-sm text-gray-600 font-medium mb-1">Qeydiyyat Tarixi</p>
                                        <p className="text-xl font-bold text-gray-900 mt-1">
                                            {new Date(pro.createdAt).toLocaleDateString('az-AZ')}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold text-primary mb-4">Haqqında</h3>
                                    <div className="text-gray-700 leading-relaxed bg-accent/20 p-6 rounded-2xl border border-gray-100">
                                        {pro.about ? (
                                            <p>{pro.about}</p>
                                        ) : (
                                            <p>Bu istifadəçi hələ özü haqqında məlumat daxil etməyib. {pro.name}, qeydiyyatdan keçmiş və doğrulanmış peşəkar bir ustadır.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
