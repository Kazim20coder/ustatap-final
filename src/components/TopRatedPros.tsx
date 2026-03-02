import Image from 'next/image';
import Link from 'next/link';
export default function TopRatedPros() {
    const pros = [
        {
            id: 1,
            name: "Tofiq S.",
            service: "Santexnik",
            rating: 4.9,
            reviews: 124,
            image: "https://i.pravatar.cc/150?img=11",
            location: "Bakı, Nəsimi",
        },
        {
            id: 2,
            name: "Samir K.",
            service: "Elektrik",
            rating: 5.0,
            reviews: 89,
            image: "https://i.pravatar.cc/150?img=12",
            location: "Bakı, Xətai",
        },
        {
            id: 3,
            name: "Aysel M.",
            service: "Ev Təmizliyi",
            rating: 4.8,
            reviews: 210,
            image: "https://i.pravatar.cc/150?img=5",
            location: "Bakı, Nərimanov",
        },
        {
            id: 4,
            name: "Rüfət A.",
            service: "Mebel Quraşdırma",
            rating: 4.9,
            reviews: 156,
            image: "https://i.pravatar.cc/150?img=14",
            location: "Bakı, Binəqədi",
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-accent">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Ən Yüksək Reytinqli Ustalar</h2>
                        <p className="text-gray-900 text-lg max-w-2xl font-medium">
                            İşini sevərək və peşəkarcasına görən ən yaxşı ustalarımız.
                        </p>
                    </div>
                    <button className="hidden md:block text-primary font-semibold hover:text-secondary transition-colors mt-4 md:mt-0">
                        Bütün ustalara bax &rarr;
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pros.map((pro) => (
                        <Link
                            href={`/profile/${pro.id}`}
                            key={pro.id}
                            className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex-col group"
                        >
                            <div className="p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="relative">
                                        <Image
                                            src={pro.image}
                                            alt={pro.name}
                                            width={64}
                                            height={64}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                                        />
                                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                                            <div className="bg-secondary w-3 h-3 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-primary">{pro.name}</h3>
                                        <p className="text-sm text-gray-800 font-bold bg-accent inline-block px-2 py-1 rounded-md mt-1">
                                            {pro.service}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center text-yellow-400 gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-extrabold text-gray-800">{pro.rating}</span>
                                        <span className="text-xs text-gray-800 font-bold ml-1">({pro.reviews} rəy)</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-800 font-bold gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {pro.location}
                                    </div>
                                </div>

                                <div className="w-full text-center bg-green-400 text-gray-900 group-hover:bg-green-500 py-3 rounded-xl font-extrabold transition-colors shadow-md border border-green-500 text-lg">
                                    Profilə Bax
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <button className="md:hidden w-full text-center text-primary font-semibold py-4 mt-6 border border-primary rounded-xl">
                    Bütün ustalara bax
                </button>
            </div>
        </section>
    );
}
