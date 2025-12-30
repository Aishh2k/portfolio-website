"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Flower {
    id: string;
    imageUrl: string;
    x: number;
    y: number;
    rotation: number;
    createdAt: number;
}

export default function SecretGardenPage() {
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState<{ x: number; y: number; color: string }[]>([]);
    const [selectedColor, setSelectedColor] = useState("#FF6B6B");
    const [isPlanting, setIsPlanting] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const COLORS = ["#FF6B6B", "#FFA500", "#FFD93D", "#FF69B4", "#6BCB77"];

    // Load flowers
    useEffect(() => {
        const stored = localStorage.getItem("secretGardenFlowers");
        if (stored) {
            setFlowers(JSON.parse(stored));
        }
    }, []);

    // Initialize canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 200;
        canvas.height = 200;
        ctx.fillStyle = "#FFFEF7";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
        const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

        setIsDrawing(true);
        setCurrentPath([{ x, y, color: selectedColor }]);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
        const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (currentPath.length > 0) {
            const lastPoint = currentPath[currentPath.length - 1];
            ctx.beginPath();
            ctx.moveTo(lastPoint.x, lastPoint.y);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        setCurrentPath([...currentPath, { x, y, color: selectedColor }]);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "#FFFEF7";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setCurrentPath([]);
    };

    const plantFlower = () => {
        const canvas = canvasRef.current;
        if (!canvas || currentPath.length === 0) return;

        setIsPlanting(true);

        const imageData = canvas.toDataURL("image/png");
        const newFlower: Flower = {
            id: Date.now().toString(),
            imageUrl: imageData,
            x: Math.random() * 70 + 15,
            y: Math.random() * 60 + 20,
            rotation: Math.random() * 20 - 10,
            createdAt: Date.now(),
        };

        const updatedFlowers = [...flowers, newFlower];
        setFlowers(updatedFlowers);
        localStorage.setItem("secretGardenFlowers", JSON.stringify(updatedFlowers));

        setTimeout(() => {
            setIsPlanting(false);
            clearCanvas();
        }, 1000);
    };

    if (showGallery) {
        return (
            <div className="min-h-screen bg-[#FFFEF7] p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">{flowers.length} TOTAL FLOWERS</h1>
                        <button
                            onClick={() => setShowGallery(false)}
                            className="px-6 py-2 border-2 border-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            ← Back to Garden
                        </button>
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                        {flowers.map((flower) => (
                            <div key={flower.id} className="aspect-square bg-white rounded-lg p-2 shadow-sm">
                                <img src={flower.imageUrl} alt="Flower" className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFEF7] flex items-center justify-center p-4 overflow-hidden">
            <div className="w-full max-w-7xl flex gap-8 items-center justify-center">
                {/* Garden Island */}
                <div className="relative flex-1 h-[600px] flex items-center justify-center">
                    {/* Isometric Island Background */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div
                            className="absolute w-[500px] h-[300px] bg-gradient-to-b from-green-400 to-green-600 rounded-[50%] shadow-2xl"
                            style={{
                                transform: "perspective(600px) rotateX(60deg)",
                            }}
                        />

                        {/* Flowers */}
                        {flowers.map((flower, index) => (
                            <div
                                key={flower.id}
                                className="absolute"
                                style={{
                                    left: `${flower.x}%`,
                                    top: `${flower.y}%`,
                                    width: "80px",
                                    height: "80px",
                                    transform: `translate(-50%, -50%) rotate(${flower.rotation}deg)`,
                                    animation: `float ${3 + (index % 3)}s ease-in-out infinite`,
                                    animationDelay: `${index * 0.2}s`,
                                }}
                            >
                                <img src={flower.imageUrl} alt="Flower" className="w-full h-full object-contain drop-shadow-lg" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Drawing Panel */}
                <div className="w-[280px] flex flex-col gap-4">
                    {/* Color Palette */}
                    <div className="flex gap-2 justify-center">
                        {COLORS.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-10 h-10 rounded-full border-4 transition-all ${selectedColor === color ? "border-gray-800 scale-110" : "border-white"
                                    }`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>

                    {/* Canvas */}
                    <div className="relative">
                        <canvas
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                            className="w-full h-[200px] border-2 border-dashed border-gray-400 rounded-lg cursor-crosshair touch-none bg-[#FFFEF7]"
                        />
                        <button
                            onClick={clearCanvas}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors text-lg"
                            title="Clear"
                        >
                            ↺
                        </button>
                    </div>

                    {/* Plant Button */}
                    <button
                        onClick={plantFlower}
                        disabled={isPlanting || currentPath.length === 0}
                        className="w-full py-3 border-2 border-[#6B8E23] text-[#6B8E23] rounded-full font-medium hover:bg-[#6B8E23] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPlanting ? "Planting..." : "🌱 Plant"}
                    </button>

                    {/* Gallery Button */}
                    <button
                        onClick={() => setShowGallery(true)}
                        className="w-full py-2 text-gray-600 hover:text-gray-800 underline text-sm"
                    >
                        View Gallery ({flowers.length})
                    </button>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0px) rotate(var(--rotation));
          }
          50% {
            transform: translate(-50%, -50%) translateY(-10px) rotate(calc(var(--rotation) + 5deg));
          }
        }
      `}</style>
        </div>
    );
}
