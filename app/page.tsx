'use client';

import { useState } from 'react';
import StartPage from '@/components/sections/StartPage';
import FormData, { FormDataType } from '@/components/sections/FormData';
import ResultPredict, { PredictionResult } from '@/components/sections/ResultPredict';

export default function Home() {
  // State untuk tracking apakah user sudah login
  // Untuk sementara hardcode, nanti bisa diganti dengan auth session check
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State untuk tracking section mana yang ditampilkan
  const [currentSection, setCurrentSection] = useState<'start' | 'form' | 'result'>('start');

  // State untuk menyimpan hasil prediksi
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  // Handler ketika user klik "Mulai Diagnosa"
  const handleStartDiagnosis = () => {
    // Cek apakah user sudah login
    if (!isLoggedIn) {
      // Redirect ke login page atau show login modal
      // Untuk demo, sementara set isLoggedIn true
      alert('Anda perlu login terlebih dahulu. Untuk demo, Anda akan otomatis login.');
      setIsLoggedIn(true);
      setCurrentSection('form');
    } else {
      setCurrentSection('form');
    }
  };

  // Handler ketika form disubmit untuk prediksi
  const handlePredict = (data: FormDataType) => {
    // Di sini nanti akan dipanggil API untuk prediksi
    // Untuk sementara kita buat mock result
    console.log('Form data:', data);

    // Mock prediction result
    const mockResult: PredictionResult = {
      status: 'high',
      accuracy: 70,
      message: 'Hasil prediksi menunjukkan risiko tinggi. Disarankan untuk segera berkonsultasi dengan dokter atau tenaga medis profesional untuk pemeriksaan lebih lanjut.'
    };

    setPredictionResult(mockResult);
    setCurrentSection('result');
  };

  // Handler untuk kembali ke form
  const handlePredictAgain = () => {
    setCurrentSection('form');
    setPredictionResult(null);
  };

  return (
    <main className="mt-32">
      {/* Start Page - Dapat diakses publik */}
      {currentSection === 'start' && (
        <StartPage onStartDiagnosis={handleStartDiagnosis} />
      )}

      {/* Form Data - Hanya bisa diakses jika login */}
      {currentSection === 'form' && isLoggedIn && (
        <FormData onPredict={handlePredict} />
      )}

      {/* Result Predict - Hanya bisa diakses jika login dan ada hasil prediksi */}
      {currentSection === 'result' && isLoggedIn && predictionResult && (
        <ResultPredict
          result={predictionResult}
          onPredictAgain={handlePredictAgain}
        />
      )}

      {/* Jika user belum login dan coba akses form/result */}
      {!isLoggedIn && currentSection !== 'start' && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Akses Terbatas</h2>
            <p className="text-gray-600 mb-4">Silakan login terlebih dahulu untuk mengakses fitur ini.</p>
            <button
              onClick={() => setCurrentSection('start')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Kembali ke Halaman Utama
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
