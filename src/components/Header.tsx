"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-[#F5F0E6] text-[#0B1D51] shadow-md">
            <nav className="flex items-center justify-between px-6 py-4 font-montserrat">
                {/* Logo */}
                <h1 className="text-xl md:text-2xl font-playfair font-bold tracking-wide">
                    <Link href="/" className="hover:text-[#B76E2D] transition-colors">
                        Mon Entreprise
                    </Link>
                </h1>

                {/* Desktop Links */}
                <ul className="hidden md:flex space-x-6 text-sm md:text-base">
                    <li>
                        <Link href="/actualities" className="hover:text-[#B76E2D] transition-colors">
                            Actualités
                        </Link>
                    </li>
                    <li>
                        <Link href="/services" className="hover:text-[#B76E2D] transition-colors">
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link href="/gallery" className="hover:text-[#B76E2D] transition-colors">
                            Galerie
                        </Link>
                    </li>
                </ul>

                {/* Burger Icon */}
                <button
                    aria-label="Toggle menu"
                    className="md:hidden text-2xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && (
                <ul className="md:hidden px-6 pb-4 space-y-3 text-base font-montserrat bg-[#F5F0E6] animate-fade-in">
                    <li>
                        <Link href="/actualities" onClick={() => setMenuOpen(false)} className="block hover:text-[#B76E2D] transition-colors">
                            Actualités
                        </Link>
                    </li>
                    <li>
                        <Link href="/services" onClick={() => setMenuOpen(false)} className="block hover:text-[#B76E2D] transition-colors">
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link href="/gallery" onClick={() => setMenuOpen(false)} className="block hover:text-[#B76E2D] transition-colors">
                            Galerie
                        </Link>
                    </li>
                </ul>
            )}
        </header>
    );
}
