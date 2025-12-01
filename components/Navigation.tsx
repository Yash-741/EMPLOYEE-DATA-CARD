'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { isAuthenticated, logoutUser } from '@/services/authService';

export default function Navigation() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(isAuthenticated());
    }, [pathname]); // Re-check auth on route change

    const handleLogout = () => {
        logoutUser();
        setIsLoggedIn(false);
        router.push('/login');
    };

    const publicLinks = [
        { href: '/', label: 'Home' },
    ];

    const protectedLinks = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/profile', label: 'Profile' },
        { href: '/verification', label: 'Verification' },
        { href: '/blockchain', label: 'Blockchain' },
    ];

    const navLinks = isLoggedIn ? [...publicLinks, ...protectedLinks] : publicLinks;

    return (
        <nav className="edc-glass-surface shadow-md sticky top-0 z-50 backdrop-blur-md bg-white/80">
            <div className="edc-container">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="edc-emblem" style={{ width: '40px', height: '40px', fontSize: '1rem' }}>
                            EDC
                        </div>
                        <div>
                            <div className="font-bold text-lg" style={{ color: 'var(--edc-primary)' }}>
                                Employee Data Card
                            </div>
                            <div className="text-xs text-gray-500">Digital Identity System</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-md font-medium transition-all ${pathname === link.href
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="ml-2 px-4 py-2 rounded-md font-medium transition-all text-red-600 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="ml-2 px-4 py-2 rounded-md font-medium transition-all bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                            >
                                Login
                            </Link>
                        )}

                        <Link
                            href="/admin"
                            className="ml-2 px-4 py-2 rounded-md font-medium transition-all bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 shadow-md hover:shadow-lg"
                        >
                            🔐 Admin
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-4 py-3 rounded-md font-medium transition-all ${pathname === link.href
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {isLoggedIn ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMobileMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-3 rounded-md font-medium transition-all text-red-600 hover:bg-red-50"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="block px-4 py-3 rounded-md font-medium transition-all text-blue-600 hover:bg-blue-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                        <Link
                            href="/admin"
                            className="block px-4 py-3 rounded-md font-medium transition-all text-yellow-600 hover:bg-yellow-50"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Admin Portal
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
