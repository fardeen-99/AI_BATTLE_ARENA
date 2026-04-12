import { useState, useEffect } from "react"
import { type RegisterForm } from "../../types/auth.types.js"
import { useNavigate, Link } from "react-router-dom"
import useAuth from "../hooks/auth.hook"
import { useSelector } from "react-redux"
import type { RootState } from "../../../store/store.js"

const Register = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [user, navigate])

    const { handleregister } = useAuth()

    const [form, setform] = useState<RegisterForm>({
        username: "",
        email: "",
        password: ""
    })

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setform(prev => ({ ...prev, [name]: value }))
    }

    const submiter = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await handleregister(form)
        setform({
            username: "",
            email: "",
            password: ""
        })
        navigate("/dashboard")
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--color-primary-bg)] px-6 relative">
            {/* Back Button */}
            <div className="absolute top-6 left-6">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-accent-gold)] transition-colors duration-300 group"
                >
                    <span className="text-lg group-hover:-translate-x-1 transition-transform duration-300">←</span>
                    Return
                </Link>
            </div>

            <div className="max-w-md w-full space-y-12">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-[var(--font-serif)] text-[var(--color-text-main)] tracking-tight">
                        Create Your Archive
                    </h1>
                    <p className="text-[var(--color-text-muted)] font-[var(--font-sans)] text-sm tracking-wide uppercase">
                        Join The Sovereign Archive
                    </p>
                </div>

                <form onSubmit={submiter} className="space-y-8">
                    <div className="space-y-6">
                        <div className="group border-b border-[var(--color-border-soft)] focus-within:border-[var(--color-accent-gold)] transition-colors duration-300">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={form.username}
                                name="username"
                                onChange={handlechange}
                                className="w-full py-3 bg-transparent text-[var(--color-text-main)] focus:outline-none font-[var(--font-sans)] text-lg"
                                placeholder="Your Username"
                                required
                            />
                        </div>

                        <div className="group border-b border-[var(--color-border-soft)] focus-within:border-[var(--color-accent-gold)] transition-colors duration-300">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                name="email"
                                onChange={handlechange}
                                className="w-full py-3 bg-transparent text-[var(--color-text-main)] focus:outline-none font-[var(--font-sans)] text-lg"
                                placeholder="email@example.com"
                                required
                            />
                        </div>

                        <div className="group border-b border-[var(--color-border-soft)] focus-within:border-[var(--color-accent-gold)] transition-colors duration-300">
                            <label className="block text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={form.password}
                                name="password"
                                onChange={handlechange}
                                className="w-full py-3 bg-transparent text-[var(--color-text-main)] focus:outline-none font-[var(--font-sans)] text-lg"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-4 space-y-6">
                        <button
                            type="submit"
                            className="w-full py-4 bg-[var(--color-accent-gold)] text-white font-[var(--font-sans)] text-sm uppercase tracking-[0.2em] hover:bg-[#74624b] transition-all duration-300 active:scale-[0.98]"
                        >
                            Create Account
                        </button>

                        <div className="text-center">
                            <Link
                                to="/login"
                                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-gold)] font-[var(--font-sans)] uppercase tracking-widest transition-colors duration-300"
                            >
                                Already have an account? Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
