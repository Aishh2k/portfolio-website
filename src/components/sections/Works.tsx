"use client"

import { useState, useEffect } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"
import Image from "next/image"

/* Dummy Data */
const projects = [
    {
        id: 1,
        title: "KIA EV9",
        category: "Development",
        year: "2024",
        img: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "CASINO",
        category: "Design & Dev",
        year: "2023",
        img: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "NFT FEST",
        category: "Web3",
        year: "2023",
        img: "https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "AGENCY X",
        category: "Concept",
        year: "2022",
        img: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1000&auto=format&fit=crop",
    },
]

export default function Works() {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null)

    // Mouse position state
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth spring animation for the cursor follower
    const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
    const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    return (
        <section id="works" className="w-full pb-32 px-6 md:px-12 bg-background relative z-20">
            <div className="flex flex-col mb-12 mt-20">
                <h2 className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
                    Selected Works
                </h2>
            </div>

            <div className="flex flex-col border-t border-white/10">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-12 md:py-16 border-b border-white/10 transition-colors cursor-pointer"
                        onMouseEnter={() => setHoveredProject(project.id)}
                        onMouseLeave={() => setHoveredProject(null)}
                    >
                        <div className="flex flex-col gap-2 relative z-10 transition-transform duration-500 ease-out group-hover:translate-x-4">
                            <h3 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white group-hover:text-muted-foreground transition-colors">
                                {project.title}
                            </h3>
                            <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                                {project.category}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 mt-4 md:mt-0 relative z-10 transition-transform duration-500 ease-out group-hover:-translate-x-4">
                            <span className="text-sm font-medium text-white/50">
                                {project.year}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Image Preview */}
            <motion.div
                className="fixed top-0 left-0 w-[400px] h-[300px] rounded-lg overflow-hidden pointer-events-none z-50 hidden md:block"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: hoveredProject ? 1 : 0,
                    scale: hoveredProject ? 1 : 0.8,
                }}
                transition={{ duration: 0.2 }}
            >
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className={`absolute inset-0 w-full h-full bg-neutral-900 transition-opacity duration-300 ${hoveredProject === project.id ? "opacity-100" : "opacity-0"}`}
                    >
                        <Image
                            src={project.img}
                            alt={project.title}
                            fill
                            className="object-cover opacity-80"
                        />
                    </div>
                ))}
            </motion.div>
        </section>
    )
}
