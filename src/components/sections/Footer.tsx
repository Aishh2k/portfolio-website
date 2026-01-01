"use client"

import { Heart, Mail, Phone } from "lucide-react"

const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/aiswarya-jayachandran/" },
    { name: "GitHub", href: "https://github.com/Aishh2k" },
    { name: "Resume", href: "/Aiswarya-Jayachandran-Resume.pdf", download: true },
]

export default function Footer() {
    return (
        <footer id="contact" className="w-full py-20 px-6 md:px-12 bg-background border-t border-border/50 text-foreground">
            <div className="flex flex-col gap-10">
                <h2 className="text-[12vw] lg:text-[100px] leading-[0.85] lg:leading-[100px] font-bold uppercase tracking-tighter text-center md:text-left">
                    Let&apos;s work <br />together
                </h2>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mt-10">
                    <div className="flex flex-col gap-4">
                        <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Contact</span>

                        {/* Email */}
                        <a
                            href="mailto:ajayacha3@gatech.edu"
                            className="flex items-center gap-3 text-xl md:text-2xl font-medium hover:text-muted-foreground transition-colors group"
                        >
                            <Mail className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                            ajayacha3@gatech.edu
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:+14046641908"
                            className="flex items-center gap-3 text-lg md:text-xl font-medium hover:text-muted-foreground transition-colors group"
                        >
                            <Phone className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                            +1 (404) 664-1908
                        </a>
                    </div>

                    <div className="flex gap-6">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={social.download}
                                className="text-sm font-medium uppercase tracking-widest hover:text-muted-foreground transition-colors"
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center items-center mt-20 pt-10 border-t border-border/50 text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                    {/* For my grandmom with arrow pointing to red dot */}
                    <div className="flex items-center gap-2">
                        {/* Hand-drawn arrow and text */}
                        <div className="flex items-center gap-1 text-muted-foreground/70">
                            <span className="text-xs italic font-normal normal-case tracking-normal">for my grandma</span>
                            {/* Hand-drawn curved arrow SVG */}
                            <svg
                                width="40"
                                height="20"
                                viewBox="0 0 40 20"
                                fill="none"
                                className="text-muted-foreground/70"
                            >
                                <path
                                    d="M2 12C8 4 20 2 32 8"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    fill="none"
                                    style={{ strokeDasharray: "none" }}
                                />
                                {/* Arrow head */}
                                <path
                                    d="M28 4L32 8L27 11"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                />
                            </svg>
                        </div>

                        {/* Red pulsing dot */}
                        <a
                            href="/secret-garden"
                            className="relative flex h-5 w-5 group items-center justify-center p-0.5"
                            title="Secret Garden"
                        >
                            <Heart className="animate-ping absolute h-full w-full text-red-400 opacity-75" fill="currentColor" strokeWidth={0} />
                            <Heart className="relative h-full w-full text-red-500 group-hover:text-red-400 transition-colors" fill="currentColor" strokeWidth={0} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
