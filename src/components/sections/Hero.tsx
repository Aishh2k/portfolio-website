"use client"

import { motion } from "framer-motion"
import { Asterisk } from "lucide-react"

export default function Hero() {
    const navLinks = [
        { name: "Experience", href: "#experience" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ]

    return (
        <section id="hero" className="h-screen w-full flex flex-col justify-between py-12 px-6 lg:px-[60px] relative overflow-hidden bg-background">
            {/* Top Bar: Name & Menu */}
            <div className="flex items-center justify-between w-full z-10">
                <a
                    href="/Aiswarya-Jayachandran-Resume.pdf"
                    download
                    className="text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                    Aiswarya Jayachandran
                </a>
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
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
            <div className="flex flex-col md:flex-row justify-between items-end w-full z-10 gap-8 relative pb-3">

                {/* Scroll Text (Bottom Left) */}
                <div className="flex flex-col gap-1 items-start">
                    <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                        Scroll
                    </span>
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
