"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import { api } from "@/lib/api";
import { tokenManager } from "@/lib/auth";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const checkLoginStatus = () => {
    // Check login status using token manager
    const loggedIn = tokenManager.isLoggedIn();
    setIsLoggedIn(loggedIn);

    // Get user data
    if (loggedIn) {
      const userData = tokenManager.getUserData();
      setUserName(userData?.name || "Pengguna");
    }
  };

  useEffect(() => {
    checkLoginStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    // Listen for custom auth event
    const handleAuthChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // Also check on pathname change
  useEffect(() => {
    checkLoginStatus();
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogoutClick = () => {
    setShowDropdown(false);
    setShowLogoutDialog(true);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      const accessToken = tokenManager.getAccessToken();
      if (accessToken) {
        // Call logout API
        await api.logout(accessToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage and tokens
      tokenManager.removeTokens();

      // Close dialog
      setShowLogoutDialog(false);
      setIsLoggingOut(false);

      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event("authChange"));

      // Redirect to homepage
      router.push("/");
    }
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  // Render button berdasarkan halaman saat ini
  const renderRightSection = () => {
    // Jika di halaman login, tampilkan button Register
    if (pathname === "/login") {
      return (
        <Button
          onClick={handleRegister}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 transition-colors"
        >
          Register
        </Button>
      );
    }

    // Jika di halaman register, tampilkan button Login
    if (pathname === "/register") {
      return (
        <Button
          onClick={handleLogin}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 transition-colors"
        >
          Login
        </Button>
      );
    }

    // Untuk halaman lain, tampilkan berdasarkan status login
    if (isLoggedIn) {
      return (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="my-auto text-2xl font-bold text-black hover:text-indigo-600 transition flex items-center gap-2"
          >
            Hai, {userName}!
            <svg
              className={`w-5 h-5 transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
              <button
                onClick={handleLogoutClick}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <Button
          onClick={handleLogin}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 transition-colors"
        >
          Login
        </Button>
      );
    }
  };

  return (
    <>
      <nav className="bg-background font-plus-jakarta w-full fixed top-0 z-100 shadow-md">
        <div className="flex justify-between mx-36 my-8">
          <Link href="/">
            <Image
              src="/logo/logo-landing-page.png"
              alt="diasys logo"
              width={139}
              height={60}
            />
          </Link>

          {renderRightSection()}
        </div>
      </nav>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Konfirmasi Logout
            </h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin keluar dari akun Anda?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                disabled={isLoggingOut}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoggingOut ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Memproses...
                  </>
                ) : (
                  "Ya, Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
