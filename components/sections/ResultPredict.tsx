"use client";

import { Button } from "@/components/ui/Button";
import { PredictionResult } from "@/lib/api";

interface ResultPredictProps {
  result: PredictionResult;
  onPredictAgain: () => void;
}

export default function ResultPredict({
  result,
  onPredictAgain,
}: ResultPredictProps) {
  const isHighRisk = result.prediction.risk_level === "TINGGI";

  // Color based on risk level
  const colorClass =
    result.prediction.color_indicator === "red" ? "red" : "green";

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Hasil Prediksi Risiko Diabetes
          </h2>
          <p className="text-gray-600">
            Berikut adalah hasil prediksi diabetes untuk{" "}
            <strong>{result.user.name}</strong>
          </p>
        </div>

        {/* Result Box */}
        <div
          className={`rounded-lg p-8 mb-6 ${
            colorClass === "red"
              ? "bg-red-50 border-2 border-red-200"
              : "bg-green-50 border-2 border-green-200"
          }`}
        >
          <div className="text-center space-y-4">
            {/* Icon */}
            <div className="flex justify-center">
              {isHighRisk ? (
                <svg
                  className="w-16 h-16 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>

            {/* Status Label */}
            <div>
              <p
                className={`text-sm font-medium uppercase tracking-wide mb-2 ${
                  colorClass === "red" ? "text-red-600" : "text-green-600"
                }`}
              >
                {result.prediction.risk_level}
              </p>
              <h3
                className={`text-2xl font-bold ${
                  colorClass === "red" ? "text-red-700" : "text-green-700"
                }`}
              >
                {result.prediction.status}
              </h3>
            </div>

            {/* Probability */}
            <div>
              <p className="text-gray-700 font-medium">
                Probabilitas:{" "}
                <span className="font-bold text-2xl">
                  {result.prediction.probability_text}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Metrik Kesehatan
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-gray-600 text-sm">BMI</p>
              <p className="font-bold text-lg">{result.health_metrics.bmi}</p>
              <p className="text-gray-500 text-xs">
                {result.health_metrics.bmi_category}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Glukosa</p>
              <p className="font-bold text-lg">
                {result.health_metrics.glucose} mg/dL
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Tekanan Darah</p>
              <p className="font-bold text-lg">
                {result.health_metrics.blood_pressure} mmHg
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Usia</p>
              <p className="font-bold text-lg">
                {result.health_metrics.age} tahun
              </p>
            </div>
          </div>
        </div>

        {/* Recommendation Box */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Saran & Rekomendasi
          </h4>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {result.prediction.advice}
          </div>
        </div>

        {/* Model Info */}
        <div className="bg-gray-100 rounded-lg p-6 mb-6">
          <div className="text-center">
            <p className="text-gray-700">
              Model:{" "}
              <span className="font-semibold">
                {result.model_info.model_type}
              </span>
            </p>
            <p className="text-gray-700">
              Akurasi Model:{" "}
              <span className="font-bold">{result.model_info.accuracy}%</span>
            </p>
          </div>
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
          <p>{result.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
