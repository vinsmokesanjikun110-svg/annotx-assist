import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Rect, PencilBrush, FabricImage } from "fabric";
import { toast } from "sonner";
import { useCallback } from "react";

interface AnnotationCanvasProps {
  imagePath: string;
  selectedTool: string;
  brushSize: number;
  aiAssistActive: boolean;
  onAiSuggestion?: () => void;
}

export const AnnotationCanvas = ({ 
  imagePath, 
  selectedTool, 
  brushSize,
  aiAssistActive,
  onAiSuggestion
}: AnnotationCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  const [isReady, setIsReady] = useState(false);
  const aiProcessedRef = useRef(false);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 800,
      backgroundColor: "transparent",
    });

    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = "rgba(0, 255, 255, 0.5)";
    canvas.freeDrawingBrush.width = brushSize;

    fabricCanvasRef.current = canvas;
    setIsReady(true);

    return () => {
      canvas.dispose();
    };
  }, []);

  // Load image
  useEffect(() => {
    if (!fabricCanvasRef.current || !isReady) return;

    const canvas = fabricCanvasRef.current;
    canvas.clear();

    FabricImage.fromURL(imagePath, { crossOrigin: "anonymous" }).then((img) => {
      const scale = Math.min(800 / (img.width || 1), 800 / (img.height || 1));
      img.set({
        scaleX: scale,
        scaleY: scale,
        left: (800 - (img.width || 0) * scale) / 2,
        top: (800 - (img.height || 0) * scale) / 2,
        selectable: false,
        evented: false,
      });
      
      canvas.backgroundImage = img;
      canvas.renderAll();
    });
  }, [imagePath, isReady]);

  // Update tool
  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;

    canvas.isDrawingMode = selectedTool === "brush";
    canvas.selection = selectedTool === "hand";

    if (selectedTool === "brush" && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = "rgba(0, 255, 255, 0.5)";
      canvas.freeDrawingBrush.width = brushSize;
    }

    if (selectedTool === "eraser" && canvas.freeDrawingBrush) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = "rgba(0, 0, 0, 1)";
      canvas.freeDrawingBrush.width = brushSize;
      (canvas.freeDrawingBrush as any).globalCompositeOperation = "destination-out";
    } else if (canvas.freeDrawingBrush) {
      (canvas.freeDrawingBrush as any).globalCompositeOperation = "source-over";
    }

    if (selectedTool === "circle") {
      canvas.isDrawingMode = false;
      const circle = new Circle({
        left: 300,
        top: 300,
        radius: 50,
        fill: "rgba(0, 255, 255, 0.3)",
        stroke: "rgba(0, 255, 255, 1)",
        strokeWidth: 2,
      });
      canvas.add(circle);
      toast.success("Circle ROI added");
    }

    if (selectedTool === "square") {
      canvas.isDrawingMode = false;
      const rect = new Rect({
        left: 300,
        top: 300,
        width: 100,
        height: 100,
        fill: "rgba(0, 255, 255, 0.3)",
        stroke: "rgba(0, 255, 255, 1)",
        strokeWidth: 2,
      });
      canvas.add(rect);
      toast.success("Rectangle ROI added");
    }
  }, [selectedTool, brushSize]);

  // AI assist - generate dummy suggestions (only once when activated)
  useEffect(() => {
    if (!fabricCanvasRef.current || !aiAssistActive || !isReady) {
      if (!aiAssistActive) {
        aiProcessedRef.current = false;
      }
      return;
    }

    // Prevent running multiple times
    if (aiProcessedRef.current) return;
    aiProcessedRef.current = true;

    const canvas = fabricCanvasRef.current;
    
    // Clear previous AI suggestions
    const objects = canvas.getObjects();
    objects.forEach(obj => {
      if ((obj as any).aiSuggestion) {
        canvas.remove(obj);
      }
    });

    // Generate 2-3 random AI suggestion regions
    const numSuggestions = Math.floor(Math.random() * 2) + 2;
    
    const timeout = setTimeout(() => {
      for (let i = 0; i < numSuggestions; i++) {
        const x = Math.random() * 600 + 100;
        const y = Math.random() * 600 + 100;
        const size = Math.random() * 60 + 40;
        const isCircle = Math.random() > 0.5;

        if (isCircle) {
          const circle = new Circle({
            left: x,
            top: y,
            radius: size / 2,
            fill: "rgba(138, 43, 226, 0.2)",
            stroke: "rgba(138, 43, 226, 0.8)",
            strokeWidth: 2,
            strokeDashArray: [5, 5],
            selectable: true,
          });
          (circle as any).aiSuggestion = true;
          canvas.add(circle);
        } else {
          const rect = new Rect({
            left: x,
            top: y,
            width: size,
            height: size,
            fill: "rgba(138, 43, 226, 0.2)",
            stroke: "rgba(138, 43, 226, 0.8)",
            strokeWidth: 2,
            strokeDashArray: [5, 5],
            selectable: true,
          });
          (rect as any).aiSuggestion = true;
          canvas.add(rect);
        }
      }
      canvas.renderAll();
      toast.success("AI detected " + numSuggestions + " potential regions");
      onAiSuggestion?.();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [aiAssistActive, isReady]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="max-w-full max-h-full" />
    </div>
  );
};
