import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../../store/store"
import Answer from "./Answer"
import { useState, useRef, useEffect } from "react"
import useChat from "../hooks/chat.hook"
import { Send, Share2, Check, Plus } from "lucide-react"
import { setCurrentChat } from "../state/chat.slice"

const Chat = () => {
    const { messages, loading, currentChat, chats } = useSelector((state: RootState) => state.chats)
    const [message, setMessage] = useState("")
    const { handleSendMessage } = useChat()
    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const [isCopied, setIsCopied] = useState(false)
    const dispatch = useDispatch()

    const chatTitle = (() => {
        if (!currentChat) return "New Transmission";
        const found = chats?.find((c: any) => c._id === currentChat);
        return found?.title || "Active Battle";
    })();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, loading])

    const onSend = () => {
        if (!message.trim()) return
        handleSendMessage(message, currentChat)
        setMessage("")
        if (inputRef.current) {
            inputRef.current.style.height = 'auto'
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend()
        }
    }

    const handleCopyShare = () => {
        navigator.clipboard.writeText(window.location.href)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
        e.target.style.height = 'auto'
        e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`
    }

    return (
        <div className="flex-1 flex flex-col h-screen bg-[#0e0e0f] text-[var(--color-text-main)] overflow-hidden relative">
            
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 px-4 md:px-8 py-4 flex items-center justify-between bg-[#0e0e0f]/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <h2 className="text-sm md:text-base font-black uppercase tracking-widest text-white/90 truncate max-w-[150px] md:max-w-md italic">
                        {chatTitle}
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => dispatch(setCurrentChat(null))}
                        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-widest hover:border-[var(--color-accent-cyan)] hover:text-white transition-all"
                    >
                        <Plus size={14} /> New
                    </button>
                    <button
                        onClick={handleCopyShare}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-white/10 text-zinc-400 text-[10px] font-black uppercase tracking-widest hover:border-[var(--color-accent-cyan)] hover:text-white transition-all"
                    >
                        {isCopied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
                        {isCopied ? "Synced" : "Share"}
                    </button>
                </div>
            </div>

            {/* Main Chat Area */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto pt-20 pb-32 px-2 md:px-6 custom-scrollbar scroll-smooth"
            >
                <div className="max-w-5xl mx-auto py-8">
                    <Answer messages={messages} loading={loading}/>
                </div>
            </div>

            {/* Sticky Input Bar */}
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-[#0e0e0f] via-[#0e0e0f]/95 to-transparent z-20">
                <div className="max-w-4xl mx-auto relative">
                    <div className="relative flex flex-col bg-[#1a191b] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl focus-within:border-[var(--color-accent-cyan)]/50 transition-all group overflow-hidden">
                        <textarea
                            ref={inputRef}
                            rows={1}
                            value={message}
                            onChange={handleMessageChange}
                            onKeyDown={handleKeyDown}
                            className="w-full py-4 md:py-5 px-6 md:px-8 bg-transparent text-sm md:text-base outline-none resize-none placeholder-white/20 min-h-[56px] max-h-[200px] overflow-y-auto custom-scrollbar"
                            placeholder="Initialize neural query..."
                        />
                        <div className="flex items-center justify-between px-4 pb-3 md:px-6 md:pb-4">
                            <div className="flex items-center gap-2 opacity-40 group-focus-within:opacity-100 transition-opacity">
                                <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Model: Arena-V3</span>
                            </div>
                            <button
                                onClick={onSend}
                                disabled={loading || !message.trim()}
                                className="p-2 md:p-3 rounded-xl bg-white text-black hover:bg-[var(--color-accent-cyan)] hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center disabled:opacity-20 disabled:grayscale shrink-0"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                        {/* Focus line */}
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[var(--color-accent-cyan)] transition-all duration-700 group-focus-within:w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat

