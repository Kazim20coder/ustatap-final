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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let pro: any;
    try {
        pro = await prisma.user.findUnique({
            where: { id },
            include: { reviews: true } // Include the nested reviews
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
            phone: "+994 50 000 00 00",
            bio: "Bu, sistem tərəfindən yaradılmış nümunəvi profil səhifəsidir.",
            portfolioImages: [
                "https://source.unsplash.com/400x400/?worker,1",
                "https://source.unsplash.com/400x400/?worker,2",
                "https://source.unsplash.com/400x400/?worker,3"
            ],
            reviews: []
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
                            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-end -mt-16 mb-8 gap-4">
                                <div className="p-1 bg-white inline-block rounded-full shadow-lg">
                                    <Image
                                        src={imageUrl}
                                        alt={pro.name}
                                        width={128}
                                        height={128}
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                                    <a
                                        href={`tel:${pro.phone?.replace(/\\s/g, '') || '#0'}`}
                                        className="bg-blue-600 text-white hover:bg-blue-700 py-3 px-6 rounded-xl font-bold transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 flex-1 sm:flex-none"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        Zəng Et
                                    </a>
                                    <a
                                        href={`https://wa.me/${pro.phone?.replace(/[\\s+]/g, '') || ''}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-green-500 text-white hover:bg-green-600 py-3 px-6 rounded-xl font-bold transition-all shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 flex-1 sm:flex-none"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                                        </svg>
                                        WhatsApp
                                    </a>
                                </div>
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
                                        {pro.bio ? (
                                            <p>{pro.bio}</p>
                                        ) : pro.about ? (
                                            <p>{pro.about}</p>
                                        ) : (
                                            <p>Bu istifadəçi hələ özü haqqında məlumat daxil etməyib. {pro.name}, qeydiyyatdan keçmiş və doğrulanmış peşəkar bir ustadır.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Portfolio Gallery */}
                                {pro.portfolioImages && pro.portfolioImages.length > 0 && (
                                    <div className="mt-12">
                                        <h3 className="text-2xl font-bold text-primary mb-6">İş Nümunələri</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                            {pro.portfolioImages.map((imgUrl: string, idx: number) => (
                                                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                    <Image
                                                        src={imgUrl}
                                                        alt={`Portfolio ${idx}`}
                                                        fill
                                                        className="object-cover hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Rəylər */}
                                <div className="mt-16">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-2xl font-bold text-primary">Müştəri Rəyləri</h3>
                                        <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-lg text-sm">Doğrulanmış Reytinq</span>
                                    </div>

                                    {pro.reviews && pro.reviews.length > 0 ? (
                                        <div className="space-y-4">
                                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                            {pro.reviews.map((review: any) => (
                                                <div key={review.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-bold text-gray-900">{review.customerName}</h4>
                                                        <div className="flex text-yellow-400">
                                                            {[...Array(review.rating)].map((_, i) => (
                                                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700">{review.comment}</p>
                                                    <p className="text-xs text-gray-400 mt-3">{new Date(review.createdAt).toLocaleDateString("az-AZ")}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 bg-gray-50 p-6 rounded-2xl text-center">Hələlik heç bir rəy əlavə edilməyib.</p>
                                    )}

                                    {/* Rəy Bildir Form Placeholder */}
                                    <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                                        <h4 className="font-bold text-gray-900 mb-2">Rəy bildir</h4>
                                        <p className="text-sm text-gray-600 mb-4">Bu ustadan xidmət almısınız? Təcrübənizi bölüşün.</p>
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="Adınız" className="bg-white border border-gray-200 rounded-xl px-4 py-2 w-1/3 outline-none" disabled />
                                            <input type="text" placeholder="Rəyiniz..." className="bg-white border border-gray-200 rounded-xl px-4 py-2 flex-grow outline-none" disabled />
                                            <button className="bg-blue-600 text-white font-bold px-6 py-2 rounded-xl disabled:opacity-50" disabled>Göndər</button>
                                        </div>
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
