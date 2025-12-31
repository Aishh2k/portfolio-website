import { useState } from "react";
import Canvas, { CanvasRef } from "./Canvas";
import { RotateCcw } from "lucide-react";

const colors = [
    "#E74C3C", // petal 1 – bright crimson red
    "#FF8C42", // petal 2 – glowing pumpkin orange
    "#FFD166", // petal 3 – bold golden yellow
    "#FFB3C1", // accent – soft but bright petal pink
    "#3C7A3B", // stem – lively mid-green
];

export const DrawFlower = ({
    displayedCaption,
    isTyping,
    canvasRef,
    isAnalyzing,
    saveDrawing,
    creatorName,
    onNameChange,
}: {
    displayedCaption: string;
    isTyping: boolean;
    canvasRef: React.RefObject<CanvasRef>;
    isAnalyzing: boolean;
    saveDrawing: () => void;
    creatorName: string;
    onNameChange: (name: string) => void;
}) => {
    const [brushColor, setBrushColor] = useState(colors[0]);

    const handleClear = () => {
        canvasRef.current?.clearCanvas();
    };

    return (
        <div className="z-20 flex flex-col items-center gap-4">
            {/* Caption */}
            <div className="text-sm font-medium tracking-widest uppercase text-zinc-500 text-center">
                <p>
                    {displayedCaption ?? " "}
                    {isTyping && <span className="animate-pulse">|</span>}
                </p>
            </div>

            {/* Drawing area with color picker */}
            <div className="flex relative mb-3 flex-row gap-4">
                {/* Color picker - vertical on left */}
                <div className="flex flex-col gap-2 py-2 absolute left-[-40px] top-0">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setBrushColor(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${brushColor === color
                                ? "border-gray-800 shadow-lg scale-110"
                                : "border-gray-300"
                                }`}
                            style={{ backgroundColor: color }}
                            title={`Select ${color}`}
                        />
                    ))}
                </div>

                {/* Canvas container */}
                <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                        <Canvas
                            ref={canvasRef}
                            brushColor={brushColor}
                            brushSize={10}
                            className="border-4 border-gray-800 border-dashed rounded cursor-crosshair touch-none bg-white"
                        />
                    </div>

                    {/* Name input */}
                    <input
                        type="text"
                        value={creatorName}
                        onChange={(e) => onNameChange(e.target.value)}
                        placeholder="Your name (optional)"
                        maxLength={20}
                        className="w-full px-4 py-2 text-sm text-center text-zinc-800 border-2 border-zinc-200 rounded-full focus:border-zinc-400 focus:outline-none bg-transparent placeholder:text-zinc-400 uppercase tracking-widest"
                    />

                    {/* Plant button */}
                    <div className="flex gap-2 flex-col items-center">
                        <button
                            onClick={saveDrawing}
                            disabled={isAnalyzing}
                            className={`py-1 px-2 flex items-center justify-center rounded-full cursor-pointer text-lg border border-green-800 shadow-md hover:scale-110 ${isAnalyzing ? "text-gray-400" : "text-green-800"
                                }`}
                            title="Add plant"
                        >
                            {isAnalyzing ? "🌱 Planting..." : "🌱 Plant"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
