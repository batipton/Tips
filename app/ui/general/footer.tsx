import Link from "next/link";

export default function Footer() {
    return (
        <footer className="text-center mt-8 space-y-3 py-8">
            <div className="flex justify-center gap-6 text-sm">
                <Link href="/" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                    Home
                </Link>
                <Link href="/about" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                    About
                </Link>
                <Link href="/contact" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                    Contact
                </Link>
                <Link href="/login" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                    Sign In
                </Link>
                <Link href="/signup" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                    Sign Up
                </Link>
                <a href="#" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                    Terms of Service
                </a>
                <a href="#" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                    Privacy Policy
                </a>
            </div>
            <p className="text-sm text-gray-500">
                © 2025 Tips. All rights reserved.
            </p>
        </footer>
    );
}