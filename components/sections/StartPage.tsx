'use client';

import { Button } from '@/components/ui/Button';

export default function StartPage({ onStartDiagnosis }: { onStartDiagnosis: () => void }) {
  return (
    <section className="relative min-h-screen pb-8 flex items-center px-8 sm:px-6 md:px-12 lg:px-36 overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('/images/home.png')] bg-cover bg-center lg:hidden"
        style={{
          backgroundPosition: 'center',
          filter: 'brightness(0.4)'
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 lg:hidden"></div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 w-full animate-fade-in">
        <div className="flex-1 space-y-4 md:space-y-6 animate-slide-in-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-extrabold text-white lg:text-gray-900 leading-tight drop-shadow-lg lg:drop-shadow-none">
            Smart Diabetes Risk Assessment System
          </h1>
          <p className="text-white lg:text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-semibold drop-shadow-md lg:drop-shadow-none">
            Sistem ini menggunakan algoritma Machine Learning untuk menganalisis data Anda dan
            memberikan prediksi akurat tentang risiko diabetes Anda.
          </p>
          <Button
            onClick={onStartDiagnosis}
            className="bg-indigo-600 hover:bg-indigo-700 hover:scale-105 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Mulai Diagnosa
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        <div className="hidden lg:flex flex-1 relative justify-end items-center animate-slide-in-right">
          <div className="w-full max-w-md lg:w-140 lg:h-140 aspect-square bg-[url('/images/home.png')] bg-cover bg-center rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"></div>
        </div>
      </div>
    </section>
  );
}