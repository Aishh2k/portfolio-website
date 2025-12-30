"use client"

import { motion } from "framer-motion"
import { Asterisk } from "lucide-react"

export default function Hero() {
    return (
        <section className="h-screen w-full flex flex-col justify-between p-6 md:p-12 md:pb-12 relative overflow-hidden bg-background">
            {/* Top Bar: Name & Menu (Menu placeholder) */}
            <div className="flex items-center justify-between w-full z-10">
                <div className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    Aiswarya Jayachandran
                </div>
                <div className="text-sm font-medium tracking-widest uppercase text-muted-foreground hidden md:block">
                    Menu
                </div>
            </div>

            {/* Main Typography */}
            <div className="flex flex-col z-10 mt-20 md:mt-0 items-center md:items-start w-full">
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-[14vw] md:text-[120px] leading-[0.85] font-bold uppercase tracking-tighter text-white"
                >
                    Frontend
                </motion.h1>
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="text-[14vw] md:text-[120px] leading-[0.85] font-bold uppercase tracking-tighter text-white ml-[0] md:ml-32"
                >
                    Developer
                </motion.h1>
            </div>

            {/* Bottom Area */}
            <div className="flex flex-col md:flex-row justify-between items-end w-full z-10 gap-8 relative">

                {/* Rotating Scroll Indicator (Bottom Left) */}
                <div className="absolute left-0 bottom-0 hidden md:flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 border border-muted-foreground/30 rounded-full flex items-center justify-center relative"
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
                    <Asterisk className="absolute w-6 h-6 text-foreground" />
                </div>

                {/* Bottom Right: Status & Location */}
                <div className="flex flex-col gap-2 items-end w-full md:w-auto">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                            Open to work
                        </span>
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wide text-right">
                        Based in France
                    </div>
                </div>
            </div>
        </section>
    )
}
