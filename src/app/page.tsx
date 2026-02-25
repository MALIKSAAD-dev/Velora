"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Zap, Database, Lock } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="relative overflow-hidden w-full bg-black selection:bg-white/30 text-white">
            {/* Background gradients - Ultra minimal white glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none -z-10" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-32 flex flex-col items-center justify-center text-center px-6 min-h-[85vh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-8"
                >
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <span className="text-sm font-medium text-neutral-300 uppercase tracking-widest text-[11px]">Velora OS 1.0 Live</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 leading-tight"
                >
                    Autonomous B2B <br className="hidden md:block" />
                    <span className="text-white">
                        Intelligence.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-neutral-400 max-w-2xl mb-12 font-light"
                >
                    Leverage 120B parameter reasoning models to autonomously scrape, analyze, and generate highly personalized sales proposals for any target company.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
                >
                    <Link
                        href="/app"
                        className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-black transition-all bg-white rounded-full hover:bg-neutral-200 hover:scale-105 overflow-hidden w-full sm:w-auto"
                    >
                        <span>Launch Workspace</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="/features"
                        className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white transition-all bg-transparent border border-white/20 rounded-full hover:bg-white/10 w-full sm:w-auto"
                    >
                        View Architecture
                    </Link>
                </motion.div>
            </section>

            {/* Value Props Section */}
            <section className="py-32 px-6 border-t border-white/[0.05] bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">Enterprise-Grade Automation</h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto font-light">
                            Replace hours of manual research and drafting with an autonomous pipeline.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <Bot size={20} className="text-white" />,
                                title: "120B Reasoning",
                                description: "Deep contextual analysis of target companies' infrastructure.",
                            },
                            {
                                icon: <Zap size={20} className="text-white" />,
                                title: "Instant Proposals",
                                description: "Generates high-converting markdown assets in seconds.",
                            },
                            {
                                icon: <Database size={20} className="text-white" />,
                                title: "Headless Extraction",
                                description: "Bypass anti-bot measures to extract clean architectural data.",
                            },
                            {
                                icon: <Lock size={20} className="text-white" />,
                                title: "Secure Processing",
                                description: "Your competitive intelligence stays strictly confidential.",
                            },
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="p-8 rounded-[2rem] bg-[#050505] border border-white/[0.05] hover:border-white/[0.1] transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-medium mb-3 text-white tracking-tight">{feature.title}</h3>
                                <p className="text-neutral-500 text-sm leading-relaxed font-light">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
