import { Cpu, User, ShieldAlert, BarChart3, Info, Sparkles } from "lucide-react"
import { MarkdownRenderer } from "./MarkdownRenderer"

interface messagesType {
    messages: {
        problem: string,
        solution_1: string,
        solution_2: string,
        AI_judgement: {
            solution_1_score: number,
            solution_2_score: number,
            solution_1_reason: string,
            solution_2_reason: string,
        }
        _id: string
    }[]
}

interface loadingType {
    loading: boolean
}

const Answer = ({ messages,loading }: messagesType & loadingType) => {
    return (
        <div className="space-y-16">


            {messages?.map((message, index) => (
                <div key={message._id || index} className="space-y-8 animate-fade-in px-4">
                    {/* User Query Section */}
                    <div className="flex justify-end pr-2">
                        <div className="max-w-[90%] md:max-w-[80%] bg-[var(--color-secondary-bg)] border border-white/10 p-5 rounded-2xl rounded-tr-none shadow-xl relative group">
                            <div className="flex items-center gap-3 mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent-cyan)] opacity-70">
                                <User size={12} />
                                Master Input
                            </div>
                            <p className="text-sm font-medium  text-center leading-relaxed">{message.problem}</p>
                            <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-accent-cyan)] shadow-[var(--shadow-neon-cyan)] -translate-y-1/2 translate-x-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>



                    {message.solution_1 || !loading ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
                                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
                                    <Cpu size={12} className="text-[var(--color-accent-magenta)]" />
                                    Dual-Agent Analysis
                                </div>
                                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Agent Alpha */}
                                <div className="glass group hover:border-[var(--color-accent-cyan)]/30 transition-all duration-500 overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--color-accent-cyan)] to-transparent opacity-50" />
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-accent-cyan)]">Agent Alpha</h3>
                                            <ShieldAlert size={14} className="text-white/20 group-hover:text-[var(--color-accent-cyan)] transition-colors" />
                                        </div>
                                        <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar text-sm leading-relaxed text-[var(--color-text-main)]/90">
                                            <MarkdownRenderer content={message.solution_1} />
                                        </div>
                                    </div>
                                </div>

                                {/* Agent Beta */}
                                <div className="glass group hover:border-[var(--color-accent-magenta)]/30 transition-all duration-500 overflow-hidden relative">
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--color-accent-magenta)] to-transparent opacity-50" />
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--color-accent-magenta)]">Agent Beta</h3>
                                            <Cpu size={14} className="text-white/20 group-hover:text-[var(--color-accent-magenta)] transition-colors" />
                                        </div>
                                        <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar text-sm leading-relaxed text-[var(--color-text-main)]/90">
                                            <MarkdownRenderer content={message.solution_2} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {message.AI_judgement && (
                                <div className="grid grid-cols-1 gap-6 pb-10">
                                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3 relative group overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <Info size={48} />
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                                            <Info size={12} />
                                            Neural Arbiter Verdict
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="relative p-3 rounded-xl bg-black/20 border border-white/5">
                                                <p className="text-[8px] font-black uppercase tracking-widest text-[var(--color-accent-cyan)] mb-1">Alpha Logic</p>
                                                <p className="text-[11px] leading-relaxed italic text-[var(--color-text-muted)]">{message.AI_judgement.solution_1_reason}</p>
                                                <div className="flex items-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                                                    <BarChart3 size={12} />
                                                    Dominance Score
                                                </div>
                                                <div className="space-y-1.5">
                                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                                                        <span>Alpha</span>
                                                        <span className="text-[var(--color-accent-cyan)]">{message.AI_judgement.solution_1_score}%</span>
                                                    </div>
                                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-[var(--color-accent-cyan)] shadow-[var(--shadow-neon-cyan)] transition-all duration-1000 ease-out"
                                                            style={{ width: `${message.AI_judgement.solution_1_score*10}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                                                <p className="text-[8px] font-black uppercase tracking-widest text-[var(--color-accent-magenta)] mb-1">Beta Logic</p>
                                                <p className="text-[11px] leading-relaxed italic text-[var(--color-text-muted)]">{message.AI_judgement.solution_2_reason}</p>
                                                <div className="flex items-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest text-[var(--color-text-muted)]">
                                                    <BarChart3 size={12} />
                                                    Dominance Score
                                                </div>
                                                <div className="space-y-1.5">
                                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                                                        <span>Beta</span>
                                                        <span className="text-[var(--color-accent-magenta)]">{message.AI_judgement.solution_2_score}%</span>
                                                    </div>
                                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full bg-[var(--color-accent-magenta)] shadow-[var(--shadow-neon-magenta)] transition-all duration-1000 ease-out"
                                                            style={{ width: `${message.AI_judgement.solution_2_score*10}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6 animate-pulse px-4">
                            <div className="flex items-center gap-3 text-[var(--color-accent-cyan)] text-[10px] font-black uppercase tracking-widest shadow-[var(--shadow-neon-cyan)] p-2 rounded-lg bg-white/5 w-fit">
                                <Sparkles size={12} className="animate-spin-slow" />
                                Neural Processor Thinking...
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
                                <div className="h-48 glass rounded-2xl animate-shimmer" />
                                <div className="h-48 glass rounded-2xl animate-shimmer" />
                            </div>
                        </div>
                    )}
                    
                </div>
            ))}
        </div>
    )
}

export default Answer

