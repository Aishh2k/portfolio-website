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
        <div className="z-20 flex flex-col items-start gap-4">
            {/* Caption */}
            <div className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                <p>
                    {displayedCaption ?? " "}
                    {isTyping && <span className="animate-pulse">|</span>}
                </p>
            </div>

            {/* Drawing area with color picker */}
            <div className="flex gap-3">
                {/* Color picker - vertical on left */}
                <div className="flex flex-col gap-2 py-2">
                    {colors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setBrushColor(color)}
                            className={`w-6 h-6 rounded-full transition-all hover:scale-110 ${brushColor === color
                                    ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                                    : ""
                                }`}
                            style={{ backgroundColor: color }}
                            title={`Select ${color}`}
                        />
                    ))}
                </div>

                {/* Canvas with undo button */}
                <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                        {/* Canvas */}
                        <Canvas
                            ref={canvasRef}
                            brushColor={brushColor}
                            brushSize={10}
                            className="border-2 border-white/40 rounded-lg cursor-crosshair touch-none bg-[#2a2a2a]"
                        />

                        {/* Clear button */}
                        <button
                            onClick={handleClear}
                            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                            title="Clear canvas"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Name input */}
                    <input
                        type="text"
                        value={creatorName}
                        onChange={(e) => onNameChange(e.target.value)}
                        placeholder="Your name (optional)"
                        maxLength={20}
                        className="w-full px-4 py-2 text-sm text-center text-white border-2 border-white/40 rounded-full focus:border-white/70 focus:outline-none bg-transparent placeholder:text-muted-foreground uppercase tracking-widest"
                    />

                    {/* Plant button */}
                    <button
                        onClick={saveDrawing}
                        disabled={isAnalyzing}
                        className={`py-2 px-6 flex items-center justify-center gap-2 rounded-full cursor-pointer text-sm font-medium uppercase tracking-widest border-2 transition-all hover:scale-105 ${isAnalyzing
                                ? "border-white/20 text-muted-foreground"
                                : "border-white/50 text-white hover:border-white"
                            }`}
                        title="Add plant"
                    >
                        {isAnalyzing ? "🌱 Planting..." : "🌱 Plant"}
                    </button>
                </div>
            </div>
        </div>
    );
};
