import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-green-500 py-4 text-white">
            <div className="container mx-auto flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center md:flex-row md:space-x-4">
                    <Link href="/signup" className="hover:underline">Sign Up</Link>
                    <Link href="/login" className="hover:underline">Log In</Link>
                    <Link href="/about" className="hover:underline">About</Link>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                    <Link href="/" className="hover:underline">Index</Link>
                </div>
                <div className="text-center">
                <p>Tips &copy; {new Date().getFullYear()} </p>
                </div>
            </div>
        </footer>
    );
}