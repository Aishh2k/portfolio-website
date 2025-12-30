"use client"
import { ReactNode, useEffect, useState } from "react"

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!isClient) return

        // Dynamically import Lenis to avoid SSR issues
        const initLenis = async () => {
            const Lenis = (await import("lenis")).default
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
                touchMultiplier: 2,
            })

            function raf(time: number) {
                lenis.raf(time)
                requestAnimationFrame(raf)
            }
            requestAnimationFrame(raf)

            // Cleanup function
            return () => {
                lenis.destroy()
            }
        }

        let cleanup: (() => void) | undefined
        initLenis().then((cleanupFn) => {
            cleanup = cleanupFn
        })

        return () => {
            if (cleanup) cleanup()
        }
    }, [isClient])

    return <>{children}</>
}
