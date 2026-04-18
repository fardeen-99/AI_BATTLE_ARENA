import { useEffect, useState } from "react"
import useChat from "../hooks/chat.hook"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../../../store/store"
import { setCurrentChat } from "../state/chat.slice"
import { Plus, MessageSquare, LogOut, PanelLeftClose, PanelLeftOpen, PanelRightOpen } from "lucide-react"
import useAuth from "../../auth/hooks/auth.hook"

const Sidebar = () => {
    const { chats, currentChat } = useSelector((state: RootState) => state.chats)
    const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024)
    const dispatch = useDispatch()
    const { handleGetChats, handleGetMessages } = useChat()
    const { handlelogout } = useAuth()

    useEffect(() => {
        handleGetChats()
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsCollapsed(true)
            } else {
                setIsCollapsed(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            {/* Mobile Toggle Button - Only visible on mobile when collapsed */}
            {isCollapsed && (
                <button 
                    onClick={() => setIsCollapsed(false)}
                    className="fixed right-2 top-1 z-50 p-3 rounded-xl lg:hidden transition-all hover:scale-105 active:scale-95"
                >
                    <PanelRightOpen size={20} />
                </button>
            )}

            {/* Mobile Overlay */}
            {!isCollapsed && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
                    onClick={() => setIsCollapsed(true)}
                />
            )}

            <div 
                className={`fixed lg:relative z-50 h-screen flex flex-col glass-sidebar transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
                    ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-20 overflow-hidden' : 'translate-x-0 w-72'}`}
            >

            {/* Logo Section */}
            <div className="px-6 p-4 flex items-center justify-between">
                {!isCollapsed && (
                    <div className="flex items-center gap-3">
                        {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-magenta)] flex items-center justify-center shadow-lg">
                            <span className="text-emerald-700 font-black text-xs">A</span>
                        </div> */}
                        <h1 className="text-lg font-bold tracking-tighter text-[var(--color-text-main)] italic">
                            A1. <span className="text-[var(--color-accent-cyan)]">ARENA</span>
                        </h1>
                          
                    </div>
                )}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-white/5 text-[var(--color-text-muted)] transition-colors ml-auto"
                >
                    {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
                </button>
            </div>

            {/* New Chat Button */}
            <div className="px-4 mb-5">
                <button
                
                    onClick={() =>{
                         dispatch(setCurrentChat(null))
                         if (window.innerWidth < 1024) setIsCollapsed(true);
                    }}
                    className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl transition-all duration-300
                        ${isCollapsed ? 'px-0' : 'px-4'}
                        bg-white/5 border border-white/10 hover:border-[var(--color-accent-cyan)] hover:shadow-[var(--shadow-neon-cyan)] group overflow-hidden`}
                >
                    <Plus size={18} className="text-[var(--color-accent-cyan)] group-hover:scale-110 transition-transform" />
                    {!isCollapsed && <span className="text-xs font-bold uppercase tracking-widest">New Chat</span>}
                </button>
            </div>

            {/* Chat History List */}
            <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
                {chats?.map((chat) => (
                    <button
                        key={chat._id}
                        onClick={() => {
                            dispatch(setCurrentChat(chat._id))
                            handleGetMessages(chat._id)
                            if (window.innerWidth < 1024) setIsCollapsed(true);
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
                            ${currentChat === chat._id 
                                ? 'bg-white/10 text-[var(--color-accent-cyan)] border-l-2 border-[var(--color-accent-cyan)]' 
                                : 'text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text-main)] border-l-2 border-transparent hover:border-white/20'}`}
                    >
                        <MessageSquare size={16} className="shrink-0" />
                        {!isCollapsed && (
                            <span className="text-sm font-medium truncate text-left w-full">
                                {chat.title || "Untitled Transmission"}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handlelogout}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-[var(--color-text-muted)] hover:text-red-400 hover:bg-red-400/5 transition-all
                        ${isCollapsed ? 'justify-center' : ''}`}
                >
                    <LogOut size={18} />
                    {!isCollapsed && <span className="text-xs font-bold uppercase tracking-widest">Terminate Session</span>}
                </button>
            </div>
        </div>
        </>
    )
}

export default Sidebar
