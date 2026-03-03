'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const placeholders = [
    "Təmizlik, təmir və ya daşınma...",
    "Santexnik usta axtar...",
    "Evdən evə daşınma yük maşını...",
    "Kondisioner təmiri..."
];

export default function Hero() {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        setIsSearching(true);
        const params = new URLSearchParams();
        if (searchTerm.trim()) params.append('q', searchTerm.trim());
        if (category) params.append('category', category);

        // Simulating artificial delay for spinner visibility if desired
        router.push(`/?${params.toString()}`);

        // Let the effect of navigation reset the searching state, 
        // normally Next.js completes navigation quickly but resetting 
        // explicitly helps if they stay on page
        setTimeout(() => setIsSearching(false), 800);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((current) => (current + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-accent py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40 mix-blend-multiply pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="absolute top-1/2 -right-24 w-80 h-80 rounded-full bg-secondary/10 blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary mb-6 tracking-tight leading-tight">
                    Eviniz üçün peşəkar <br className="hidden sm:block" /> xidmət axtarırsınız?
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
                    Ev təmizliyindən tutmuş santexnik işlərinə qədər hər şey üçün etibarlı ustaları saniyələr içində tapın.
                </p>

                <div className="relative max-w-3xl mx-auto group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                    <form onSubmit={handleSearch} className="relative flex flex-col md:flex-row items-center bg-white rounded-3xl md:rounded-full shadow-lg p-2 transition-all gap-2 md:gap-0">
                        <div className="flex-1 flex items-center w-full px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-2 md:pb-0">
                            <div className="pr-2 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-3 md:py-4 px-2 bg-transparent text-foreground outline-none text-lg selection:bg-primary/20"
                                placeholder={placeholders[placeholderIndex]}
                                style={{ transition: "placeholder 0.3s ease-in-out" }}
                            />
                        </div>

                        <div className="w-full md:w-auto px-4 md:px-2 flex items-center justify-between">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full md:w-48 py-3 md:py-4 px-2 bg-transparent outline-none text-gray-700 cursor-pointer appearance-none bg-no-repeat"
                                style={{
                                    backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 20 20\" stroke=\"%236b7280\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M7 7l3-3 3 3m0 6l-3 3-3-3\"/></svg>')",
                                    backgroundPosition: "right 0.5rem center",
                                    backgroundSize: "1.5em 1.5em",
                                    paddingRight: "2.5rem"
                                }}
                            >
                                <option value="">İxtisas Seçin</option>
                                <option value="Santexnik">Santexnik</option>
                                <option value="Rəngsaz">Rəngsaz</option>
                                <option value="Elektrik">Elektrik</option>
                                <option value="Təmizlikçi">Təmizlikçi</option>
                                <option value="Mebel Ustası">Mebel Ustası</option>
                                <option value="Kondisioner Ustası">Kondisioner Ustası</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={isSearching}
                            className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 md:py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:hover:translate-y-0"
                        >
                            {isSearching ? (
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : null}
                            <span>{isSearching ? 'Yüklənir...' : 'Axtar'}</span>
                        </button>
                    </form>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span> Məmnun müştərilər
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary"></span> 100% zəmanət
                    </div>
                </div>
            </div>
        </section>
    );
}
