import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import Chat from "../components/Chat"
import { useState } from "react"
import useChat from "../hooks/chat.hook"
import { Sparkles, Terminal, Cpu, Zap, ArrowRight } from "lucide-react"

const Home = () => {
    const [message, setMessage] = useState<string>("")
    const { currentChat } = useSelector((state: RootState) => state.chats)
    const { handleSendMessage } = useChat()

    const suggestions = [
        { icon: <Zap size={14} />, text: "Explain black hole paradox" },
        { icon: <Terminal size={14} />, text: "Optimize this algorithm" },
        { icon: <Cpu size={14} />, text: "Debate AI vs Humans" }
    ]

    if (currentChat) {
        return <Chat />
    }

    const onSend = (text: string) => {
        if (!text.trim()) return
        handleSendMessage(text, currentChat)
        setMessage("")
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-[var(--color-primary-bg)] relative overflow-hidden text-[var(--color-text-main)]">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-accent-cyan)] rounded-full blur-[120px] opacity-20 slide-in-top" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-accent-magenta)] rounded-full blur-[120px] opacity-20 slide-in-bottom" />
            </div>

            <div className="max-w-3xl w-full px-6 flex flex-col items-center space-y-12 z-10">
                {/* Hero Section */}
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--color-accent-cyan)] text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
                        <Sparkles size={12} />
                        Neural Interface Active
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic scale-in-center">
                        WELCOME TO <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-magenta)]">
                            CYBER ARENA
                        </span>
                    </h1>
                    <p className="text-[var(--color-text-muted)] text-lg font-medium tracking-tight max-w-lg mx-auto">
                        Your strategic intelligence partner. <br className="hidden md:block" /> 
                        What's on your digital horizon today?
                    </p>
                </div>

                {/* Input Area */}
                <div className="w-full space-y-6">
                    <div className="relative group">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && onSend(message)}
                            className="w-full py-6 px-8 rounded-3xl bg-white/5 border border-white/10 text-xl text-white placeholder-white/20 focus:outline-none focus:border-[var(--color-accent-cyan)] transition-all duration-300 shadow-2xl glass focus:shadow-[var(--shadow-neon-cyan)]"
                            placeholder="Initialize query..."
                        />
                        <button
                            onClick={() => onSend(message)}
                            className="absolute right-3 top-3 bottom-3 px-6 rounded-2xl bg-[var(--color-accent-cyan)] text-black font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2"
                        >
                            Execute
                            <ArrowRight size={14} />
                        </button>
                    </div>

                    {/* Suggestions */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        {suggestions.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => onSend(item.text)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] hover:bg-white/10 hover:border-[var(--color-accent-cyan)]/30 transition-all duration-300 group shadow-sm"
                            >
                                <span className="group-hover:rotate-12 transition-transform">{item.icon}</span>
                                {item.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home