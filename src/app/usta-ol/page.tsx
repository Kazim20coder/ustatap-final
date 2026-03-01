import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegisterForm from "./RegisterForm";

export default function UstaOl() {
    return (
        <div className="min-h-screen bg-white selection:bg-primary/20 flex flex-col">
            <Navbar />
            <main className="flex-grow flex items-center justify-center p-8 bg-accent/30 text-center">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-3xl font-bold text-primary mb-4">Usta Kimi Qeydiyyat</h1>
                    <p className="text-foreground opacity-80 mb-6">
                        Bacarıqlarınızı pula çevirin! UstaTap ailəsinə qoşulun, əlavə qazanc əldə edin.
                    </p>

                    <RegisterForm />
                </div>
            </main>
            <Footer />
        </div>
    );
}
