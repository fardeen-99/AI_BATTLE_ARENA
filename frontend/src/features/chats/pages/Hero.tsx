import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Brain, LayoutGrid, MessageSquare, ArrowUpRight, Globe, Award, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

    const navigate=useNavigate()
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    };

    const staggerContainer = {
        initial: {},
        whileInView: { transition: { staggerChildren: 0.1 } }
    };

    return (
        <div className="min-h-screen bg-primary-bg font-sans selection:bg-accent-gold/20 selection:text-accent-gold text-text-main overflow-x-hidden antialiased">
            {/* Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-50 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />

            {/* Header / Navigation */}
            <header className="fixed top-0 left-0 right-0 z-[60] bg-primary-bg/95 backdrop-blur-sm border-b border-border-soft">
                <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-text-main flex items-center justify-center text-primary-bg font-serif font-bold italic text-lg shadow-md">C</div>
                        <span className="hidden sm:block text-lg md:text-xl font-serif font-bold tracking-tight uppercase">Cyber Arena</span>
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-8 text-[8px] font-black uppercase tracking-[0.4em] text-text-muted">
                        <a href="#how-it-works" className="hover:text-accent-gold transition-colors">Principles</a>
                        <a href="#features" className="hover:text-accent-gold transition-colors">Architecture</a>
                        <a href="#about" className="hover:text-accent-gold transition-colors">Institute</a>
                    </div>

                    <button
                    onClick={()=>navigate("/login")}
                    className="flex items-center gap-2.5 bg-text-main text-primary-bg px-5 md:px-8 py-2.5 md:py-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:bg-accent-gold shadow-lg active:scale-95">
                        Identify
                        <ArrowRight size={12} />
                    </button>
                </nav>
            </header>

            {/* Hero Section - Concise */}
            <section className="relative pt-32 pb-24 px-6 min-h-[60vh] md:min-h-[100dvh] flex flex-col items-center justify-center text-center bg-primary-bg">
                <motion.div 
                    className="z-10 max-w-5xl px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-1.5 mb-8 text-[8px] font-black uppercase tracking-[0.5em] bg-white border border-border-soft shadow-sm text-accent-gold">
                        Standard of Excellence
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif font-extrabold leading-[0.95] tracking-tighter mb-8 text-text-main">
                        INTELLECTUAL <br /> <span className="italic font-normal text-slate-400">Sovereignty</span>
                    </h1>
                    
                    <p className="max-w-lg mx-auto text-xs md:text-sm text-text-muted font-light mb-10 leading-relaxed tracking-wide">
                        Engage in high-fidelity neutral benchmarking. Our laboratory environment provides absolute clarity in the evaluation of autonomous reasoning and creative synthesis.
                    </p>

                    <div className="flex flex-col sm:row items-center justify-center gap-4">
                        <button
                        onClick={()=>navigate("/dashboard")}
                        className="w-full sm:w-auto px-10 py-3.5 bg-text-main text-primary-bg text-[9px] font-black uppercase tracking-[0.4em] hover:bg-accent-gold transition-all shadow-xl">
                            Enter Arena
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Battle Showcase - Compact */}
            <section id="how-it-works" className="py-24 px-6 bg-midnight text-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[9px] uppercase tracking-[0.5em] font-black text-accent-gold mb-6 block">Comparative Theory</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight max-w-2xl mx-auto">Objective Analysis Through Neural Conflict.</h2>
                    </div>

                    <motion.div 
                        className="grid lg:grid-cols-[1fr,auto,1fr] items-stretch gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true }}
                    >
                        <motion.div variants={fadeIn} className="bg-white/5 backdrop-blur-sm p-6 lg:p-7 border border-white/10 flex flex-col justify-between group hover:bg-white/10 transition-colors">
                            <div>
                                <span className="text-[7px] uppercase font-black tracking-[0.4em] text-accent-gold mb-8 block font-sans">Node Alpha</span>
                                <h4 className="text-base md:text-lg lg:text-xl font-serif font-medium italic mb-8 text-white/90 leading-relaxed">
                                    "The synthesis of quantum mechanics and general relativity necessitates a non-Euclidean geometric framework..."
                                </h4>
                            </div>
                            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[9px] uppercase font-bold tracking-widest text-white/40 italic">Logic Variance</span>
                                <span className="text-2xl font-serif font-bold text-accent-gold">8.7</span>
                            </div>
                        </motion.div>

                        <div className="flex lg:flex-col items-center justify-center py-2">
                            <div className="w-px h-10 lg:h-20 bg-accent-gold/30" />
                            <div className="px-6 py-6 flex flex-col items-center">
                                <div className="w-10 h-10 border border-accent-gold/40 flex items-center justify-center rounded-sm bg-midnight shadow-[0_0_20px_rgba(142,121,94,0.15)]">
                                    <Sparkles size={16} className="text-accent-gold" />
                                </div>
                            </div>
                            <div className="w-px h-10 lg:h-20 bg-accent-gold/30" />
                        </div>

                        <motion.div variants={fadeIn} className="bg-white/5 backdrop-blur-sm p-6 lg:p-7 border border-white/10 flex flex-col justify-between group hover:bg-white/10 transition-colors">
                            <div>
                                <span className="text-[7px] uppercase font-black tracking-[0.4em] text-accent-gold mb-8 block font-sans">Node Beta</span>
                                <h4 className="text-base md:text-lg lg:text-xl font-serif font-medium italic mb-8 text-white/90 leading-relaxed">
                                    "Theoretical awareness suggests that emergent properties within high-dimensional manifolds define the observer..."
                                </h4>
                            </div>
                            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[9px] uppercase font-bold tracking-widest text-white/40 italic">Depth Metric</span>
                                <span className="text-2xl font-serif font-bold text-accent-gold">9.3</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Architecture / Bento - Tighter */}
            <section id="features" className="py-24 px-6 bg-sage text-primary-bg border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[9px] uppercase tracking-[0.5em] font-black text-accent-gold mb-8 block">Architecture</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-8">Built for the Discerning Inquirer.</h2>
                            <p className="text-base font-light text-primary-bg/70 leading-relaxed max-w-md mb-10">
                                Our infrastructure is tuned for extreme intellectual precision. Every battle is recorded in our high-profile ledger of collective intelligence.
                            </p>
                            <button className="px-8 py-3.5 border border-accent-gold text-accent-gold text-[9px] font-black uppercase tracking-[0.3em] hover:bg-accent-gold hover:text-white transition-all">
                                Protocol Details
                            </button>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-6">
                            {[
                                { icon: LayoutGrid, title: "Parallel Nodes", desc: "Concurrent execution across neural architectures." },
                                { icon: Shield, title: "Total Integrity", desc: "Verified impartial judging via semantic alignment." },
                                { icon: Zap, title: "Instantaneous", desc: "Global-scale speed with low-latency truth retrieval." },
                                { icon: Brain, title: "Deep Context", desc: "Massive context windows for high-complexity inquiries." }
                            ].map((item, idx) => (
                                <div key={idx} className={`bg-white/[0.03] p-8 border border-white/10 hover:border-accent-gold/40 transition-colors ${idx % 2 !== 0 ? 'sm:mt-4' : ''}`}>
                                    <item.icon className="text-accent-gold mb-6" size={24} strokeWidth={1.5} />
                                    <h3 className="text-lg font-serif font-bold mb-3">{item.title}</h3>
                                    <p className="text-xs font-light text-primary-bg/60 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Monumental - Shorter */}
            <section className="py-32 bg-text-main relative overflow-hidden group">
                 <div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] select-none leading-none scale-100 rotate-3 transition-transform duration-[3s] group-hover:rotate-0"
                    style={{ fontSize: '20vw' }}
                >
                    <span className="font-serif font-black text-white">REIGN</span>
                </div>
                
                <motion.div 
                    className="relative z-10 text-center px-6"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <MessageSquare size={32} className="mx-auto text-accent-gold mb-10 opacity-50" />
                    <h2 className="text-xl md:text-3xl font-serif text-primary-bg/90 italic tracking-tight font-medium max-w-3xl mx-auto leading-relaxed">
                        "The most sophisticated environment to discern which AI truly comprehends a domain. It is a spectacle of pure artificial thought."
                    </h2>
                    <div className="mt-12 flex flex-col items-center">
                        <div className="w-10 h-px bg-accent-gold/30 mb-6" />
                        <span className="text-[9px] uppercase font-black tracking-[0.5em] text-accent-gold">Institute of Global Intelligence</span>
                    </div>
                </motion.div>
            </section>

            {/* Footer - Concise */}
            <footer className="bg-taupe px-6 md:px-10 pt-20 pb-3">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-[2fr,1fr,1fr,1fr] gap-12 mb-2">
                        <div className="max-w-xs">
                            <div className="flex items-center gap-2.5 mb-8">
                                <div className="w-8 h-8 bg-text-main flex items-center justify-center text-primary-bg font-serif font-bold italic text-lg">C</div>
                                <span className="text-xl font-serif font-bold uppercase tracking-tight">Cyber Arena</span>
                            </div>
                            <p className="text-xs text-text-main/70 leading-relaxed font-light">
                                Dedicated to the absolute benchmark of artificial reasoning. Our institution remains the definitive laboratory for autonomous inquiry.
                            </p>
                        </div>
                        <div  className="flex  w-full items-center justify-between">

                        {[
                            { title: "Protocols", links: ["Methodology", "Neural Nodes", "Benchmarks"] },
                            { title: "Institute", links: ["Research", "Archives", "Advisory"] },
                            { title: "Governance", links: ["Privacy", "Terms", "Ethical Code"] }
                        ].map((col, idx) => (
                            <div key={idx} >
                                <h5 className="text-[8px] uppercase font-black tracking-[0.3em] text-accent-gold mb-8">{col.title}</h5>
                                <ul className="space-y-4 text-[9px] font-black text-text-main/60 uppercase tracking-widest">
                                    {col.links.map(link => (
                                        <li key={link}><a href="#" className="hover:text-text-main transition-colors">{link}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        </div>
                    </div>
                    
                    
                </div>
            </footer>
        </div>
    );
};

export default Hero;