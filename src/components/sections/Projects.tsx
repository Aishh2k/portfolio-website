"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface Project {
    id: number
    title: string
    category: string
    year: string
    description: string
}

const projects: Project[] = [
    {
        id: 1,
        title: "INTERACTIVE NATURAL HAZARD RISK ASSESSMENT DASHBOARD",
        category: "Data Analytics",
        year: "2025",
        description: "Built an interactive geospatial dashboard to analyze U.S. natural hazard risks by integrating NOAA climate data and FEMA National Risk Index. Features ML regression models for predicting fatalities and economic loss, with SHAP-based feature attribution for risk-driver analysis.",
    },
    {
        id: 2,
        title: "HEAT DIFFUSION SIMULATOR GRAPHICAL USER INTERFACE",
        category: "Simulation",
        year: "2025",
        description: "Developed a real-time 2D heat diffusion simulation and visualization tool using React, TypeScript, and HTML5 Canvas. Includes region/material editor with drawing tools for multi-material diffusion scenarios and configurable boundary conditions.",
    },
    {
        id: 3,
        title: "AGRICULTURE CHAIN DECENTRALIZED APPLICATION WITH MICRO-FINANCE",
        category: "Blockchain",
        year: "2022",
        description: "Developed a decentralized application for agricultural supply chain management with integrated micro-finance capabilities. Enables transparent tracking of produce from farm to consumer while providing farmers access to micro-loans.",
    },
    {
        id: 4,
        title: "CUSTOM CRM APPLICATION FOR HOME CHEFS",
        category: "Full Stack",
        year: "2021",
        description: "Created a custom CRM application using React and Express.js for home chefs to manage inventory and orders. Features intuitive order management workflows and real-time inventory tracking.",
    },
]

export default function Projects() {
    const [expandedProject, setExpandedProject] = useState<number | null>(null)

    const toggleProject = (id: number) => {
        setExpandedProject(expandedProject === id ? null : id)
    }

    return (
        <section id="projects" className="w-full py-24 px-6 lg:px-[60px] bg-background relative z-20">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h2 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    Projects
                </h2>
            </motion.div>

            {/* Project List */}
            <div className="flex flex-col border-t border-white/20">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="border-b border-white/20"
                    >
                        {/* Project Header - Clickable */}
                        <div
                            className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-[35px] md:py-[45px] cursor-pointer"
                            onClick={() => toggleProject(project.id)}
                        >
                            {/* Left: Title and Category */}
                            <div className="flex flex-col gap-2 relative z-10 transition-transform duration-500 ease-out group-hover:translate-x-4 pr-4">
                                <h3 className="text-2xl md:text-3xl lg:text-[40px] font-bold uppercase tracking-tighter text-white group-hover:text-muted-foreground transition-colors duration-300 leading-tight">
                                    {project.title}
                                </h3>
                                <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                                    {project.category}
                                </span>
                            </div>

                            {/* Right: Year and Expand Icon */}
                            <div className="flex items-center gap-4 mt-4 md:mt-0 relative z-10 transition-transform duration-500 ease-out group-hover:-translate-x-4">
                                <span className="text-sm font-medium text-white/50">
                                    {project.year}
                                </span>
                                <motion.div
                                    animate={{ rotate: expandedProject === project.id ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Expandable Description */}
                        <AnimatePresence>
                            {expandedProject === project.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-8 pl-0 md:pl-4 pr-4 md:pr-20">
                                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl">
                                            {project.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
