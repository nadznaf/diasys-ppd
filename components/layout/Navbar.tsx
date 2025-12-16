'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Check login status
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);

        // TODO: Get actual user name from session/API
        if (loggedIn) {
            setUserName(localStorage.getItem('userName') || 'Pengguna');
        }
    }, []);

    const handleLogin = () => {
        router.push('/login');
    };

    const handleRegister = () => {
        router.push('/register');
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        setIsLoggedIn(false);
        router.push('/');
    };

    // Render button berdasarkan halaman saat ini
    const renderRightSection = () => {
        // Jika di halaman login, tampilkan button Register
        if (pathname === '/login') {
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
        if (pathname === '/register') {
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
                <button
                    onClick={handleLogout}
                    className="my-auto text-2xl font-bold text-black hover:text-indigo-600 transition"
                >
                    Hai, {userName}!
                </button>
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
    );
}