'use client';

import { Button } from '@/components/ui/Button';

export default function StartPage({ onStartDiagnosis }: { onStartDiagnosis: () => void }) {
  return (
    <section className="bg-background h-216 py-auto flex items-center">
      <div className="flex lg:flex-row lg:items-center lg:justify-between mx-36">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <h1 className="text-[55px] font-extrabold text-gray-900 leading-tight">
            Smart Diabetes Risk Assessment System
          </h1>
          <p className="text-gray-600 text-2xl leading-relaxed font-semibold">
            Sistem ini menggunakan algoritma Machine Learning untuk menganalisis data Anda dan
            memberikan prediksi akurat tentang risiko diabetes Anda.
          </p>
          <Button
            onClick={onStartDiagnosis}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2 transition-colors"
          >
            Mulai Diagnosa
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        {/* Right Image */}
        <div className="flex-1 relative justify-end items-end flex">
          <div className="lg:w-140 lg:h-140 aspect-square lg:bg-[url('/images/home.png')] bg-cover bg-center rounded-lg shadow-lg ">
            {/* <Image
                src="/images/home.png"
                alt="Diabetes Assessment"
                fill
                className="rounded-lg object-cover shadow-lg"
                priority
              /> */}
          </div>
        </div>
      </div>
    </section>
  );
}