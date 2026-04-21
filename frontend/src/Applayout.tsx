import { Outlet } from "react-router-dom"
import Sidebar from "./features/chats/components/Sidebar"

const Applayout = () => {
    // We'll use a CSS-only or simple event system, but for now let's just use a top bar
    return (
        <div className="flex h-screen w-full cyber-arena overflow-hidden relative">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 relative">
                {/* Mobile Header (Hidden on Large Screens) */}
                <div className="lg:hidden flex items-center justify-between p-4 absolute top-0 left-0 w-full z-30 bg-[var(--color-primary-bg)]/80 backdrop-blur-md border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-magenta)] flex items-center justify-center">
                            <span className="text-black font-black text-[8px]">CA</span>
                        </div>
                        <span className="text-xs font-black tracking-tighter italic">CYBER ARENA</span>
                    </div>
                </div>
                <Outlet />
            </main>
        </div>
    )
}

export default Applayout
