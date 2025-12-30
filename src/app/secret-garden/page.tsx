"use client";

import { useState, useEffect } from "react";
import DrawingCanvas from "@/components/DrawingCanvas";

interface Flower {
    id: string;
    imageUrl: string;
    x: number;
    y: number;
    size: number;
    createdAt: number;
}

export default function SecretGardenPage() {
    const [mode, setMode] = useState<"draw" | "garden">("draw");
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [isPlanting, setIsPlanting] = useState(false);

    // Load flowers from localStorage (temporary storage until we set up D1)
    useEffect(() => {
        const stored = localStorage.getItem("secretGardenFlowers");
        if (stored) {
            setFlowers(JSON.parse(stored));
        }
    }, []);

    const handleSaveFlower = async (imageData: string) => {
        setIsPlanting(true);

        // Generate random position
        const x = Math.random() * 80 + 10; // 10-90% of width
        const y = Math.random() * 70 + 20; // 20-90% of height
        const size = Math.random() * 50 + 80; // 80-130px

        const newFlower: Flower = {
            id: Date.now().toString(),
            imageUrl: imageData,
            x,
            y,
            size,
            createdAt: Date.now(),
        };

        const updatedFlowers = [...flowers, newFlower];
        setFlowers(updatedFlowers);
        localStorage.setItem("secretGardenFlowers", JSON.stringify(updatedFlowers));

        // Animate transition to garden
        setTimeout(() => {
            setIsPlanting(false);
            setMode("garden");
        }, 1000);
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Garden Background */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-sky-200 via-green-100 to-green-200"
                style={{
                    backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 60%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 90%, rgba(22, 163, 74, 0.25) 0%, transparent 40%)
          `,
                }}
            />

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
                {mode === "draw" ? (
                    <div className="flex flex-col items-center gap-8">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold text-gray-800 mb-2">Secret Garden 🌿</h1>
                            <p className="text-gray-600">Draw a flower and plant it in our shared garden</p>
                        </div>

                        <DrawingCanvas onSave={handleSaveFlower} />

                        <button
                            onClick={() => setMode("garden")}
                            className="text-gray-600 hover:text-gray-800 underline"
                        >
                            View the garden →
                        </button>
                    </div>
                ) : (
                    <div className="w-full h-screen relative">
                        {/* Header */}
                        <div className="absolute top-8 left-0 right-0 flex justify-between items-center px-8 z-20">
                            <div className="text-center flex-1">
                                <h1 className="text-4xl font-bold text-gray-800">Secret Garden 🌸</h1>
                                <p className="text-gray-600 mt-2">{flowers.length} flowers planted</p>
                            </div>
                            <button
                                onClick={() => setMode("draw")}
                                className="px-6 py-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 font-medium rounded-full shadow-lg transition-all"
                            >
                                + Plant a Flower
                            </button>
                        </div>

                        {/* Garden with Flowers */}
                        <div className="absolute inset-0 pt-32">
                            {flowers.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <p className="text-2xl text-gray-600 mb-4">The garden is empty...</p>
                                        <button
                                            onClick={() => setMode("draw")}
                                            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg"
                                        >
                                            🌱 Plant the First Flower
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                flowers.map((flower, index) => (
                                    <div
                                        key={flower.id}
                                        className="absolute animate-fadeIn"
                                        style={{
                                            left: `${flower.x}%`,
                                            top: `${flower.y}%`,
                                            width: `${flower.size}px`,
                                            height: `${flower.size}px`,
                                            transform: "translate(-50%, -50%)",
                                            animation: `fadeIn 0.8s ease-out ${index * 0.1}s both, sway 3s ease-in-out infinite`,
                                            animationDelay: `${index * 0.1}s, ${Math.random() * 2}s`,
                                        }}
                                    >
                                        <img
                                            src={flower.imageUrl}
                                            alt="Flower"
                                            className="w-full h-full object-contain drop-shadow-lg"
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Planting Animation Overlay */}
                {isPlanting && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="text-center text-white">
                            <div className="text-6xl mb-4 animate-bounce">🌱</div>
                            <p className="text-2xl font-bold">Planting your flower...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS Animations */}
            <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes sway {
          0%,
          100% {
            transform: translate(-50%, -50%) rotate(-2deg);
          }
          50% {
            transform: translate(-50%, -50%) rotate(2deg);
          }
        }
      `}</style>
        </div>
    );
}
