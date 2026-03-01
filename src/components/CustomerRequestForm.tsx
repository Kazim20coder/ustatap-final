'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createServiceRequest } from '@/app/actions';

export default function CustomerRequestForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        service: 'Ev Təmizliyi',
        placeholder="Məs: Nizami metrosunun yaxınlığı..."
                                            value={ formData.address }
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })
}
className = "w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all resize-none"
    ></textarea >
                                    </div >
                                </div >
                            </div >
                        )}

{/* Step 3: Date */ }
{
    step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <h3 className="text-xl font-bold text-primary mb-4">Nə vaxt lazım olacaq?</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tarix</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Uyğun Vaxt Aralığı</label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className={`border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-secondary transition-all text-center ${formData.timeSlot === 'Səhər (09:00-13:00)' ? 'bg-secondary/10 border-secondary' : 'hover:bg-secondary/5'}`}>
                            <input
                                type="radio"
                                name="time"
                                className="hidden"
                                checked={formData.timeSlot === 'Səhər (09:00-13:00)'}
                                onChange={() => setFormData({ ...formData, timeSlot: 'Səhər (09:00-13:00)' })}
                            />
                            <span className={formData.timeSlot === 'Səhər (09:00-13:00)' ? 'text-secondary font-medium' : ''}>Səhər (09:00-13:00)</span>
                        </label>
                        <label className={`border border-gray-200 rounded-lg p-3 cursor-pointer hover:border-secondary transition-all text-center ${formData.timeSlot === 'Günorta (13:00-18:00)' ? 'bg-secondary/10 border-secondary' : 'hover:bg-secondary/5'}`}>
                            <input
                                type="radio"
                                name="time"
                                className="hidden"
                                checked={formData.timeSlot === 'Günorta (13:00-18:00)'}
                                onChange={() => setFormData({ ...formData, timeSlot: 'Günorta (13:00-18:00)' })}
                            />
                            <span className={formData.timeSlot === 'Günorta (13:00-18:00)' ? 'text-secondary font-medium' : ''}>Günorta (13:00-18:00)</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
                    </div >

    <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
        <button
            onClick={handlePrev}
            disabled={step === 1 || isSubmitting}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${step === 1 || isSubmitting ? 'text-gray-400 cursor-not-allowed bg-accent' : 'text-primary bg-primary/10 hover:bg-primary hover:text-white'
                }`}
        >
            Geri
        </button>
        <button
            onClick={handleNext}
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary hover:bg-[#0EA5E9] hover:shadow-lg hover:-translate-y-0.5'}`}
        >
            {isSubmitting ? 'Göndərilir...' : (step === 3 ? 'Sorğu Göndər' : 'Növbəti')}
        </button>
    </div>
                </div >
            </div >
        </section >
    );
}

area: '',
    city: 'Bakı, Nəsimi',
        address: '',
            date: '',
                timeSlot: 'Günorta (13:00-18:00)'
    });

const handleNext = async () => {
    if (step < 3) {
        setStep(step + 1);
    } else {
        setIsSubmitting(true);
        const result = await createServiceRequest({
            ...formData,
            area: formData.area ? parseInt(formData.area) : null
        });
        setIsSubmitting(false);

        if (result.success) {
            router.push('/success');
        } else {
            alert('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
        }
    }
};

const handlePrev = () => {
    if (step > 1) setStep(step - 1);
};

return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="request-form">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Xidmət Sorğusu Yarat (Demo)</h2>
                <p className="text-foreground text-lg opacity-80 max-w-2xl mx-auto">
                    Ehtiyacınız olan xidməti tapmaq üçün sadəcə 3 addımı tamamlayın.
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 relative overflow-hidden">
                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-8 relative">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-accent -z-10"></div>
                    <div
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-secondary transition-all duration-300 -z-10"
                        style={{ width: `${((step - 1) / 2) * 100}%` }}
                    ></div>

                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${step >= s ? 'bg-secondary text-white ring-4 ring-white' : 'bg-accent text-gray-400 ring-4 ring-white'
                                }`}
                        >
                            {s}
                        </div>
                    ))}
                </div>

                <div className="flex justify-between text-xs font-medium text-gray-500 mb-8 px-2">
                    <span>1. Xidmət Detalları</span>
                    <span>2. Məkan</span>
                    <span>3. Tarix və Vaxt</span>
                </div>

                <div className="min-h-[250px]">
                    {/* Step 1: Details */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h3 className="text-xl font-bold text-primary mb-4">Ehtiyacınız nədir?</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Xidmət Növü</label>
                                    <select
                                        value={formData.service}
                                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                    >
                                        <option>Ev Təmizliyi</option>
                                        <option>Santexnik işləri</option>
                                        <option>Evdən evə daşınma</option>
                                        <option>Təmir-tikinti</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Evin sahəsi (m²)</label>
                                    <input
                                        type="number"
                                        placeholder="Məs: 80"
                                        value={formData.area}
                                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Location */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h3 className="text-xl font-bold text-primary mb-4">Hardadır?</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Şəhər / Rayon</label>
                                    <select
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                                    >
                                        <option>Bakı, Nəsimi</option>
                                        <option>Bakı, Yasamal</option>
                                        <option>Bakı, Səbail</option>
                                        <option>Xırdalan</option>
                                        <option>Sumqayıt</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Daha dəqiq ünvan</label>
                                    <textarea
                                        rows={3}