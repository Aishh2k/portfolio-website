import { useState } from "react";
import Canvas, { CanvasRef } from "./Canvas";

const colors = [
    "#E74C3C", // petal 1 – bright crimson red
    "#FF8C42", // petal 2 – glowing pumpkin orange
    "#FFD166", // petal 3 – bold golden yellow
    "#FFB3C1", // accent – soft but bright petal pink
    "#3C7A3B", // stem – lively mid-green, not too dark
];

export const DrawFlower = ({
    displayedCaption,
    isTyping,
    canvasRef,
    isAnalyzing,
    saveDrawing,
    creatorName,
    onNameChange,
    orientation = "horizontal",
}: {
    displayedCaption: string;
    isTyping: boolean;
    canvasRef: React.RefObject<CanvasRef>;
    isAnalyzing: boolean;
    saveDrawing: () => void;
    creatorName: string;
    onNameChange: (name: string) => void;
    orientation?: "horizontal" | "vertical";
}) => {
    const [brushColor, setBrushColor] = useState(colors[0]);

    return (
        <div
            className={`z-20 flex flex-col items-center w-64 ${orientation === "horizontal" ? "gap-3" : "gap-6"
                }`}
        >
            {/* Drawing tools row */}
            {/* Caption */}
            <div className={`text-lg text-gray-600 text-center font-medium`}>
                <p>
                    {displayedCaption ?? " "}
                    {isTyping && <span className="animate-pulse">|</span>}
                </p>
            </div>

            <div
                className={`flex relative mb-3 ${orientation === "horizontal" ? "flex-row gap-4" : "flex-col"
                    }`}
            >
                <div
                    className={`flex flex-col gap-2 py-2  ${orientation === "horizontal"
                        ? "absolute left-[-40px] top-0 flex-col"
                        : "flex-row items-center justify-center"
                        }`}
                >
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
                <div
                    className={`flex flex-col items-center gap-2 ${orientation === "horizontal" ? "gap-2" : "gap-6"
                        }`}
                >
                    {/* Canvas */}
                    <Canvas
                        ref={canvasRef}
                        brushColor={brushColor}
                        brushSize={10}
                        className="border-4 border-gray-800 border-dashed rounded cursor-crosshair touch-none"
                    />

                    <div className="flex gap-2 flex-col items-center w-full">
                        {/* Name input (optional) */}
                        <input
                            type="text"
                            value={creatorName}
                            onChange={(e) => onNameChange(e.target.value)}
                            placeholder="Your name (optional)"
                            maxLength={20}
                            className="w-full px-3 py-1 text-sm text-center text-gray-800 border-2 border-gray-300 rounded-full focus:border-green-800 focus:outline-none bg-[#fffff3]"
                        />

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
