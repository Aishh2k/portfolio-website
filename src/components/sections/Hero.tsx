"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export default function Hero() {
    return (
        <section className="h-screen w-full flex flex-col justify-between p-6 md:p-12 md:pb-6 relative overflow-hidden bg-background">
            {/* Top Bar: Status */}
            <div className="flex items-center justify-between w-full z-10">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </div>
                    <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                        Open to work
                    </span>
                </div>
                <div className="text-sm font-medium tracking-widest uppercase text-muted-foreground hidden md:block">
                    Portfolio 2025
                </div>
            </div>

            {/* Main Typography */}
            <div className="flex flex-col z-10 mt-20 md:mt-0">
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-[13vw] md:text-[11vw] leading-[0.85] font-bold uppercase tracking-tighter text-foreground"
                >
                    Frontend
                </motion.h1>
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="text-[13vw] md:text-[11vw] leading-[0.85] font-bold uppercase tracking-tighter text-foreground ml-[5vw] text-outline"
                >
                    Developer
                </motion.h1>
            </div>

            {/* Bottom Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full z-10 gap-8">
                <div className="text-sm md:text-base max-w-xs text-muted-foreground uppercase tracking-wide">
                    Based in France<br />
                    Specialized in React & Next.js
                </div>

                {/* Rotating Scroll Indicator */}
                <div className="relative flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 md:w-32 md:h-32 border border-muted-foreground/20 rounded-full flex items-center justify-center relative"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 text-muted-foreground">
                            <defs>
                                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                            </defs>
                            <text fontSize="11.5" fontWeight="bold" letterSpacing="2" fill="currentColor">
                                <textPath href="#circlePath" startOffset="0%">
                                    SCROLL DOWN - SCROLL DOWN -
                                </textPath>
                            </text>
                        </svg>
                    </motion.div>
                    <ArrowDown className="absolute w-6 h-6 text-foreground" />
                </div>
            </div>

            {/* Background Gradient / Grain (Optional) */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/20 via-background to-background z-0" />
        </section>
    )
}
