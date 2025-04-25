"use client";
import { useRef, useEffect, useState } from "react";

const frameData: [number, number][] = [
  [0, 255],
  [275, 253],
  [548, 228],
  [796, 193],
  [1009, 118],
  [1147, 49],
  [1216, 118],
  [1354, 193],
  [1567, 228],
  [1815, 253],
  [2088, 255],
  [2363, 253],
  [2636, 228],
  [2884, 193],
  [3097, 118],
  [3235, 49],
  [3304, 118],
  [3442, 193],
  [3655, 228],
  [3903, 253],
];

const CoinSpinner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasInitialized = useRef(false);

  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<"Heads" | "Tails" | null>(null);

  const fps = 120;
  const frameHeight = 256;
  const totalFrames = frameData.length;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = "/coin_spritesheet.png";

    let animationFrameId: number;

    const drawFrame = (frameIndex: number) => {
      if (!ctx || !canvas) return;
      const [sourceX, sourceWidth] = frameData[frameIndex];
      canvas.width = sourceWidth;
      canvas.height = frameHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        image,
        sourceX,
        0,
        sourceWidth,
        frameHeight,
        0,
        0,
        sourceWidth,
        frameHeight
      );
    };

    let currentFrame = 0;
    let loopsRemaining = 0;

    const animate = () => {
      drawFrame(currentFrame);
      currentFrame = (currentFrame + 1) % totalFrames;

      if (currentFrame === 0) loopsRemaining--;

      if (loopsRemaining > 0) {
        animationFrameId = requestAnimationFrame(() =>
          setTimeout(animate, 1000 / fps)
        );
      } else {
        const coinResult = Math.random() > 0.5 ? "Heads" : "Tails";
        setResult(coinResult);
        drawFrame(coinResult === "Heads" ? 0 : 10);
        setSpinning(false);
      }
    };

    image.onload = () => {
      if (!hasInitialized.current) {
        drawFrame(0);
        hasInitialized.current = true;
      }

      if (spinning) {
        setResult(null);
        currentFrame = 0;
        loopsRemaining = 10;
        animate();
      }
    };

    return () => cancelAnimationFrame(animationFrameId);
  }, [spinning]);

  const handleFlip = () => {
    if (!spinning) setSpinning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <canvas ref={canvasRef} className="mx-auto" />

      <button
        onClick={handleFlip}
        className={`mt-6 px-6 py-2 rounded-lg font-semibold shadow-md transition-all duration-300
    ${
      spinning
        ? "bg-blue-300 text-white cursor-not-allowed"
        : "bg-gradient-to-r from-indigo-400 to-blue-500 hover:from-indigo-500 hover:to-blue-600 text-white"
    }`}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin the Coin!"}
      </button>

      <div className="mt-4 min-h-[2.5rem] flex items-center justify-center">
        {result && (
          <p className="text-xl font-bold text-gray-700">
            Result: <span className="text-green-600">{result}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default CoinSpinner;
