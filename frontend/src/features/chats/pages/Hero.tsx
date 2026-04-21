import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, Zap, Target, Activity, Cpu, Shield, MoveDown, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// const HEADER_HEIGHT = 80; // px offset so sections land perfectly below the fixed header

const Hero = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const battleRef = useRef<HTMLDivElement>(null);

    // Section refs for smooth scroll navigation
    const heroSectionRef = useRef<HTMLElement>(null);
    const labSectionRef = useRef<HTMLElement>(null);
    const manifestoSectionRef = useRef<HTMLElement>(null);
    const intelligenceSectionRef = useRef<HTMLElement>(null);
    const ctaSectionRef = useRef<HTMLElement>(null);

    // Scroll-based header blur state
    const [isScrolled, setIsScrolled] = useState(false);

    // Nav link → section ref mapping
    const navConfig: Record<string, React.RefObject<HTMLElement | null>> = {
        Platform: heroSectionRef,
        Technology: labSectionRef,
        Archives: manifestoSectionRef,
        Intelligence: intelligenceSectionRef,
        Truth: ctaSectionRef,
    };

    // Smooth scroll handler – scrolls so the section's top aligns right below the header
   const scrollToSection = useCallback((ref: React.RefObject<HTMLElement | null>) => {
    if (!ref?.current) {
        console.log("❌ ref not found");
        return;
    }

    const element = ref.current;

    // 🔥 FORCE SCROLL (better than window.scrollTo)
    element.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });

}, []);

    // Listen for scroll to toggle header blur
    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY || document.documentElement.scrollTop;
            setIsScrolled(scrollPos > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // set initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useGSAP(() => {
        // --- INITIAL REFRESH ---
        // Ensure ScrollTrigger is ready after component mount
        ScrollTrigger.refresh();

        const tlIntro = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

        // Initial Header Entrance
        tlIntro.from('header', { y: -50, opacity: 0 }, 0.2);

        // Massive Background Typography Parallax
        // FIX: Using the hero section as the trigger instead of a fixed div
        gsap.to('.massive-bg-text', {
            y: '-10%',
            scrollTrigger: {
                trigger: '.hero-content-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true
            }
        });

        tlIntro.from('.massive-bg-text', {
            opacity: 0,
            scale: 0.8,
            duration: 2.5,
            ease: "expo.out"
        }, 0.1);

        // Hero Content Staggered Reveal
        tlIntro.from('.hero-main-title', { y: 60, opacity: 0, duration: 1.4 }, 0.6);
        tlIntro.from('.hero-command-box', { scale: 0.9, opacity: 0, duration: 1.2, ease: "back.out(1.5)" }, 0.9);
        tlIntro.from('.hero-main-desc', { y: 30, opacity: 0, duration: 1 }, 1.3);

        // Ambient Light subtle animation
        gsap.to('.amber-light', {
            opacity: 0.4,
            scale: 1.1,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Responsive Reveal Logic (Optimized for performance)
        const revealSections = gsap.utils.toArray('.reveal-section');
        revealSections.forEach((section: any) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: 'expo.out',
            });
        });

    }, { scope: containerRef });

    // Typing Simulation for "Live Battle"
    const [streamA, setStreamA] = useState("");
    const [streamB, setStreamB] = useState("");
    const textA = "The concept of supervenience in philosophy suggests that the mental is dependent on the physical, yet distinct. It is a one-way mapping from the micro-state of neurons to the macro-state of thought.";
    const textB = "Supervenience serves as a bridge for deterministic laws to apply to phenomenology. If two systems are physically identical, they must be mentally identical; there is no change without physical substrate variance.";


    useEffect(() => {
        let idxA = 0;
        let idxB = 0;
        let timer: any;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const step = () => {
                    if (idxA < textA.length) { setStreamA(textA.slice(0, idxA)); idxA += 1; }
                    if (idxB < textB.length) { setStreamB(textB.slice(0, idxB)); idxB += 2; }
                    if (idxA < textA.length || idxB < textB.length) {
                        timer = setTimeout(step, 20);
                    } else {
                        ScrollTrigger.refresh();
                    }
                };
                timer = setTimeout(step, 800);
                observer.disconnect();
            }
        });

        if (battleRef.current) observer.observe(battleRef.current);
        return () => {
            if (timer) clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    const [quest, setQuest] = useState("");

    const handleQuestSend = () => {
        if (!quest.trim()) return;
        navigate('/login');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleQuestSend();
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#020202] font-sans selection:bg-[#F59E0B]/30 selection:text-[#F59E0B] text-[#F9F8F6] overflow-x-hidden antialiased">

            {/* Background Base */}
            <div className="fixed inset-0 bg-[#020202] -z-10" />

            {/* Ambient Grok-style Lighting (Burned Amber) */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="amber-light absolute top-[-20vh] right-[-20vw] w-[80vw] h-[100vh] bg-[radial-gradient(circle_at_center,_#F59E0B_0%,_transparent_70%)] opacity-20 blur-[150px]" />
                <div className="absolute bottom-[-10vh] left-[-10vw] w-[50vw] h-[50vh] bg-[radial-gradient(circle_at_center,_#92400E_0%,_transparent_70%)] opacity-10 blur-[120px]" />
            </div>

            {/* Huge Background Typography - Responsive scale */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 select-none hero-trigger overflow-hidden">
                <span className="massive-bg-text font-black text-[30vw] sm:text-[24vw] leading-none tracking-tighter text-white opacity-[0.03] uppercase">
                    Arena
                </span>
            </div>

            <header
                className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-16 transition-all duration-500 ease-in-out ${
                  isScrolled
  ? 'py-3 sm:py-4 backdrop-blur-xl supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]'
  : 'py-4 sm:py-6 md:py-8 bg-transparent border-transparent'
                }`}
            >
                <nav className="max-w-7xl z-100 mx-auto flex items-center justify-between">
                    <div className="flex items-center justify-between w-full gap-4 md:gap-12">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                            <span className="font-bold text-lg md:text-xl tracking-tight text-white uppercase italic">a1.arena</span>
                        </div>
                        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                            {(['Platform', 'Technology', 'Archives', 'Intelligence', 'Truth'] as const).map(link => (
                                <button
                                    key={link}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(navConfig[link]);
                                        console.log("helll")
                                    }}
                                    className="hover:text-white transition-all transform hover:-translate-y-0.5 cursor-pointer bg-transparent border-none outline-none"
                                >
                                    {link}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => navigate("/login")}
                            className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white border border-white/20 hover:border-white px-5 md:px-8 py-2 md:py-3 rounded-full transition-all hover:bg-white hover:text-black whitespace-nowrap"
                        >
                            Try Arena 3
                        </button>
                    </div>
                </nav>
            </header>

            {/* Hero Section — "Platform" navigates here */}
            <section ref={heroSectionRef} className="hero-content-section relative min-h-[100dvh] flex flex-col items-center justify-center py-20 md:py-40 px-6 z-10">
                <div className="max-w-5xl w-full text-center flex flex-col items-center">

                    <div className="hero-main-title flex flex-col items-center space-y-4 mb-8 md:mb-20">
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-amber-500/80 mb-2 md:mb-4 animate-pulse">Standardized Intelligence Benchmark</span>
                        <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] md:leading-[0.85] text-white italic">
                            Let AI Battle.
                        </h1>
                        <h2 className="text-xl sm:text-2xl md:text-6xl font-light tracking-tight text-zinc-500 italic">
                            You discern the truth.
                        </h2>
                    </div>

                    {/* Grok-style detailed input Command Box */}
                    <div className="hero-command-box relative w-full max-w-3xl group px-0 md:px-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-3xl p-1 md:p-2 shadow-2xl transition-all hover:border-amber-500/30">
                            <textarea
                                rows={2}
                                value={quest}
                                onChange={(e) => setQuest(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="What truth shall we explore today?"
                                className="w-full bg-transparent text-white text-base md:text-xl p-4 md:p-6 outline-none resize-none placeholder-zinc-700 font-light min-h-[100px] md:min-h-0"
                            />
                            <div className="flex items-center justify-between px-4 md:px-6 pb-4 md:pb-6 gap-4">
                                <div className="flex gap-2 md:gap-4 overflow-x-auto no-scrollbar max-w-[70%] sm:max-w-none">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">
                                        <Cpu size={12} />
                                        <span className="hidden xs:inline">Dual-Core</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">
                                        <Activity size={12} />
                                        <span className="hidden xs:inline">Live Judge</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleQuestSend}
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center text-black hover:bg-amber-500 transition-colors shadow-xl shrink-0"
                                >
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="hero-main-desc mt-12 md:mt-16 max-w-xl text-[9px] md:text-sm text-zinc-500 uppercase tracking-[0.2em] font-bold leading-loose px-4">
                        Unveiling Arena 3.0: Our most authoritative evaluation system, architected to differentiate profound reasoning from statistical approximation.
                    </p>
                </div>

                <div className="absolute bottom-12 flex flex-col items-center gap-2 text-zinc-700 opacity-50">
                    <span className="text-[8px] font-black uppercase tracking-[0.5em]">Scroll to Enter Lab</span>
                    <MoveDown size={14} className="animate-bounce" />
                </div>
            </section>

            {/* The Manifesto Section — "Archives" navigates here */}
            <section ref={manifestoSectionRef} className="reveal-section py-20 sm:py-32 md:py-40 min-h-[60vh] md:min-h-[100dvh] px-6 border-y border-white/5 relative z-10 bg-[#020202] flex items-center">
                <div className="max-w-4xl mx-auto text-center">
                    <Quote className="text-amber-500/20 w-10 h-10 md:w-16 md:h-16 mx-auto mb-8 md:mb-12" />
                    <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-serif italic text-white leading-relaxed md:leading-tight mb-8 md:mb-12 px-2">
                        "In an era of generative abundance, the most critical resource is not intelligence, but the ability to verify it."
                    </h2>
                    <div className="flex flex-col items-center">
                        <div className="w-10 md:w-12 h-px bg-amber-500/50 mb-4 md:mb-6" />
                        <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-amber-500">The Arena Manifesto</span>
                    </div>
                </div>
            </section>

            {/* The Lab (Active Battle Preview) — "Technology" navigates here */}
            <section ref={labSectionRef} className="reveal-section py-20 sm:py-32 md:pb-40 md:pt-30 px-4 sm:px-6 relative z-10 min-h-[100dvh] flex flex-col justify-center">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-8 mb-12 md:mb-20">
                        <div className="max-w-xl">
                            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-zinc-500 mb-4 md:mb-6 block">[ LABORATORY SIMULATION ]</span>
                            <h3 className="text-3xl md:text-6xl font-black text-white italic tracking-tighter leading-tight">Superior Reasoning Requires Contrast.</h3>
                        </div>
                        <p className="max-w-xs text-[10px] md:text-xs text-zinc-500 font-bold uppercase tracking-widest leading-loose md:text-right">
                            Observe the neural variance as two disparate models converge on a single complex inquiry.
                        </p>
                    </div>

                    <div ref={battleRef} className="battle-preview-container pt-10 flex flex-col lg:grid lg:grid-cols-2 gap-4 relative">
                        {/* Panel Alpha */}
                        <div className="panel-a bg-[#080808] border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col group hover:border-amber-500/20 transition-all">
                            <div className="flex items-center justify-between mb-6 md:mb-10 pb-4 md:pb-6 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
                                        <Zap size={18} />
                                    </div>
                                    <h5 className="text-xs md:text-sm font-black uppercase tracking-widest">Inference Alpha</h5>
                                </div>
                                <div className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase tracking-widest">92ms / token</div>
                            </div>
                            <p className="text-sm sm:text-base md:text-xl font-light text-zinc-400 leading-relaxed font-serif italic min-h-[80px] md:min-h-[160px]">
                                "{streamA}"
                                <span className="inline-block w-1 h-4 md:w-1.5 md:h-6 bg-amber-500 ml-2 animate-pulse align-middle" />
                            </p>
                            <div className="mt-8 pt-6 md:mt-auto md:pt-10 flex items-center gap-4 md:gap-6">
                                <div className="h-1 bg-white/5 flex-1 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 w-[92%] shadow-[0_0_10px_#f59e0b]" />
                                </div>
                                <span className="text-[8px] md:text-[10px] font-black text-amber-500 whitespace-nowrap">92% Precision</span>
                            </div>
                        </div>

                        {/* Panel Beta */}
                        <div className="panel-b bg-[#080808] border border-white/5 rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col group hover:border-amber-500/20 transition-all">
                            <div className="flex items-center justify-between mb-6 md:mb-10 pb-4 md:pb-6 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
                                        <Cpu size={18} />
                                    </div>
                                    <h5 className="text-xs md:text-sm font-black uppercase tracking-widest">Inference Beta</h5>
                                </div>
                                <div className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase tracking-widest">74ms / token</div>
                            </div>
                            <p className="text-sm sm:text-base md:text-xl font-light text-zinc-400 leading-relaxed font-serif italic min-h-[80px] md:min-h-[160px]">
                                "{streamB}"
                                <span className="inline-block w-1 h-4 md:w-1.5 md:h-6 bg-zinc-700 ml-2 animate-pulse align-middle" />
                            </p>
                            <div className="mt-8 pt-6 md:mt-auto md:pt-10 flex items-center gap-4 md:gap-6">
                                <div className="h-1 bg-white/5 flex-1 rounded-full overflow-hidden">
                                    <div className="h-full bg-zinc-500 w-[84%]" />
                                </div>
                                <span className="text-[8px] md:text-[10px] font-black text-zinc-500 whitespace-nowrap">84% Precision</span>
                            </div>
                        </div>

                        {/* Central VS Verdict Overlay */}
                        <div className="verdict-overlay absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
                            <div className="w-32 h-32 rounded-full bg-black border border-amber-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl group cursor-help transform transition-transform hover:scale-110">
                                <div className="absolute inset-0 bg-amber-500/10 rounded-full animate-ping opacity-20" />
                                <span className="font-black italic text-4xl text-amber-500 tracking-tighter">VS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Intelligence Grid — "Intelligence" navigates here */}
            <section ref={intelligenceSectionRef} className="reveal-section py-20 sm:py-32 md:py-40 px-6 relative z-10 bg-black min-h-[100dvh] flex items-center">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:auto-rows-[300px]">

                        <div className="md:col-span-2 md:row-span-2 bg-[#050505] border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between group hover:border-amber-500/30 transition-all overflow-hidden relative min-h-[400px] md:min-h-0">
                            <div className="relative z-10 max-w-sm">
                                <Shield className="text-amber-500 mb-6 md:mb-8 w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                                <h4 className="text-2xl md:text-3xl font-black text-white italic mb-4 md:mb-6 leading-tight">Autonomous Integrity Mapping</h4>
                                <p className="text-[10px] md:text-sm text-zinc-500 font-bold uppercase tracking-widest leading-loose">
                                    Our Judge-Agent analyzes semantic drift and hallucinatory artifacts across multiple inference cycles to ensure categorical truth.
                                </p>
                            </div>
                            <div className="absolute bottom-[2%] right-[0%] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 select-none hidden md:block">
                                <Shield size={300} />
                            </div>
                        </div>

                        <div className="bg-[#050505] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-end group hover:border-amber-500/20 transition-all min-h-[200px] md:min-h-0">
                            <div className="h-1 w-12 bg-amber-500/30 mb-6 md:mb-8 group-hover:w-full transition-all duration-700" />
                            <h5 className="text-lg md:text-xl font-black text-white italic mb-2 md:mb-4">Neural Variance</h5>
                            <p className="text-[8px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
                                High-fidelity measurement of model divergence on edge-case logic.
                            </p>
                        </div>

                        <div className="bg-[#050505] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col justify-end group hover:border-amber-500/20 transition-all min-h-[200px] md:min-h-0">
                            <Target className="text-zinc-500 mb-6 md:mb-8 group-hover:text-amber-500 transition-colors w-6 h-6 md:w-8 md:h-8" />
                            <h5 className="text-lg md:text-xl font-black text-white italic mb-2 md:mb-4">Binary Scoring</h5>
                            <p className="text-[8px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
                                Objective output scoring with transparent logic logs for every interaction.
                            </p>
                        </div>

                        <div className="md:col-span-2 bg-gradient-to-r from-[#080808] to-transparent border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-8 md:p-10 flex flex-col sm:row items-start sm:items-center justify-between group hover:border-amber-500/10 transition-all gap-6">
                            <div className="max-w-md">
                                <h5 className="text-xl md:text-2xl font-black text-white italic mb-2 md:mb-4">API Agnostic</h5>
                                <p className="text-[8px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
                                    Seamlessly integrate with OpenAI, Anthropic, or proprietary Llama deployments to benchmark locally.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {[1, 2, 3].map(i => <div key={i} className="w-1 h-6 md:h-8 bg-zinc-800 rounded-full" />)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA — "Truth" navigates here */}
            <section ref={ctaSectionRef} className="reveal-section py-24 sm:py-32 md:py-38 px-6 relative z-10 overflow-hidden text-center min-h-[80vh] md:min-h-[100dvh] flex items-center">
                <div className="absolute inset-0 bg-[#F59E0B]/5 blur-[200px] pointer-events-none" />
                <div className="max-w-4xl mx-auto w-full">
                    <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black text-white italic tracking-[1px] mb-8 md:mb-12">
                        Seek The Truth.
                    </h2>
                    <p className="text-[10px] md:text-lg text-zinc-500 uppercase tracking-[0.3em] md:tracking-[0.4em] font-black mb-10 md:mb-16 italic">
                        The Arena waits for your most difficult questions.
                    </p>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="group relative inline-flex items-center justify-center px-10 md:px-16 py-4 md:py-6 font-black text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                    >
                        <span className="relative flex items-center gap-2 md:gap-4">
                            Establish Connection
                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </span>
                    </button>
                    <div className="mt-16 md:mt-20 flex flex-wrap justify-center gap-6 md:gap-12 text-zinc-800 text-[6px] md:text-[8px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">
                        <span>Secure End-to-End</span>
                        <span>Multi-Agent Consensus</span>
                        <span>Version 3.0.42</span>
                    </div>
                </div>
            </section>

            {/* Premium Noir Footer */}
            <footer className="py-7 px-8 md:px-16 border-t border-white/5 z-10 relative bg-[#020202]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:gap-12 gap-5 text-zinc-800">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-lg tracking-tighter uppercase italic text-zinc-500">a1.arena</span>
                    </div>
                    <div className="md:flex gap-10 hidden text-[9px] font-black uppercase tracking-[0.4em]">
                        {['Github', 'LinkedIn', 'Terminal', 'Privacy', 'Legal'].map(col => (
                            <a key={col} href="#" className="hover:text-zinc-400 transition-colors">{col}</a>
                        ))}
                    </div>
                    <p className="text-[9px] whitespace-nowrap font-black uppercase md:tracking-[0.3em] tracking-[0.1em]">
                        &copy; 2026 CYBER ARENA INTELLIGENCE. ALL RIGHTS OBSERVED.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Hero;