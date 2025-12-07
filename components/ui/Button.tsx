import Link from "next/link";

export default function Button() {
    return (
        <Link href="/login" className="font-bold my-auto bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Mulai Diagnosa
        </Link>
    )}