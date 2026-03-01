'use client';

import Link from "next/link";
import { logoutUser } from "@/app/actions/auth";
import { useState } from "react";

export default function NavbarClient({ session }: { session: any }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-primary text-3xl font-bold tracking-tight">
                            UstaTap
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/xidmetler" className="text-foreground hover:text-primary transition-colors font-medium">
                            Xidmətlər
                        </Link>
                        <Link href="/nece-isleyir" className="text-foreground hover:text-primary transition-colors font-medium">
                            Necə İşləyir?
                        </Link>
                        {!session || session.role !== 'PRO' ? (
                            <Link href="/usta-ol" className="text-foreground hover:text-primary transition-colors font-medium">
                                Usta Ol
                            </Link>
                        ) : null}

                        {session ? (
                            <div className="flex items-center gap-6 border-l border-gray-200 pl-6 ml-2">
                                <Link href={session.role === 'PRO' ? "/profile" : "/"} className="flex flex-col items-end group">
                                    <span className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors">{session.name}</span>
                                    <span className="text-xs text-gray-500 bg-gray-100 group-hover:bg-primary/10 px-2 rounded-full mt-0.5 transition-colors">{session.role}</span>
                                </Link>
                                <form action={logoutUser}>
                                    <button
                                        type="submit"
                                        className="text-red-500 border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-all duration-300"
                                    >
                                        Çıxış
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <Link
                                href="/giris"
                                className="text-primary border-2 border-primary hover:bg-primary hover:text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                            >
                                Giriş
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-foreground hover:text-primary focus:outline-none"
                        >
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4 space-y-4">
                    <Link href="/xidmetler" className="block text-foreground font-medium py-2">Xidmətlər</Link>
                    <Link href="/nece-isleyir" className="block text-foreground font-medium py-2">Necə İşləyir?</Link>

                    {!session || session.role !== 'PRO' ? (
                        <Link href="/usta-ol" className="block text-foreground font-medium py-2">Usta Ol</Link>
                    ) : null}

                    <div className="pt-4 border-t border-gray-100">
                        {session ? (
                            <div className="flex flex-col space-y-4">
                                <Link href={session.role === 'PRO' ? "/profile" : "/"} className="flex flex-col bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    <span className="font-bold text-gray-800">{session.name}</span>
                                    <span className="text-xs text-gray-500 mt-1">{session.role} profili</span>
                                </Link>
                                <form action={logoutUser} className="w-full">
                                    <button
                                        type="submit"
                                        className="text-red-500 font-medium text-left w-full py-2"
                                    >
                                        Çıxış Et
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <Link
                                href="/giris"
                                className="block text-center text-primary border-2 border-primary hover:bg-primary hover:text-white px-6 py-2 rounded-lg font-semibold transition-all"
                            >
                                Giriş
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
