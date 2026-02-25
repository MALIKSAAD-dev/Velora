"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Search,
  ArrowRight,
  Loader2,
  Bot,
  FileText,
  Mail,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type ResearchResponse = {
  decision_maker_name?: string;
  cold_email?: string;
  proposal?: string;
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [result, setResult] = useState<ResearchResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"email" | "proposal">("proposal");

  const loadingSteps = [
    "Scraping website content...",
    "Analyzing operational gaps...",
    "Drafting Velora business proposal...",
    "Finalizing documents..."
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setStatus("loading");
    setLoadingStep(0);
    setResult(null);
    setErrorMessage("");

    // Start faux progress for UX feeling responsive
    const progressInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 4500);

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      clearInterval(progressInterval);
      setLoadingStep(3);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate proposal");
      }

      setResult(data.data);
      setStatus("success");
    } catch (err: unknown) {
      clearInterval(progressInterval);
      setStatus("error");
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      setErrorMessage(errorMessage);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#050505] text-white selection:bg-white/30">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] mix-blend-screen opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center text-center space-y-6 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white text-sm font-medium">
            <Bot size={16} />
            <span>Velora AI Agent</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
            Automated Business Research
          </h1>
          <p className="text-neutral-400 max-w-2xl text-lg">
            Enter a target company URL. The agent will autonomously scrape their site, identify operational gaps, and generate a highly-converting, personalized business proposal for Velora solutions.
          </p>
        </motion.div>

        {/* Search Input */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto relative group mb-16"
        >
          <div className="absolute inset-0 bg-white/5 blur-xl rounded-2xl transition-opacity opacity-0 group-hover:opacity-100 duration-500" />
          <div className="relative glass-card rounded-2xl p-2 flex items-center gap-4">
            <div className="pl-4 text-neutral-400">
              <Building2 size={24} />
            </div>
            <input
              type="url"
              required
              placeholder="https://examplecompany.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={status === "loading"}
              className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder-neutral-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading" || !url}
              className="px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              {status === "loading" ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline">Analyze</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </motion.form>

        {/* Loading State */}
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-xl mx-auto flex flex-col items-center justify-center p-8 glass-card rounded-2xl"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-neutral-800 rounded-full"></div>
                <div className="w-16 h-16 border-4 border-white rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Search size={20} className="text-white animate-pulse" />
                </div>
              </div>
              <p className="text-xl font-medium text-white mb-2">Agent is working</p>
              <p className="text-neutral-400 animate-pulse">{loadingSteps[loadingStep]}</p>
            </motion.div>
          )}

          {/* Error State */}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto p-6 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4"
            >
              <AlertCircle className="text-red-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-red-400 font-medium mb-1">Analysis Failed</h3>
                <p className="text-red-200/70 text-sm">{errorMessage}</p>
              </div>
            </motion.div>
          )}

          {/* Success Results View */}
          {status === "success" && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row gap-6 w-full"
            >
              {/* Sidebar Menu */}
              <div className="lg:w-64 flex flex-row lg:flex-col gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab("proposal")}
                  className={`flex flex-col lg:flex-row items-center lg:items-start gap-3 p-4 rounded-xl transition-all duration-300 ${activeTab === "proposal" ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.1)] text-black" : "glass hover:bg-neutral-800/50 text-neutral-400"}`}
                >
                  <FileText size={22} className={activeTab === "proposal" ? "text-black" : "text-neutral-500"} />
                  <div className="text-left hidden sm:block">
                    <div className="font-medium">Full Proposal</div>
                    <div className="text-xs opacity-70 mt-1">Markdown Document</div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("email")}
                  className={`flex flex-col lg:flex-row items-center lg:items-start gap-3 p-4 rounded-xl transition-all duration-300 ${activeTab === "email" ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.1)] text-black" : "glass hover:bg-neutral-800/50 text-neutral-400"}`}
                >
                  <Mail size={22} className={activeTab === "email" ? "text-black" : "text-neutral-500"} />
                  <div className="text-left hidden sm:block">
                    <div className="font-medium">Email Draft</div>
                    <div className="text-xs opacity-70 mt-1">Executive Summary</div>
                  </div>
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 glass-card rounded-2xl overflow-hidden min-h-[600px] flex flex-col border border-white/5">
                {/* Content Header */}
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-black/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    <span className="text-sm font-medium text-neutral-300">
                      {activeTab === "proposal" ? "Velora_Strategic_Proposal.md" : "Initial_Outreach.eml"}
                    </span>
                  </div>
                  <CheckCircle2 size={18} className="text-white" />
                </div>

                {/* Content Body */}
                <div className="p-8 overflow-y-auto max-h-[800px] relative">
                  <AnimatePresence mode="wait">
                    {activeTab === "proposal" ? (
                      <motion.div
                        key="proposal"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="prose prose-invert max-w-none"
                      >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {result?.proposal || "*No proposal content generated.*"}
                        </ReactMarkdown>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="email"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="max-w-3xl"
                      >
                        <div className="mb-6 p-4 glass rounded-xl border border-white/5 space-y-3">
                          <div className="flex items-center gap-4">
                            <span className="text-neutral-500 w-16">To:</span>
                            <span className="text-neutral-300">{result?.decision_maker_name || "Decision Maker"}</span>
                          </div>
                        </div>
                        <div className="whitespace-pre-wrap text-neutral-300 leading-relaxed p-2">
                          {result?.cold_email || "No email draft generated."}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
