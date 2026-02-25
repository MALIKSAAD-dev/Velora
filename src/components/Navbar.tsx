"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Hexagon, Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Founder", href: "/founder" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-4" : "py-6"}`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div
                    className={`flex items-center justify-between rounded-2xl border transition-all duration-500 px-6 py-3 ${scrolled ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" : "bg-transparent border-transparent"}`}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-[10px] bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
                            <Hexagon size={22} className="text-black" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-neutral-300">
                            Velora
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium transition-all relative group ${isActive ? "text-white" : "text-neutral-400 hover:text-white"}`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navIndicator"
                                            className="absolute -bottom-2 left-0 right-0 h-[1px] bg-white rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Call to Action & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/app"
                            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95"
                        >
                            <span>Launch App</span>
                            <ArrowRight size={16} />
                        </Link>

                        <button
                            className="md:hidden text-white p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 mt-4 px-6 md:hidden"
                    >
                        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col gap-6 backdrop-blur-3xl">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`text-lg font-medium ${pathname === link.href ? "text-white" : "text-neutral-400"}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr className="border-white/10" />
                            <Link
                                href="/app"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full py-4 rounded-xl bg-white text-black font-semibold text-center hover:bg-neutral-200 transition-colors"
                            >
                                Launch App
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
