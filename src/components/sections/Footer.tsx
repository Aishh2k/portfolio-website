"use client"

import { Mail, Phone } from "lucide-react"

const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/aiswarya-jayachandran/" },
    { name: "GitHub", href: "https://github.com/Aishh2k" },
]

export default function Footer() {
    return (
        <footer id="contact" className="w-full py-20 px-6 md:px-12 bg-background border-t border-border/50 text-foreground">
            <div className="flex flex-col gap-10">
                <h2 className="text-[10vw] leading-[0.8] font-bold uppercase tracking-tighter text-center md:text-left">
                    Let&apos;s work <br /> together
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
                                className="text-sm font-medium uppercase tracking-widest hover:text-muted-foreground transition-colors"
                            >
                                {social.name}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-20 pt-10 border-t border-border/50 text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
                    <span>© 2025 Aiswarya Jayachandran</span>
                    <span>Atlanta, GA</span>
                </div>
            </div>
        </footer>
    )
}
