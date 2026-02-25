"use client";

import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formState, setFormState] = useState({ state: "idle" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState({ state: "loading" });
        // Simulate network request
        setTimeout(() => {
            setFormState({ state: "success" });
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 relative flex items-center justify-center">
            {/* Abstract Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-2xl"
            >
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-inner">
                        <MessageSquare size={28} className="text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">Let&apos;s Connect</h1>
                    <p className="text-lg text-neutral-400 max-w-lg mx-auto">
                        Interested in deploying Velora AI for your enterprise? Reach out to discuss custom architectures and integrations.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-[2rem] bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-neutral-300 ml-1">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-neutral-300 ml-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                                placeholder="john@company.com"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-medium text-neutral-300 ml-1">Message</label>
                        <textarea
                            id="message"
                            required
                            rows={5}
                            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-none"
                            placeholder="How can we help automate your workflow?"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={formState.state !== "idle"}
                        className="w-full py-4 mt-2 bg-white hover:bg-neutral-200 text-black font-semibold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {formState.state === "idle" ? (
                            <>
                                <span>Send Message</span>
                                <Send size={18} />
                            </>
                        ) : formState.state === "loading" ? (
                            <span className="animate-pulse">Sending...</span>
                        ) : (
                            <span className="text-green-300">Message Sent Successfully!</span>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
