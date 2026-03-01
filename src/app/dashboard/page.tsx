import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProDashboard from "@/components/ProDashboard";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-white selection:bg-primary/20 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <ProDashboard />
            </main>
            <Footer />
        </div>
    );
}
