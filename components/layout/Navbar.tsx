import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";

export default function Navbar() {
    return (
        <nav className="bg-background font-plus-jakarta w-full fixed top-0 z-100 shadow-md">
            <div className="flex justify-between mx-36 my-8">
                <Image
                    src="/logo/logo-landing-page.png"
                    alt="diasys logo"
                    width={139}
                    height={60}
                />
                <Link href="/logout" className="my-auto text-2xl font-bold  text-black hover:text-gray-900 transition">
                    Hai, Pengguna!
                </Link>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 transition-colors">
                    Login
                </Button>
            </div>
        </nav>
    )}