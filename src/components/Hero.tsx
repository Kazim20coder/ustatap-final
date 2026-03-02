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
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/?q=${encodeURIComponent(searchTerm.trim())}`);
        }
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
                    <form onSubmit={handleSearch} className="relative flex items-center bg-white rounded-full shadow-lg p-2 transition-all">
                        <div className="pl-4 pr-2 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-4 px-2 bg-transparent text-foreground outline-none text-lg selection:bg-primary/20"
                            placeholder={placeholders[placeholderIndex]}
                            style={{ transition: "placeholder 0.3s ease-in-out" }}
                        />
                        <button type="submit" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 flex items-center gap-2">
                            <span>Axtar</span>
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
