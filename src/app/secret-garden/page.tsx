"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Link from "next/link";
import { CanvasRef } from "@/components/Canvas";
import { DrawFlower } from "@/components/DrawFlower";

interface Drawing {
    id: number;
    filename: string;
    image_url: string;
    confidence: number;
    created_at: string;
}

const Flower = ({
    flower,
    position,
    index,
}: {
    flower: Drawing;
    position: { left: string; top: string; scale: number };
    index: number;
}) => {
    const randomDelay = index / 10;

    return (
        <div
            className="absolute transition-all duration-300 ease-out cursor-pointer group bottom-0 md:w-[100px] md:h-[100px] w-[75px] h-[75px]"
            style={{
                left: position.left,
                top: position.top,
                transform: `scale(${position.scale})`,
                transformOrigin: "center",
                objectFit: "cover",
                zIndex: Math.floor(parseFloat(position.top)),
            }}
        >
            <div
                className="animate-growIn"
                style={{
                    animationDelay: `${randomDelay}s`,
                    transform: "scale(0)",
                    transformOrigin: "bottom",
                }}
                onClick={() => console.log(flower.id)}
            >
                <img
                    key={flower.id}
                    src={flower.image_url}
                    alt={`Flower ${flower.id}`}
                    className="group-hover:scale-125 transition-all duration-300 ease-out bottom-0 group-hover:bottom-2"
                />
            </div>
        </div>
    );
};

export default function Garden() {
    const [flowers, setFlowers] = useState<Drawing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [caption] = useState(`Add flowers to our garden?`);
    const [displayedCaption, setDisplayedCaption] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [creatorName, setCreatorName] = useState("");
    const canvasRef = useRef<CanvasRef>(null);

    useEffect(() => {
        fetchFlowers();
    }, []);

    useEffect(() => {
        if (caption === displayedCaption) return;

        setIsTyping(true);

        const typingInterval = setInterval(() => {
            if (currentIndex < caption.length) {
                setDisplayedCaption(caption.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            } else {
                setIsTyping(false);
                // Pause at the end before resetting
                setTimeout(() => {
                    setCurrentIndex(0);
                    setDisplayedCaption("");
                }, 3000);
                clearInterval(typingInterval);
            }
        }, 200);

        return () => clearInterval(typingInterval);
    }, [caption, displayedCaption, currentIndex]);

    const saveDrawing = async () => {
        setIsAnalyzing(true);

        try {
            const exportCanvas = canvasRef.current?.createExportCanvas();
            if (!exportCanvas) return;

            const blob = await new Promise<Blob>((resolve) => {
                exportCanvas.toBlob((blob) => {
                    resolve(blob!);
                }, "image/png");
            });

            const formData = new FormData();
            formData.append("file", blob);
            formData.append("probability", "1.0");
            if (creatorName.trim()) {
                formData.append("creatorName", creatorName.trim());
            }

            const response = await fetch("/api/save-image", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to save flower");
            }

            setCreatorName("");
            await fetchFlowers();

            // Give it a moment to render the new flower before clearing
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            console.error("Error during save:", error);
        } finally {
            setIsAnalyzing(false);
            canvasRef.current?.clearCanvas();
        }
    };

    const generateFlowerPositions = (flowerCount: number) => {
        const positions: Array<{ left: string; top: string; scale: number }> = [];
        const minDistance = 8;

        for (let i = 0; i < flowerCount; i++) {
            let attempts = 0;
            let validPosition = false;
            let newPosition;

            while (!validPosition && attempts < 50) {
                const topPercent = Math.random() * 65;
                let leftPercent;

                if (topPercent < 20) {
                    leftPercent = 10 + Math.random() * 60;
                } else if (topPercent < 60) {
                    leftPercent = 40 + Math.random() * 30;
                } else {
                    leftPercent = 10 + Math.random() * 40;
                }

                const scale = 0.5 + (topPercent / 65) * 0.3;

                newPosition = {
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    scale: scale,
                    leftNum: leftPercent,
                    topNum: topPercent,
                };

                validPosition = positions.every((pos) => {
                    const existingLeft = parseFloat(pos.left);
                    const existingTop = parseFloat(pos.top);
                    const xDistance = Math.abs(leftPercent - existingLeft);
                    const yDistance = Math.abs(topPercent - existingTop);
                    return xDistance >= minDistance || yDistance >= minDistance;
                });

                attempts++;
            }

            if (newPosition) {
                positions.push({
                    left: newPosition.left,
                    top: newPosition.top,
                    scale: newPosition.scale,
                });
            }
        }

        return positions;
    };

    const fetchFlowers = async () => {
        try {
            const { supabase } = await import("@/lib/supabase");

            const { data, error } = await supabase
                .from("public_flowers")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(22);

            if (error) {
                // Ignore specific errors or handle them gracefully
                console.warn("Supabase error:", error);
                throw error;
            }

            setFlowers(data || []);
        } catch (err) {
            console.error("Error fetching flowers:", err);
            // Only set error if it's not a credentials/connection issue to avoid ugly UI on fresh clones
            // setError(err instanceof Error ? err.message : "Failed to fetch flowers");
        } finally {
            setLoading(false);
        }
    };

    const flowerPositions = useMemo(
        () => generateFlowerPositions(flowers.length),
        [flowers.length]
    );

    return (
        <section className="min-h-screen w-full flex flex-col px-6 lg:px-[60px] py-12 bg-white relative">
            {/* Header - Name */}
            <div className="w-full z-10 mb-4">
                <Link
                    href="/"
                    className="text-sm font-medium tracking-widest uppercase text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                    Aiswarya Jayachandran
                </Link>
            </div>

            {/* Page Subtitle - Centered */}
            <div className="w-full text-center mb-8">
                <span className="text-xl font-medium tracking-widest text-zinc-500 lowercase">
                    cause you loved your flower garden
                </span>
            </div>

            {/* Main Content - Garden and Drawing Panel side by side */}
            <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32 w-full max-w-[1400px] mx-auto">

                {/* Left Side - Island */}
                <div className="relative group" id="garden-island-container">
                    <div
                        className="relative"
                        style={{
                            animation: "bob 3s ease-in-out infinite",
                        }}
                    >
                        <img
                            src="/island.png"
                            alt="Garden island"
                            className="w-[300px] lg:w-[550px] max-w-full brightness-100"
                        />

                        {/* Flowers positioned on the island */}
                        {!loading &&
                            !error &&
                            flowers.map((flower, index) => {
                                const position = flowerPositions[flowerPositions.length - index - 1];
                                if (!position) return null;

                                return (
                                    <Flower
                                        key={flower.id}
                                        flower={flower}
                                        position={position}
                                        index={index}
                                    />
                                );
                            })}
                    </div>
                </div>

                {/* Right Side - Drawing Panel */}
                <div>
                    <DrawFlower
                        displayedCaption={displayedCaption}
                        isTyping={isTyping}
                        canvasRef={canvasRef as React.RefObject<CanvasRef>}
                        isAnalyzing={isAnalyzing}
                        saveDrawing={saveDrawing}
                        creatorName={creatorName}
                        onNameChange={setCreatorName}
                    />
                </div>
            </div>

            {/* Gallery link - Fixed bottom right */}
            <a
                href="/secret-garden/gallery"
                className="fixed bottom-8 right-8 py-2 px-6 flex items-center justify-center gap-2 rounded-full text-sm font-medium uppercase tracking-widest border-2 border-zinc-200 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 transition-all hover:scale-105 bg-white/80 backdrop-blur-sm z-50"
            >
                See flower gallery
            </a>

            <style jsx>{`
                @keyframes bob {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}</style>

            {/* Error state */}
            {error && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
                        <p className="font-bold">Error loading garden</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            )}

            {/* Empty state */}
            {!loading && !error && flowers.length === 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="text-center text-muted-foreground">
                        <p className="text-4xl mb-2">🌱</p>
                    </div>
                </div>
            )}
        </section>
    );
}
