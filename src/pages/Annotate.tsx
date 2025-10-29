import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  Activity, ArrowLeft, Brush, Circle, Download, Eraser, 
  Hand, Maximize, RotateCw, Save, Sparkles, Square, ZoomIn, ZoomOut, ChevronDown 
} from "lucide-react";
import { Link } from "react-router-dom";

const sampleScans = [
  { id: 1, name: "Chest X-Ray", type: "X-Ray", path: "/sample-scans/chest-xray-generated.jpg" },
  { id: 2, name: "Brain MRI Axial", type: "MRI", path: "/sample-scans/brain-mri-generated.jpg" },
  { id: 3, name: "CT Lung Scan", type: "CT", path: "/sample-scans/ct-lung-generated.jpg" },
  { id: 4, name: "Medical X-Ray", type: "X-Ray", path: "/sample-scans/xray-2.jpg" },
  { id: 5, name: "CT Scan", type: "CT", path: "/sample-scans/ct-scan-1.jpg" },
];

const Annotate = () => {
  const [selectedTool, setSelectedTool] = useState<string>("brush");
  const [brushSize, setBrushSize] = useState([20]);
  const [aiAssistActive, setAiAssistActive] = useState(false);
  const [currentScan, setCurrentScan] = useState(0);
  const [showScanSelector, setShowScanSelector] = useState(false);

  const tools = [
    { id: "hand", icon: Hand, label: "Pan" },
    { id: "brush", icon: Brush, label: "Brush" },
    { id: "eraser", icon: Eraser, label: "Eraser" },
    { id: "circle", icon: Circle, label: "Circle ROI" },
    { id: "square", icon: Square, label: "Rectangle" },
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <div className="relative">
            <button
              onClick={() => setShowScanSelector(!showScanSelector)}
              className="flex items-center gap-2 hover:bg-secondary/50 px-3 py-1 rounded-md transition-colors"
            >
              <div>
                <h1 className="font-semibold text-left">{sampleScans[currentScan].name}</h1>
                <p className="text-xs text-muted-foreground text-left">Case #{String(sampleScans[currentScan].id).padStart(4, '0')} - {sampleScans[currentScan].type}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
            {showScanSelector && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                {sampleScans.map((scan, idx) => (
                  <button
                    key={scan.id}
                    onClick={() => {
                      setCurrentScan(idx);
                      setShowScanSelector(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-b-0 ${
                      idx === currentScan ? 'bg-secondary/30' : ''
                    }`}
                  >
                    <div className="font-medium text-sm">{scan.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Case #{String(scan.id).padStart(4, '0')} - {scan.type}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="medical" size="sm">
            <Save className="w-4 h-4" />
            Save Annotation
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Tool Palette */}
        <aside className="w-16 border-r border-border bg-card/30 backdrop-blur-sm flex flex-col items-center py-4 gap-2">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                selectedTool === tool.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'hover:bg-secondary text-muted-foreground'
              }`}
              title={tool.label}
            >
              <tool.icon className="w-5 h-5" />
            </button>
          ))}
          <div className="h-px w-8 bg-border my-2" />
          <button
            onClick={() => setAiAssistActive(!aiAssistActive)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              aiAssistActive
                ? 'bg-gradient-to-br from-primary to-medical-purple text-white shadow-lg glow-primary'
                : 'hover:bg-secondary text-muted-foreground'
            }`}
            title="AI Auto-Segment"
          >
            <Sparkles className="w-5 h-5" />
          </button>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 bg-background/50 relative">
            {/* Canvas with Sample Scan */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-3xl aspect-square mx-4">
                <Card className="w-full h-full border border-border/50 flex items-center justify-center bg-black/90 overflow-hidden">
                  <img 
                    src={sampleScans[currentScan].path} 
                    alt={sampleScans[currentScan].name}
                    className="w-full h-full object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </Card>
                {aiAssistActive && (
                  <div className="absolute top-4 right-4 px-3 py-2 rounded-lg bg-primary/20 border border-primary/50 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                      <span className="text-sm text-primary font-medium">AI Assist Active</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="border-t border-border bg-card/30 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground min-w-[60px] text-center">100%</span>
              <Button variant="ghost" size="sm">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <div className="h-6 w-px bg-border mx-2" />
              <Button variant="ghost" size="sm">
                <RotateCw className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">Slice 45 / 120</span>
              <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[37%] bg-gradient-to-r from-primary to-medical-purple" />
              </div>
            </div>
          </div>
        </main>

        {/* Right Properties Panel */}
        <aside className="w-80 border-l border-border bg-card/30 backdrop-blur-sm overflow-y-auto">
          <div className="p-4 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Annotation Properties</h3>
              <Card className="p-4 bg-secondary/30 border-border/50 space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Label</label>
                  <select className="w-full px-3 py-2 rounded-md bg-background border border-border text-sm">
                    <option>Pneumothorax</option>
                    <option>Nodule</option>
                    <option>Effusion</option>
                    <option>Consolidation</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Severity</label>
                  <div className="flex gap-2">
                    {['Low', 'Medium', 'High'].map((level) => (
                      <button
                        key={level}
                        className="flex-1 px-3 py-2 rounded-md border border-border hover:border-primary transition-all text-xs"
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Brush Size: {brushSize[0]}px
                  </label>
                  <Slider
                    value={brushSize}
                    onValueChange={setBrushSize}
                    min={5}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">AI Confidence</label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[87%] bg-gradient-to-r from-success to-primary" />
                    </div>
                    <span className="text-sm font-medium text-success">87%</span>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Sparkles className="w-4 h-4" />
                  Auto-Segment Region
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Save className="w-4 h-4" />
                  Save as Template
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Annotation History</h3>
              <div className="space-y-2 text-xs">
                {[
                  { action: 'Brush annotation', time: '2 min ago', user: 'You' },
                  { action: 'AI suggestion accepted', time: '5 min ago', user: 'System' },
                  { action: 'Region refined', time: '8 min ago', user: 'You' },
                ].map((entry, i) => (
                  <div key={i} className="p-2 rounded bg-secondary/30 border border-border/50">
                    <div className="flex justify-between items-start">
                      <span className="text-foreground">{entry.action}</span>
                      <span className="text-muted-foreground">{entry.time}</span>
                    </div>
                    <span className="text-muted-foreground">by {entry.user}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Annotate;
