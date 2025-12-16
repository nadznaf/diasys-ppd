'use client';

import { Button } from '@/components/ui/Button';

export interface PredictionResult {
  status: 'high' | 'low';
  accuracy: number;
  message: string;
}

interface ResultPredictProps {
  result: PredictionResult;
  onPredictAgain: () => void;
}

export default function ResultPredict({ result, onPredictAgain }: ResultPredictProps) {
  const isHighRisk = result.status === 'high';

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Hasil Prediksi Risiko Diabetes
          </h2>
          <p className="text-gray-600">
            Berikut adalah hasil prediksi diabetes Anda berdasarkan data yang telah dimasukkan.
          </p>
        </div>

        {/* Result Box */}
        <div className={`rounded-lg p-8 mb-6 ${
          isHighRisk 
            ? 'bg-red-50 border-2 border-red-200' 
            : 'bg-green-50 border-2 border-green-200'
        }`}>
          <div className="text-center space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              {isHighRisk ? (
                <svg className="w-16 h-16 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>

            {/* Status Label */}
            <div>
              <p className={`text-sm font-medium uppercase tracking-wide mb-2 ${
                isHighRisk ? 'text-red-600' : 'text-green-600'
              }`}>
                STATUS HASIL
              </p>
              <h3 className={`text-2xl font-bold ${
                isHighRisk ? 'text-red-700' : 'text-green-700'
              }`}>
                {isHighRisk 
                  ? 'Risiko Tinggi / Terindikasi Diabetes' 
                  : 'Risiko Rendah / Tidak Terindikasi Diabetes'}
              </h3>
            </div>

            {/* Accuracy */}
            <div>
              <p className="text-gray-700 font-medium">
                Akurasi prediksi model: <span className="font-bold">{result.accuracy}%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Recommendation Box */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Saran
          </h4>
          <p className="text-gray-700 text-center leading-relaxed">
            {result.message || (isHighRisk 
              ? 'Hasil prediksi menunjukkan risiko tinggi. Disarankan untuk segera berkonsultasi dengan dokter atau tenaga medis profesional untuk pemeriksaan lebih lanjut.'
              : 'Hasil prediksi menunjukkan risiko rendah. Namun tetap jaga pola hidup sehat dan lakukan pemeriksaan kesehatan secara berkala.'
            )}
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            onClick={onPredictAgain}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Lakukan Prediksi Ulang
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Catatan: Hasil prediksi dari sistem ini hanya untuk tujuan informasi dan tidak dimaksudkan sebagai pengganti diagnosis medis profesional. 
            Silakan konsultasikan dengan tenaga kesehatan profesional untuk segala masalah kesehatan.
          </p>
        </div>
      </div>
    </section>
  );
}