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
                        <h1 className="text-3xl font-bold text-primary mb-2">Giriş</h1>
                        <p className="text-foreground opacity-80">
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
