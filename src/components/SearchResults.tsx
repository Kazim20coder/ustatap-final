'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchResults({ q }: { q: string }) {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/search?q=${encodeURIComponent(q)}`)
            .then(res => res.json())
            .then(data => {
                setResults(data.pros || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [q]);

    if (loading) {
        return (
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="search-results">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-xl text-gray-600 font-medium">"{q}" üçün axtarılır...</p>
                </div>
            </section>
        );
    }

    if (results.length === 0) {
        return (
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white text-center" id="search-results">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-primary mb-4">Təəssüf ki, nəticə tapılmadı</h2>
                    <p className="text-xl text-gray-600 mb-8 mt-4">"{q}" axtarışınıza uyğun usta tapılmadı.</p>
                    <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all">
                        Bütün xidmətlərə qayıt
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="search-results">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        "<span className="text-blue-600">{q}</span>" üçün nəticələr
                    </h2>
                    <Link href="/" className="text-primary font-semibold hover:text-blue-600 transition-colors">
                        Sıfırla &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {results.map((pro: any) => (
                        <Link href={`/profile/${pro.id}`} key={pro.id} className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                            <div className="p-6">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="relative">
                                        <img src={pro.image} alt={pro.name} className="w-16 h-16 rounded-full object-cover border-2 border-accent" />
                                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1">
                                            <div className="bg-blue-600 w-3 h-3 rounded-full"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-primary">{pro.name}</h3>
                                        <p className="text-sm text-gray-800 font-bold bg-accent inline-block px-2 py-1 rounded-md mt-1">
                                            {pro.specialty || "Xidmət yoxdur"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center text-yellow-400 gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-extrabold text-gray-800">{pro.rating?.toFixed(1) || '5.0'}</span>
                                        <span className="text-xs text-gray-800 font-bold ml-1">({pro.reviews} rəy)</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-800 font-bold gap-1">
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
            </div>
        </section>
    );
}
