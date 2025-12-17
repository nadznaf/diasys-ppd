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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [predictionResult, setPredictionResult] =
    useState<PredictionResult | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const userLoggedIn = tokenManager.isLoggedIn();
      setIsLoggedIn(userLoggedIn);
      setIsLoading(false);
    };

    checkAuth();

    const handleAuthChange = () => {
      checkAuth();
      if (!tokenManager.isLoggedIn()) {
        setPredictionResult(null);
      }
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleStartDiagnosis = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      const formSection = document.getElementById("form-section");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handlePredict = (result: PredictionResult) => {
    setPredictionResult(result);

    setTimeout(() => {
      const resultSection = document.getElementById("result-section");
      if (resultSection) {
        resultSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handlePredictAgain = () => {
    setPredictionResult(null);

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
      <section id="start-section">
        <StartPage onStartDiagnosis={handleStartDiagnosis} />
      </section>

      {isLoggedIn && (
        <>
          <section id="form-section" className="min-h-screen">
            <FormData onPredict={handlePredict} />
          </section>

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
