"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Copy, Share2 } from "lucide-react"

// Wait, I don't see sonner in package.json. I'll stick to simple UI feedback.

export default function BigPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const initialText = searchParams.get("text") || ""
    const [text, setText] = useState(initialText)
    const [isEditing, setIsEditing] = useState(!initialText)

    // Update URL when text changes (debounced?) 
    // Actually, let's keep it simple: Input mode vs Display mode.

    useEffect(() => {
        if (initialText) {
            setText(initialText)
            setIsEditing(false)
        } else {
            setIsEditing(true)
        }
    }, [initialText])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim()) {
            router.push(`/big?text=${encodeURIComponent(text)}`)
            setIsEditing(false)
        }
    }

    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const shareUrl = () => {
        const url = window.location.href
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Dynamic font size calculation could be complex, but let's start with a robust CSS approach using viewport units
    // and a char-count based class.

    return (
        <main className="h-screen w-full bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-10">
            <AnimatePresence mode="wait">
                {isEditing ? (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="w-full max-w-2xl flex flex-col gap-8"
                    >
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <label htmlFor="text-input" className="text-sm font-medium tracking-widest uppercase text-muted-foreground text-center">
                                Type something big
                            </label>
                            <input
                                id="text-input"
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Hello World..."
                                className="w-full bg-transparent border-b-2 border-foreground/20 py-4 text-4xl md:text-6xl font-bold placeholder:text-muted-foreground/30 focus:outline-none focus:border-foreground transition-colors text-center"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!text.trim()}
                                className="mx-auto flex items-center gap-2 px-8 py-3 rounded-full bg-foreground text-background font-medium hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Show it <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="display"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex items-center justify-center relative group"
                    >
                        <h1
                            className="font-bold text-center leading-tight break-words"
                            style={{
                                fontSize: `clamp(2rem, ${150 / Math.max(text.length, 5)}vw, 25vw)`
                            }}
                        >
                            {text}
                        </h1>

                        {/* Controls Overlay */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="p-3 rounded-full bg-background border border-border hover:bg-muted transition-colors"
                                title="Edit"
                            >
                                <span className="text-xs font-bold px-2">EDIT</span>
                            </button>
                            <button
                                onClick={copyToClipboard}
                                className="p-3 rounded-full bg-background border border-border hover:bg-muted transition-colors relative"
                                title="Copy Text"
                            >
                                {copied ? <span className="text-xs font-bold px-1">COPIED</span> : <Copy className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={shareUrl}
                                className="p-3 rounded-full bg-background border border-border hover:bg-muted transition-colors"
                                title="Copy Link"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Simple footer for context */}
            <div className="absolute bottom-4 right-6 text-xs text-muted-foreground opacity-50">
                aiswaryaj.com/big
            </div>
        </main>
    )
}
