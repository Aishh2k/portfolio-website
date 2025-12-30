"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(true) // Default to true to prevent flash

    const mouseX = useMotionValue(-100)
    const mouseY = useMotionValue(-100)

    // Smooth springs for the outer circle (follower)
    const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
    const followerX = useSpring(mouseX, springConfig)
    const followerY = useSpring(mouseY, springConfig)

    // Detect touch device on mount
    useEffect(() => {
        const checkTouchDevice = () => {
            setIsTouchDevice(
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0
            )
        }
        checkTouchDevice()
    }, [])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
        setIsVisible(true)
    }, [mouseX, mouseY])

    const handleMouseLeave = useCallback(() => {
        setIsVisible(false)
    }, [])

    const handleMouseEnter = useCallback(() => {
        setIsVisible(true)
    }, [])

    useEffect(() => {
        if (isTouchDevice) return

        window.addEventListener('mousemove', handleMouseMove)
        document.documentElement.addEventListener('mouseleave', handleMouseLeave)
        document.documentElement.addEventListener('mouseenter', handleMouseEnter)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
        }
    }, [isTouchDevice, handleMouseMove, handleMouseLeave, handleMouseEnter])

    // Handle hover state for interactive elements
    useEffect(() => {
        if (isTouchDevice) return

        const handleHoverStart = () => setIsHovering(true)
        const handleHoverEnd = () => setIsHovering(false)

        // Use MutationObserver to handle dynamically added elements
        const addListenersToElement = (el: Element) => {
            el.addEventListener('mouseenter', handleHoverStart)
            el.addEventListener('mouseleave', handleHoverEnd)
        }

        const removeListenersFromElement = (el: Element) => {
            el.removeEventListener('mouseenter', handleHoverStart)
            el.removeEventListener('mouseleave', handleHoverEnd)
        }

        const setupListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
            interactiveElements.forEach(addListenersToElement)
            return interactiveElements
        }

        // Initial setup
        const elements = setupListeners()

        // Observer for dynamically added elements
        const observer = new MutationObserver(() => {
            const newElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
            newElements.forEach(addListenersToElement)
        })

        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            elements.forEach(removeListenersFromElement)
            observer.disconnect()
        }
    }, [isTouchDevice])

    // Don't render on touch devices
    if (isTouchDevice) {
        return null
    }

    return (
        <>
            {/* Inner dot - follows mouse exactly */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isHovering ? 0.5 : 1,
                }}
                transition={{ duration: 0.15 }}
            />

            {/* Outer circle - follows with spring delay */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border border-white/60 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: followerX,
                    y: followerY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    )
}
