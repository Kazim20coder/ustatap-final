import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginForm from "./LoginForm";

export default function GirisPage() {
    return (
        <div className="min-h-screen bg-white selection:bg-primary/20 flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center p-8 bg-accent/30">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="flex justify-center">
                            <svg className="w-8 h-8 text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-primary mb-2">Giriş</h1>
                        <p className="text-gray-600">
                            Hesabınıza daxil olun
                        </p>
                    </div>

                    <LoginForm />
                </div>
            </main>
            <Footer />
        </div>
    );
}
