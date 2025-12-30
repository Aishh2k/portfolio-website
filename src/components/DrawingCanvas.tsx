"use client";

import { useRef, useState, useEffect } from "react";

interface DrawingCanvasProps {
    onSave: (imageData: string) => void;
}

const COLORS = [
    "#FF6B9D", // pink
    "#C44569", // rose
    "#FFA07A", // coral
    "#98D8C8", // mint
    "#6BCB77", // green
    "#4D96FF", // blue
    "#FFD93D", // yellow
    "#A8E6CF", // light green
];

export default function DrawingCanvas({ onSave }: DrawingCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState(COLORS[0]);
    const [lineWidth, setLineWidth] = useState(3);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        canvas.width = 400;
        canvas.height = 400;

        // Fill with white background
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
        const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
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

        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const saveDrawing = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const imageData = canvas.toDataURL("image/png");
        onSave(imageData);
    };

    return (
        <div className="flex flex-col items-center gap-6 p-8 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800">Draw Your Flower 🌸</h2>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="border-4 border-gray-300 rounded-2xl cursor-crosshair touch-none"
                style={{ maxWidth: "100%", height: "auto" }}
            />

            {/* Color Palette */}
            <div className="flex gap-3 flex-wrap justify-center">
                {COLORS.map((c) => (
                    <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-10 h-10 rounded-full border-4 transition-transform hover:scale-110 ${color === c ? "border-gray-800 scale-110" : "border-white"
                            }`}
                        style={{ backgroundColor: c }}
                        aria-label={`Color ${c}`}
                    />
                ))}
            </div>

            {/* Brush Size */}
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Brush Size:</span>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(Number(e.target.value))}
                    className="w-32"
                />
                <span className="text-sm font-medium text-gray-800">{lineWidth}px</span>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
                <button
                    onClick={clearCanvas}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-full transition-colors"
                >
                    Clear
                </button>
                <button
                    onClick={saveDrawing}
                    className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg"
                >
                    🌱 Plant Flower
                </button>
            </div>
        </div>
    );
}
