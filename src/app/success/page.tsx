import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-white selection:bg-primary/20 flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center p-8 bg-accent/20 text-center">
                <div className="max-w-xl bg-white p-12 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center">
                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-primary mb-4">Təbrik edirik! 🎉</h1>
                    <p className="text-lg text-foreground mb-8">
                        Sorğunuz uğurla yaradıldı. Ən qısa zamanda ustalar tərəfindən sizə təkliflər göndəriləcək.
                    </p>
                    <Link href="/" className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all">
                        Ana Səhifəyə Qayıt
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
