"use client"

import { motion } from "framer-motion"
import { Asterisk } from "lucide-react"

export default function Hero() {
    return (
        <section className="h-screen w-full flex flex-col justify-between py-12 px-6 lg:px-[60px] relative overflow-hidden bg-background">
            {/* Top Bar: Name & Menu */}
            <div className="flex items-center justify-between w-full z-10">
                <div className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    Aiswarya Jayachandran
                </div>
                <div className="text-sm font-medium tracking-widest uppercase text-muted-foreground hidden md:block">
                    Menu
                </div>
            </div>

            {/* Main Typography - Centered Vertically */}
            <div className="flex flex-col z-10 items-center md:items-start w-full absolute top-1/2 left-0 -translate-y-1/2 px-6 lg:px-[60px]">
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-[14vw] lg:text-[120px] leading-[0.85] lg:leading-[120px] font-bold uppercase tracking-tighter text-white"
                >
                    Software
                </motion.h1>
                <motion.h1
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                    className="text-[14vw] lg:text-[120px] leading-[0.85] lg:leading-[120px] font-bold uppercase tracking-tighter text-white ml-0 lg:ml-[40px]"
                >
                    Engineer
                </motion.h1>
            </div>

            {/* Bottom Area */}
            <div className="flex flex-col md:flex-row justify-between items-end w-full z-10 gap-8 relative pb-[60px]">

                {/* Rotating Scroll Indicator (Bottom Left) */}
                <div className="hidden lg:flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 border border-muted-foreground/30 rounded-full flex items-center justify-center relative bg-background"
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
                    <div className="absolute flex items-center justify-center w-full h-full pointer-events-none">
                        <Asterisk className="w-6 h-6 text-foreground" />
                    </div>
                </div>

                {/* Bottom Right: Status & Location */}
                <div className="flex flex-col gap-1 items-end w-full md:w-auto text-right">
                    <div className="flex items-center gap-3 justify-end">
                        <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                            MS CS @ Georgia Tech
                        </span>
                        <div className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wide">
                        Based in Atlanta, GA
                    </div>
                </div>
            </div>
        </section>
    )
}
