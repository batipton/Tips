import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-4 text-gray-600">
            <div className="container mx-auto flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center md:flex-row md:space-x-4">
                    <Link href="/signup" className="hover:text-green-600 transition-colors duration-200">Sign Up</Link>
                    <Link href="/login" className="hover:text-green-600 transition-colors duration-200">Log In</Link>
                    <Link href="/about" className="hover:text-green-600 transition-colors duration-200">About</Link>
                    <Link href="/contact" className="hover:text-green-600 transition-colors duration-200">Contact</Link>
                    <Link href="/" className="hover:text-green-600 transition-colors duration-200">Index</Link>
                </div>
                <div className="text-center">
                <p className="text-sm">Tips &copy; {new Date().getFullYear()} </p>
                </div>
            </div>
        </footer>
    );
}