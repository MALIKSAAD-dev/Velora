"use client";

import { motion } from "framer-motion";
import { Database, Brain, PenTool, Layout, ShieldCheck, Zap } from "lucide-react";

export default function FeaturesPage() {
    const features = [
        {
            title: "ZenRows Extractor Pipeline",
            description: "A secure, proxy-rotated headless scraper that bypasses advanced anti-bot measures to extract raw DOM structures and convert them cleanly into Markdown.",
            icon: <Database size={32} className="text-white" />,
        },
        {
            title: "120B Parameter Analytical Reasoning",
            description: "Powered by the GPT OSS 120B model on Groq, the system autonomously audits extracted data to identify critical operational and efficiency gaps.",
            icon: <Brain size={32} className="text-white" />,
        },
        {
            title: "70B Parameter Proposition Generation",
            description: "Llama 3.3 70B synthetically orchestrates high-converting, personalized B2B outreach sequences utilizing the structured intelligence context.",
            icon: <PenTool size={32} className="text-white" />,
        },
        {
            title: "Executive UI Dashboard",
            description: "A dark-themed, glassmorphism workspace built in Next.js 15 that visualizes the AI output in both raw Markdown and plain-text Email formats.",
            icon: <Layout size={32} className="text-white" />,
        },
        {
            title: "Zero-Latency API Network",
            description: "By utilizing the Groq LPU inference engine, complex 120-billion parameter reasoning executes with near-zero latency, accelerating the sales cycle.",
            icon: <Zap size={32} className="text-white" />,
        },
        {
            title: "Secure Serverless Architecture",
            description: "No database. No stored client data. The app runs fully serverless on standard API Edge Functions ensuring maximum B2B data compliance.",
            icon: <ShieldCheck size={32} className="text-white" />,
        },
    ];

    return (
        <div className="relative overflow-hidden w-full min-h-screen pt-32 pb-24 px-6">
            {/* Background gradients */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-6xl font-black mb-6">The Velora Engine</h1>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto">
                        Discover the autonomous architecture that powers the next generation of B2B sales intelligence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500 pointer-events-none">
                                {feature.icon}
                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 shadow-inner border border-white/5">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                            <p className="text-neutral-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
