import Link from "next/link";
import { Hexagon, Globe, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-[#050505] relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 inline-block mb-6">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                <Hexagon size={18} className="text-black" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white hover:text-neutral-300 transition-colors">
                                Velora
                            </span>
                        </Link>
                        <p className="text-neutral-400 max-w-sm mb-8">
                            Autonomous business research and automated proposal generation powered by 120B parameter reasoning models.
                        </p>
                        <div className="flex items-center gap-4 text-neutral-500">
                            <Link href="http://maliksaad.bio.link/" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Globe size={20} /></Link>
                            <Link href="https://github.com/MALIKSAAD-dev" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Github size={20} /></Link>
                            <Link href="https://www.linkedin.com/in/muhammad-saad-95847b3b2/" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Linkedin size={20} /></Link>
                            <Link href="mailto:memaliksaad17@gmail.com" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Mail size={20} /></Link>
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Product</h4>
                        <ul className="space-y-4 text-neutral-400">
                            <li><Link href="/app" className="hover:text-white transition-colors">Launch App</Link></li>
                            <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Company</h4>
                        <ul className="space-y-4 text-neutral-400">
                            <li><Link href="/founder" className="hover:text-white transition-colors">About the Founder</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-neutral-500 text-sm">
                    <p>© {new Date().getFullYear()} Velora AI. All rights reserved.</p>
                    <p className="mt-2 md:mt-0 flex items-center gap-1">
                        Built by <Link href="http://maliksaad.bio.link/" className="text-white hover:underline font-medium">Saad</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
