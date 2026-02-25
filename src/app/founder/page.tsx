"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Code2, Cpu } from "lucide-react";

export default function FounderPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-white/[0.03] to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Text Content */}
                    <div className="lg:col-span-7 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                                <Code2 size={16} className="text-white" />
                                <span className="text-sm font-medium text-neutral-300">Creator & Lead Engineer</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white">
                                Hi, I&apos;m <Link href="http://maliksaad.bio.link/" className="text-transparent hover:opacity-80 transition-opacity bg-clip-text bg-gradient-to-r from-white to-neutral-500">Saad</Link>.
                            </h1>

                            <p className="text-xl text-neutral-300 mb-6 leading-relaxed">
                                I built Velora AI because I saw how much time sales teams waste on manual research. I believe the future of B2B intelligence lies in autonomous, 120-billion parameter reasoning.
                            </p>

                            <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
                                My passion is at the intersection of complex LLM orchestration and premium, consumer-grade user interfaces. By combining tools like Next.js 15, Groq LPUs, and Headless Chromium extraction, I aim to build software that doesn&apos;t just look incredible, but actively automates human bottlenecks.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/contact"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-transform"
                                >
                                    <Mail size={18} />
                                    <span>Get in Touch</span>
                                </Link>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                    <Link href="https://github.com/MALIKSAAD-dev" className="p-2 text-neutral-400 hover:text-white transition-colors"><Github size={20} /></Link>
                                    <Link href="https://www.linkedin.com/in/muhammad-saad-95847b3b2/" className="p-2 text-neutral-400 hover:text-white transition-colors"><Linkedin size={20} /></Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Visual Profile */}
                    <div className="lg:col-span-5 order-1 lg:order-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative w-full aspect-square rounded-[2.5rem] bg-gradient-to-br from-neutral-800 to-black border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center p-8"
                        >
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

                            <div className="z-10 text-center flex flex-col items-center">
                                <div className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                    <Cpu size={48} className="text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Systems Architect</h3>
                                <p className="text-neutral-400">Full-Stack AI Engineering</p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}
