import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NeceIsleyir() {
    return (
        <div className="min-h-screen bg-white selection:bg-primary/20 flex flex-col">
            <Navbar />
            <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 bg-accent/30 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-12">UstaTap Necə İşləyir?</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                            <h3 className="text-xl font-bold text-primary mb-4">Xidməti Seçin</h3>
                            <p className="text-foreground">Sizə lazım olan xidməti seçin və qısa sualları cavablandıraraq tələbinizi yaradın.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                            <h3 className="text-xl font-bold text-primary mb-4">Təkliflər Alın</h3>
                            <p className="text-foreground">Tələbinizə uyğun ən yaxşı ustalar sizə qiymət və vaxt təklifi göndərəcək.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm">
                            <div className="w-16 h-16 bg-[#0EA5E9]/10 text-[#0EA5E9] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                            <h3 className="text-xl font-bold text-primary mb-4">Ən Yaxşısını Seç</h3>
                            <p className="text-foreground">Uyğun bildiyiniz ustayla əlaqə saxlayın və işinizi peşəkarlara həvalə edin.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
