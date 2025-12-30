"use client"

import { ArrowUpRight } from "lucide-react"

export default function Footer() {
    return (
        <footer className="w-full py-20 px-6 md:px-12 bg-background border-t border-border/50 text-foreground">
            <div className="flex flex-col gap-10">
                <h2 className="text-[10vw] leading-[0.8] font-bold uppercase tracking-tighter text-center md:text-left">
                    Let's work <br /> together
                </h2>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mt-10">
                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Contact</span>
                        <a href="mailto:hello@example.com" className="text-2xl md:text-3xl font-medium hover:underline decoration-1 underline-offset-4">
                            hello@example.com
                        </a>
                    </div>

                    <div className="flex gap-6">
                        {["LinkedIn", "GitHub", "Twitter / X"].map((social) => (
                            <a key={social} href="#" className="text-sm font-medium uppercase tracking-widest hover:text-muted-foreground transition-colors">
                                {social}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-20 pt-10 border-t border-border/50 text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                    <span>© 2025 Portfolio</span>
                    <span>Made by Me</span>
                </div>
            </div>
        </footer>
    )
}
