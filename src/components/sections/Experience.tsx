"use client"

import { motion } from "framer-motion"

interface ExperienceItem {
    id: number
    period: string
    company: string
    role: string
    location: string
    bullets: string[]
}

const experiences: ExperienceItem[] = [
    {
        id: 1,
        period: "Jan 2025 - Aug 2025",
        company: "Synopsys Inc.",
        role: "Senior Research and Development Engineer",
        location: "Bangalore, India",
        bullets: [
            "Upgraded name-mapping capabilities, improving correlation accuracy by 20% between diverse simulation signals and design signals in more than 10 complex simulation environments",
            "Authored and maintained over 100 comprehensive regression test suites using TCL scripting, ensuring consistent tool performance across 20+ unique scenarios",
            "Orchestrated 3 seamless migrations between VERDI tool versions, coordinating with cross-functional teams to minimize downtime",
            "Served as primary technical point of contact for key customers, resolving critical migration issues within one week",
            "Leveraged GDB (GNU Debugger) to analyse and resolve over 100 complex software defects"
        ]
    },
    {
        id: 2,
        period: "Jul 2022 - Dec 2024",
        company: "Synopsys Inc.",
        role: "Research and Development Engineer",
        location: "Bangalore, India",
        bullets: [
            "Implemented advanced features such as power annotation for the PrimePower tool using C/C++, incorporating algorithms for precise power analysis and optimization in IC designs",
            "Enhanced concurrent and distributed analysis capabilities to improve efficiency in managing large-scale IC designs, resolving customer-reported issues"
        ]
    },
    {
        id: 3,
        period: "Aug 2020 - Feb 2021",
        company: "Aarna Analytics",
        role: "Frontend Developer Intern",
        location: "Texas, USA (Remote)",
        bullets: [
            "Created a custom CRM application using React and Express.js for home chefs to manage inventory and orders",
            "Designed and implemented the webpage for Profitis, an AI-powered prediction engine and assisted in debugging critical code issues within the user authentication module"
        ]
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] as const
        }
    }
}

export default function Experience() {
    return (
        <section id="experience" className="w-full py-24 px-6 lg:px-[60px] bg-background">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="mb-16"
            >
                <h2 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                    Experience
                </h2>
            </motion.div>

            {/* Timeline */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="relative"
            >
                {/* Vertical line for desktop */}
                <div className="absolute left-[140px] top-0 bottom-0 w-px bg-border hidden lg:block" />

                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        variants={itemVariants}
                        className="relative flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 last:mb-0 group"
                    >
                        {/* Date Column */}
                        <div className="lg:w-[140px] flex-shrink-0">
                            <span className="text-sm font-medium text-muted-foreground tracking-wide">
                                {exp.period}
                            </span>
                        </div>

                        {/* Timeline dot for desktop */}
                        <div className="hidden lg:flex absolute left-[140px] top-1 w-3 h-3 -translate-x-1/2 items-center justify-center">
                            <div className="w-3 h-3 rounded-full border-2 border-foreground bg-background group-hover:bg-foreground transition-colors duration-300" />
                        </div>

                        {/* Content Column */}
                        <div className="flex-1 lg:pl-8">
                            <div className="p-6 rounded-lg border border-border/50 bg-card/30 hover:border-border hover:bg-card/50 transition-all duration-300">
                                {/* Company & Role */}
                                <div className="mb-4">
                                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                                        {exp.company}
                                    </h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                        <span className="text-base font-medium text-foreground/80">
                                            {exp.role}
                                        </span>
                                        <span className="hidden sm:inline text-muted-foreground">•</span>
                                        <span className="text-sm text-muted-foreground">
                                            {exp.location}
                                        </span>
                                    </div>
                                </div>

                                {/* Bullet Points */}
                                <ul className="space-y-3">
                                    {exp.bullets.map((bullet, bulletIndex) => (
                                        <li
                                            key={bulletIndex}
                                            className="flex items-start gap-3 text-sm md:text-base text-muted-foreground leading-relaxed"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 mt-2 flex-shrink-0" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
