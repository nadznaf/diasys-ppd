import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";

export default function Navbar() {
    return (
        <nav className="bg-white font-plus-jakarta w-full fixed top-0 shadow-md">
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
                <Button />
            </div>
        </nav>
    )}