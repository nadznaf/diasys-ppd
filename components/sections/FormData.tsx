"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { api, PredictData, PredictionResult } from "@/lib/api";
import { tokenManager } from "@/lib/auth";

interface FormDataProps {
  onPredict: (result: PredictionResult) => void;
}

export interface FormDataType {
  glucose: string;
  bloodPressure: string;
  weight: string;
  height: string;
  age: string;
  insulin: string;
  skinThickness: string;
  diabetesPedigree: string;
  pregnancies: string;
}

export default function FormData({ onPredict }: FormDataProps) {
  const [formData, setFormData] = useState<FormDataType>({
    glucose: "",
    bloodPressure: "",
    weight: "",
    height: "",
    age: "",
    insulin: "",
    skinThickness: "",
    diabetesPedigree: "",
    pregnancies: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      glucose: "",
      bloodPressure: "",
      weight: "",
      height: "",
      age: "",
      insulin: "",
      skinThickness: "",
      diabetesPedigree: "",
      pregnancies: "",
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Get access token
      let accessToken = tokenManager.getAccessToken();

      if (!accessToken) {
        setError("Anda harus login terlebih dahulu");
        setIsLoading(false);
        return;
      }

      // Prepare data for API
      const predictData: PredictData = {
        glucose: Number(formData.glucose),
        blood_pressure: Number(formData.bloodPressure),
        weight: Number(formData.weight),
        height: Number(formData.height),
        age: Number(formData.age),
        insulin: Number(formData.insulin) || 0,
        skin_thickness: Number(formData.skinThickness) || 0,
        diabetes_pedigree_function: Number(formData.diabetesPedigree) || 0,
        pregnancies: Number(formData.pregnancies) || 0,
      };

      // Call predict API
      try {
        const response = await api.predict(predictData, accessToken);
        onPredict(response.data);
      } catch (err: any) {
        // If token expired, try to refresh
        if (err.message.includes("token") || err.message.includes("expired")) {
          accessToken = await tokenManager.refreshAccessToken();

          if (!accessToken) {
            setError("Sesi Anda telah berakhir. Silakan login kembali.");
            return;
          }

          // Retry predict with new token
          const response = await api.predict(predictData, accessToken);
          onPredict(response.data);
        } else {
          throw err;
        }
      }
    } catch (err: any) {
      setError(err.message || "Prediksi gagal. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-8" id="formData">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Form Input Data Klinis
          </h2>
          <p className="text-gray-600">
            Masukkan data pasien untuk menilai risiko diabetes menggunakan model
            Machine Learning.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-8"
        >
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Informasi Wajib */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Informasi Wajib
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Glukosa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Glukosa (Glucose)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="glucose"
                    value={formData.glucose}
                    onChange={handleInputChange}
                    placeholder="mg/dL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Tekanan Darah */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tekanan Darah (Blood Pressure)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleInputChange}
                    placeholder="mmHg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Berat Badan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Berat Badan
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="kg"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Tinggi Badan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tinggi Badan
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    placeholder="m"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    required
                  />
                </div>
              </div>

              {/* Usia */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usia (Age)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="tahun"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Opsional */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Informasi Opsional
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Insulin */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insulin
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="insulin"
                    value={formData.insulin}
                    onChange={handleInputChange}
                    placeholder="mu U/ml"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Ketebalan Kulit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ketebalan Kulit (Skin Thickness)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="skinThickness"
                    value={formData.skinThickness}
                    onChange={handleInputChange}
                    placeholder="mm"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Riwayat Keluarga */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Riwayat Keluarga (Diabetes Pedigree Function)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="diabetesPedigree"
                    value={formData.diabetesPedigree}
                    onChange={handleInputChange}
                    placeholder="cth. 0.551"
                    step="0.001"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              {/* Jumlah Kehamilan */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Kehamilan (Jika Wanita)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="pregnancies"
                    value={formData.pregnancies}
                    onChange={handleInputChange}
                    placeholder="Jumlah kehamilan"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="button"
              onClick={handleClearForm}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Bersihkan Form
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-indigo-400"
            >
              {isLoading ? "Memproses..." : "Prediksi"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
