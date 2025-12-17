"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StartPage from "@/components/sections/StartPage";
import FormData from "@/components/sections/FormData";
import ResultPredict from "@/components/sections/ResultPredict";
import { PredictionResult } from "@/lib/api";
import { tokenManager } from "@/lib/auth";

export default function Home() {
  const router = useRouter();

  // State untuk tracking apakah user sudah login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk menyimpan hasil prediksi
  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);

  // Check login status
  useEffect(() => {
    const checkAuth = () => {
      const userLoggedIn = tokenManager.isLoggedIn();
      setIsLoggedIn(userLoggedIn);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth();
      // Reset prediction result when user logs out
      if (!tokenManager.isLoggedIn()) {
        setPredictionResult(null);
      }
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // Handler ketika user klik "Mulai Diagnosa"
  const handleStartDiagnosis = () => {
    if (!isLoggedIn) {
      // Redirect ke login jika belum login
      router.push("/login");
    } else {
      // Scroll ke form section jika sudah login
      const formSection = document.getElementById("form-section");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Handler ketika form disubmit untuk prediksi
  const handlePredict = (result: PredictionResult) => {
    // Set hasil prediksi dari API
    setPredictionResult(result);

    // Scroll ke result section
    setTimeout(() => {
      const resultSection = document.getElementById("result-section");
      if (resultSection) {
        resultSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Handler untuk kembali ke form
  const handlePredictAgain = () => {
    setPredictionResult(null);

    // Scroll ke form section
    setTimeout(() => {
      const formSection = document.getElementById("form-section");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <main className="mt-32 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">Memuat...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mt-8 lg:mt-16">
      {/* Start Page - Selalu tampil untuk semua user */}
      <section id="start-section">
        <StartPage onStartDiagnosis={handleStartDiagnosis} />
      </section>

      {/* Form Data dan Result - Hanya tampil jika sudah login */}
      {isLoggedIn && (
        <>
          {/* Form Data */}
          <section id="form-section" className="min-h-screen">
            <FormData onPredict={handlePredict} />
          </section>

          {/* Result Predict - Tampil jika ada hasil prediksi */}
          {predictionResult && (
            <section id="result-section" className="min-h-screen">
              <ResultPredict
                result={predictionResult}
                onPredictAgain={handlePredictAgain}
              />
            </section>
          )}
        </>
      )}
    </main>
  );
}
