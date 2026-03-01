import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryGrid from "@/components/CategoryGrid";

export default function Xidmetler() {
    return (
        <div className="min-h-screen bg-white selection:bg-primary/20 flex flex-col">
            <Navbar />
            <main className="flex-grow pt-10 bg-accent/20">
                <div className="text-center mb-8 px-4">
                    <h1 className="text-4xl font-bold text-primary mb-4">Bütün Xidmətlər</h1>
                    <p className="text-lg text-foreground">Sizə hansı sahə üzrə usta lazımdır?</p>
                </div>
                <CategoryGrid />
            </main>
            <Footer />
        </div>
    );
}
