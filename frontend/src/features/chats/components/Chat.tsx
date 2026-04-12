import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store"
import Answer from "./Answer"
import { useState, useRef, useEffect } from "react"
import useChat from "../hooks/chat.hook"
import { Send, Sparkles } from "lucide-react"

const Chat = () => {
    const { messages, loading, currentChat } = useSelector((state: RootState) => state.chats)
    const [message, setMessage] = useState("")
    const { handleSendMessage } = useChat()
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, loading])

    const onSend = () => {
        if (!message.trim()) return
        handleSendMessage(message, currentChat)
        setMessage("")
    }

    return (
        <div className="flex-1 flex flex-col h-screen bg-[var(--color-primary-bg)] text-[var(--color-text-main)] overflow-hidden">
            {/* Main Chat Area */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto pt-24 pb-32 px-4 md:px-0 custom-scrollbar scroll-smooth"
            >
                <div className="max-w-4xl mx-auto space-y-12">
                    <Answer messages={messages} />
                    
                    {loading && (
                        <div className="space-y-6 animate-pulse px-4">
                            <div className="flex items-center gap-3 text-[var(--color-accent-cyan)] text-[10px] font-black uppercase tracking-widest shadow-[var(--shadow-neon-cyan)] p-2 rounded-lg bg-white/5 w-fit">
                                <Sparkles size={12} className="animate-spin-slow" />
                                Neural Processor Thinking...
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="h-48 glass rounded-2xl animate-shimmer" />
                                <div className="h-48 glass rounded-2xl animate-shimmer" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Input Bar */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[var(--color-primary-bg)] via-[var(--color-primary-bg)]/90 to-transparent">
                <div className="max-w-4xl mx-auto relative group">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && onSend()}
                        className="w-full py-5 px-8 rounded-2xl bg-white/5 border border-white/10 text-lg focus:outline-none focus:border-[var(--color-accent-cyan)] transition-all glass focus:shadow-[var(--shadow-neon-cyan)] pr-20"
                        placeholder="Transmission initialized. Type your query..."
                    />
                    <button
                        onClick={onSend}
                        disabled={loading}
                        className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-[var(--color-accent-cyan)] text-black hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center disabled:opacity-50 disabled:grayscale"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat