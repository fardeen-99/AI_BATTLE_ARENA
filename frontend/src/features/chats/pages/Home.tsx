import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";
import Chat from "../components/Chat";
import useChat from "../hooks/chat.hook";
import { Sparkles, Terminal, Cpu, Zap, ArrowRight, Crosshair, Activity } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Home = () => {
    const [message, setMessage] = useState<string>("");
    const [isEvaluationComplete, setIsEvaluationComplete] = useState(false);
    const { currentChat, messages } = useSelector((state: RootState) => state.chats);
    const { handleSendMessage } = useChat();
    const containerRef = useRef<HTMLDivElement>(null);
    const scoreRef = useRef<HTMLSpanElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const suggestions = [
        { icon: <Zap size={14} />, text: "Initiate Neural Link" },
        { icon: <Terminal size={14} />, text: "Analyze Combat Heuristics" },
        { icon: <Cpu size={14} />, text: "Request Strategic Override" }
    ];

    useGSAP(() => {
        const tlLoad = gsap.timeline({ defaults: { ease: "power4.out" } });

        tlLoad.fromTo(".cyber-hud-boot", 
            { opacity: 0, scale: 1.1, filter: "blur(20px)" },
            { opacity: 1, scale: 1, filter: "blur(0px)", duration: 2, ease: "expo.out" }
        )
        .from(".hud-border-flash", {
            scaleX: 0, opacity: 0, stagger: 0.1, duration: 1.5, ease: "power3.inOut"
        }, "-=1.5");

        tlLoad.fromTo(".ai-alpha",
            { x: "-20vw", opacity: 0, scale: 0.8 },
            { x: "0vw", opacity: 1, scale: 1, duration: 2.5, ease: "expo.out" },
            "-=1.5"
        )
        .fromTo(".ai-beta",
            { x: "20vw", opacity: 0, scale: 0.8 },
            { x: "0vw", opacity: 1, scale: 1, duration: 2.5, ease: "expo.out" },
            "-=2.5"
        );

        gsap.to(".ai-alpha-core", {
            y: "-=20", x: "+=10", rotation: 5, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut"
        });
        gsap.to(".ai-beta-core", {
            y: "+=20", x: "-=10", rotation: -5, duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 0.5
        });

        tlLoad.fromTo(".judge-module",
            { y: 30, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" },
            "-=1.5"
        );

        const scoreState = { val: 0.00 };
        tlLoad.to(scoreState, {
            val: 9.87,
            duration: 2.5,
            ease: "circ.inOut",
            onUpdate: () => {
                if (scoreRef.current) {
                    scoreRef.current.innerText = scoreState.val.toFixed(2);
                }
            }
        }, "-=1")
        // Sequence: Start transition
        .to(".judge-module", {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => setIsEvaluationComplete(true)
        })
        // Popup Input Container immediately after state change
        .fromTo(".input-container",
            { y: 100, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.75)" },
            "+=0.1"
        );

    }, { scope: containerRef });

    if (messages.length > 0) {
        return <Chat />;
    }

    const onSend = (text: string) => {
        if (!text.trim()) return;
        handleSendMessage(text, currentChat);
        setMessage("");
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend(message);
        }
    };

    return (
        <div ref={containerRef} className="flex-1 flex flex-col items-center min-h-[100dvh] bg-[#020202] relative overflow-y-auto lg:overflow-hidden font-sans text-white cyber-arena selection:bg-[var(--color-accent-cyan)] selection:text-black">
            
            {/* Background Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] sm:opacity-[0.05]"
                style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* AI COMBAT BACKGROUND MODULE */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden cyber-hud-boot">
                
                {/* Visual data streams */}
                <div className="absolute left-[5%] sm:left-[10%] top-0 bottom-0 w-px bg-white/5 overflow-hidden">
                    <div className="data-stream w-full h-32 bg-gradient-to-b from-transparent via-[var(--color-accent-cyan)] to-transparent opacity-30 shadow-[0_0_15px_var(--color-accent-cyan)]" />
                </div>
                <div className="absolute right-[5%] sm:right-[10%] top-0 bottom-0 w-px bg-white/5 overflow-hidden">
                    <div className="data-stream w-full h-40 bg-gradient-to-b from-transparent via-[var(--color-accent-magenta)] to-transparent opacity-30 shadow-[0_0_15px_var(--color-accent-magenta)]" />
                </div>

                {/* AI ALPHA (CYAN) */}
                <div className="ai-alpha absolute left-[-10%] sm:left-1/4 top-[40%] sm:top-1/2 -translate-y-1/2 w-48 h-48 lg:w-72 lg:h-72 xl:w-96 xl:h-96 opacity-40 sm:opacity-100">
                    <div className="ai-alpha-aura absolute inset-0 rounded-full bg-[var(--color-accent-cyan)] blur-[80px] lg:blur-[100px] xl:blur-[120px] opacity-20" />
                    <div className="ai-alpha-core absolute inset-4 lg:inset-6 xl:inset-8 border border-[var(--color-accent-cyan)]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Crosshair className="text-[var(--color-accent-cyan)]/30 sm:text-[var(--color-accent-cyan)]/60" size={32} strokeWidth={1} />
                    </div>
                </div>

                {/* AI BETA (MAGENTA) */}
                <div className="ai-beta absolute right-[-10%] sm:right-1/4 top-[60%] sm:top-1/2 -translate-y-1/2 w-48 h-48 lg:w-72 lg:h-72 xl:w-96 xl:h-96 opacity-40 sm:opacity-100">
                    <div className="ai-beta-aura absolute inset-0 rounded-full bg-[var(--color-accent-magenta)] blur-[80px] lg:blur-[100px] xl:blur-[120px] opacity-20" />
                    <div className="ai-beta-core absolute inset-4 lg:inset-6 xl:inset-8 border border-[var(--color-accent-magenta)]/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Activity className="text-[var(--color-accent-magenta)]/30 sm:text-[var(--color-accent-magenta)]/60" size={32} strokeWidth={1} />
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT WRAPPER */}
            <div className="relative z-10 w-full max-w-5xl h-full lg:h-screen flex flex-col px-4 sm:px-8 py-8 lg:py-10 xl:py-12">
                
                {/* Status Header */}
                <header className="w-full hidden  md:flex justify-between items-center mb-8 opacity-80 sm:opacity-100">
                    <div className="hud-border-flash h-[1px] w-8 sm:w-16 bg-[var(--color-accent-cyan)]/30" />
                    <div className="flex items-center gap-2 sm:gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-cyan)] animate-pulse shadow-[0_0_8px_var(--color-accent-cyan)]" />
                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/60">System Ready</span>
                    </div>
                    <div className="hud-border-flash h-[1px] w-8 sm:w-16 bg-[var(--color-accent-magenta)]/30" />
                </header>

                {/* Transition Hub: Stacks scorecard and input */}
                <div className="relative flex-grow flex flex-col items-center justify-center md:justify-end w-full min-h-0">
                    
                    {/* Score/Judge Module - Always centered during evaluation */}
                    {!isEvaluationComplete && (
                        <main className="judge-module absolute inset-0 flex flex-col items-center justify-center p-4 z-20">
                            <div className="relative group max-w-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-cyan)]/10 to-[var(--color-accent-magenta)]/10 blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity duration-1000" />
                                <div className="relative bg-[#0a0a0b]/60 backdrop-blur-3xl px-10 sm:px-12 lg:px-16 py-10 sm:py-8 lg:py-10 border border-white/10 rounded-[2.5rem] sm:rounded-[3rem] flex flex-col items-center shadow-2xl border-t-white/20">
                                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_8px_var(--color-accent-cyan)]" />
                                        <span className="text-[10px] sm:text-[10px] font-black font-mono text-zinc-500 uppercase tracking-[0.5em]">Arena Consensus</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-magenta)] shadow-[0_0_8px_var(--color-accent-magenta)]" />
                                    </div>
                                    <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] tabular-nums italic leading-none">
                                        <span ref={scoreRef}>0.00</span>
                                    </h1>
                                    <div className="flex items-center gap-4 w-full mt-8 sm:mt-8">
                                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                                        <p className="text-[10px] sm:text-[10px] font-mono text-zinc-400 tracking-[0.3em] uppercase whitespace-nowrap">Heuristic Feedback</p>
                                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
                                    </div>
                                </div>
                            </div>
                        </main>
                    )}

                    {/* Input Terminal - Animated by GSAP for total smoothness */}
                    <div className={`input-container w-full max-w-3xl mx-auto space-y-4 lg:space-y-6 group pb-4 lg:pb-2 
                        ${isEvaluationComplete ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-accent-cyan)]/20 via-white/5 to-[var(--color-accent-magenta)]/20 rounded-2xl sm:rounded-3xl blur-md opacity-20 group-focus-within:opacity-100 group-focus-within:blur-lg transition-all" />
                            <div className="relative bg-[#0a0a0b] border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl focus-within:border-[var(--color-accent-cyan)]/40 transition-colors">
                                <div className="flex flex-col sm:flex-row items-center p-2 sm:p-3 gap-2">
                                    <textarea
                                        ref={textareaRef}
                                        rows={1}
                                        value={message}
                                        onChange={handleTextareaChange}
                                        onKeyDown={handleKeyDown}
                                        className="w-full py-4 sm:py-5 px-5 sm:px-7 bg-transparent text-sm lg:text-base xl:text-lg font-sans text-white placeholder-zinc-700 outline-none resize-none transition-all custom-scrollbar max-h-[120px] min-h-[50px] sm:min-h-0"
                                        placeholder="Enter query for neural arbitration..."
                                    />
                                    <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end px-4 sm:px-2 pb-2 sm:pb-0 gap-4">
                                        <div className="flex sm:hidden items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                                            <Sparkles size={12} className="text-[var(--color-accent-cyan)]" /> V3.0-CORE
                                        </div>
                                        <button
                                            onClick={() => onSend(message)}
                                            disabled={!message.trim()}
                                            className="h-10 sm:h-12 xl:h-14 px-6 sm:px-8 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] sm:text-[11px] hover:bg-[var(--color-accent-cyan)] active:scale-95 transition-all rounded-xl sm:rounded-2xl flex items-center gap-3 shadow-lg disabled:opacity-20 disabled:grayscale"
                                        >
                                            Execute
                                            <ArrowRight size={14} className="group-focus-within:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 h-[1.5px] w-px bg-gradient-to-r from-[var(--color-accent-cyan)] via-white to-[var(--color-accent-magenta)] group-focus-within:w-full transition-all duration-1000 ease-out shadow-[0_0_15px_var(--color-accent-cyan)]" />
                            </div>
                        </div>

                        {/* Suggestions */}
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 xl:gap-4 px-4 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
                            {suggestions.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => onSend(item.text)}
                                    className="suggestion-btn shrink-0 flex items-center gap-2 sm:gap-2.5 xl:gap-3 px-4 sm:px-5 xl:px-6 py-2 xl:py-3 border border-white/5 rounded-full text-[9px] lg:text-[9px] xl:text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.2em] xl:tracking-[0.3em] hover:bg-white/5 hover:border-[var(--color-accent-cyan)]/30 backdrop-blur-md transition-all duration-300"
                                >
                                    <span className="text-[var(--color-accent-cyan)] opacity-50">{item.icon}</span>
                                    {item.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};



export default Home;